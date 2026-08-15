"use client";

import React, { useEffect } from "react";
import { useSetAtom } from "jotai";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { userNameAtom, userGamesAtom, userFriendsAtom, isHydratedAtom } from "@/app/store";

// Minimal subscription shape so we can call unsubscribe safely without `any`.
type RealtimeSubscriptionLike = { unsubscribe?: () => void };

// Small type for the user metadata shape we expect from Supabase.
type UserMetadata = { user_name?: string };

/**
 * AuthProvider
 * - Client-side component that hydrates Jotai atoms from Supabase auth + DB
 * - Ensures `userNameAtom`, `userGamesAtom`, and `userFriendsAtom` are populated
 *   after page load and on auth state changes.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUserName = useSetAtom(userNameAtom);
  const setUserGames = useSetAtom(userGamesAtom);
  const setUserFriends = useSetAtom(userFriendsAtom);
  const setIsHydrated = useSetAtom(isHydratedAtom);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Create a browser supabase client for auth and data fetching.
    const supabase = createClient();

    // 'mounted' guards against setting state after unmount.
    let mounted = true;

    /**
     * Fetch the user's saved collection row and update atoms.
     * Kept as a helper to avoid duplicating the same DB query in multiple places.
     */
    async function loadAndSetCollection(name: string) {
      try {
        // add a short timeout so a stalled network doesn't block hydration
        const fetchPromise = supabase
          .from("UserCollectionByUserName")
          .select("user_collection, user_friends")
          .eq("user_name", name)
          .single();

        const timeoutMs = 5000;
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("load collection timeout")), timeoutMs)
        );

        const { data: row } = await Promise.race([fetchPromise, timeoutPromise]) as any;

        if (!mounted) return; // bail if the component unmounted while we waited

        // Set atoms with empty-array fallbacks to keep types consistent.
        setUserGames(row?.user_collection ?? []);
        setUserFriends(row?.user_friends ?? []);
      } catch (err) {
        // Non-fatal: continue (atoms will be set to empty arrays below).
        // ensure atoms are at least empty arrays so consumers render predictable UI
        if (mounted) {
          setUserGames([]);
          setUserFriends([]);
        }
      }
    }

    /**
     * Initial hydration: get current user (if any) and populate atoms.
     * This runs once on client mount.
     */
    async function init() {
      // mark as not-hydrated while we perform client-only work
      setIsHydrated(false);
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;
        console.log("AuthProvider.init: got user", user);
        if (!mounted) return;

        if (user) {
          // Read a simple user_name field from metadata; fall back to empty string.
          const name = (user.user_metadata as unknown as UserMetadata)?.user_name ?? "";
          setUserName(name);

          // If we have a user_name, fetch the user's collection row.
          if (name) await loadAndSetCollection(name);
        } else {
          // No user: clear atoms to avoid stale UI after sign-out/refresh.
          setUserName("");
          setUserGames([]);
          setUserFriends([]);

          // Redirect to the app's first page so the user can sign in again.
          // Use replace to avoid adding a back entry to the history stack.
          try {
            // Avoid redirecting if we're already on a public/auth route or root
            // (this prevents interfering with the sign-in flow).
            if (!pathname || (pathname !== "/" && !pathname.startsWith("/auth"))) {
              router.replace("/");
            }
          } catch (err) {
            // Defensive: routing can fail during tests or unusual runtimes.
            console.warn("AuthProvider: redirect failed", err);
          }
        }
      } catch (err) {
        console.error("AuthProvider init error", err);
      }
      // hydration finished (either with data populated or cleared)
      setIsHydrated(true);
    }

    init();

    /**
     * Listen for auth state changes and update atoms accordingly.
     * Subscribes to Supabase client-side auth events and reloads the collection
     * when the user signs in or auth changes.
     */
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("AuthProvider.onAuthStateChange: event", event, "session", !!session);
      if (!mounted) return;

      // If session is null or event is SIGNED_OUT, clear atoms.
      if (!session || event === "SIGNED_OUT") {
        // mark as not-hydrated to force consuming layouts/components
        // to re-evaluate while we clear state and navigate away.
        setIsHydrated(false);
        // Clear atoms when signed out or session removed.
        setUserName("");
        setUserGames([]);
        setUserFriends([]);

        // Redirect back to the public entry page.
        try {
          // Only redirect when not already on public/auth pages to avoid loops.
          if (!pathname || (pathname !== "/" && !pathname.startsWith("/auth"))) {
            router.replace("/");
          }
        } catch (err) {
          console.warn("AuthProvider: redirect failed", err);
        }
        // hydration cleared and redirect attempted; mark hydrated so
        // consumers render the cleared state and respond to route change.
        setIsHydrated(true);
      } else if (session.user) {
        // Start reload cycle while we fetch new user collection.
        setIsHydrated(false);
        // On sign-in/update, set the user name and reload the collection.
        const name = (session.user.user_metadata as unknown as UserMetadata)?.user_name ?? "";
        setUserName(name);
        if (name) await loadAndSetCollection(name);
        setIsHydrated(true);
      }
    });

    // Cleanup: mark unmounted and unsubscribe the realtime listener.
    return () => {
      mounted = false;
      const sub = authListener?.subscription as RealtimeSubscriptionLike | undefined;
      // defensive call in case subscription shape differs at runtime
      sub?.unsubscribe?.();
    };
  }, [setUserName, setUserGames, setUserFriends]);

  // Render children unchanged — this component only manages client-side sync.
  return <>{children}</>;
}
