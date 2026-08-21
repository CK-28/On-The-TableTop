"use client";

import React, { useEffect } from "react";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  userNameAtom,
  userEmailAtom,
  userGamesAtom,
  userFriendsAtom,
  collectionStatusAtom,
} from "@/app/store";

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
  const setUserEmail = useSetAtom(userEmailAtom);
  const setUserGames = useSetAtom(userGamesAtom);
  const setUserFriends = useSetAtom(userFriendsAtom);
  const setCollectionStatus = useSetAtom(collectionStatusAtom);
  const router = useRouter();

  useEffect(() => {
    // Create a browser supabase client for auth and data fetching.
    const supabase = createClient();

    // 'mounted' guards against setting state after unmount.
    let mounted = true;
    let collectionRequestId = 0;

    /**
     * Fetch the user's saved collection row and update atoms.
     * Kept as a helper to avoid duplicating the same DB query in multiple places.
     */
    async function loadAndSetCollection(name: string) {
      const requestId = ++collectionRequestId;
      setCollectionStatus("loading");
      let timeout: ReturnType<typeof setTimeout> | undefined;

      try {
        const fetchPromise = supabase
          .from("UserCollectionByUserName")
          .select("user_collection, user_friends")
          .eq("user_name", name)
          .maybeSingle();
        const timeoutPromise = new Promise<never>((_, reject) =>
          timeout = setTimeout(() => reject(new Error("Collection request timed out")), 5000)
        );
        const { data: row, error } = await Promise.race([fetchPromise, timeoutPromise]);

        if (error) throw error;

        if (!mounted || requestId !== collectionRequestId) return;

        setUserGames(row?.user_collection ?? []);
        setUserFriends(row?.user_friends ?? []);
        setCollectionStatus("loaded");
      } catch (err) {
        if (!mounted || requestId !== collectionRequestId) return;
        console.error("AuthProvider: failed to load user collection", err);
        setUserGames([]);
        setUserFriends([]);
        setCollectionStatus("error");
      } finally {
        if (timeout) clearTimeout(timeout);
      }
    }

    /**
     * Initial hydration: get current user (if any) and populate atoms.
     * This runs once on client mount.
     */
    async function init() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        const user = data?.user;
        if (!mounted) return;

        if (user) {
          // Read a simple user_name field from metadata; fall back to empty string.
          const name = (user.user_metadata as unknown as UserMetadata)?.user_name ?? "";
          setUserName(name);
          setUserEmail(user.email ?? "");

          if (name) {
            void loadAndSetCollection(name);
          } else {
            setUserGames([]);
            setUserFriends([]);
            setCollectionStatus("loaded");
          }
        } else {
          setUserName("");
          setUserEmail("");
          setUserGames([]);
          setUserFriends([]);
          setCollectionStatus("loaded");

          router.replace("/");
        }
      } catch (err) {
        console.error("AuthProvider init error", err);
        if (mounted) {
          setUserName("");
          setUserEmail("");
          setUserGames([]);
          setUserFriends([]);
          setCollectionStatus("error");
        }
      }
    }

    init();

    /**
     * Listen for auth state changes and update atoms accordingly.
     * Subscribes to Supabase client-side auth events and reloads the collection
     * when the user signs in or auth changes.
     */
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      // init() already loads the current session on mount. Ignore Supabase's
      // initial-session notification so the collection is not fetched twice.
      if (event === "INITIAL_SESSION") return;

      // If session is null or event is SIGNED_OUT, clear atoms.
      if (!session || event === "SIGNED_OUT") {
        collectionRequestId++;
        setUserName("");
        setUserEmail("");
        setUserGames([]);
        setUserFriends([]);
        setCollectionStatus("loaded");
        router.replace("/");
      } else if (session.user) {
        if (event !== "SIGNED_IN" && event !== "USER_UPDATED") return;
        const name = (session.user.user_metadata as unknown as UserMetadata)?.user_name ?? "";
        setUserName(name);
        setUserEmail(session.user.email ?? "");
        if (name) {
          void loadAndSetCollection(name);
        } else {
          setUserGames([]);
          setUserFriends([]);
          setCollectionStatus("loaded");
        }
      }
    });

    // Cleanup: mark unmounted and unsubscribe the realtime listener.
    return () => {
      mounted = false;
      const sub = authListener?.subscription as RealtimeSubscriptionLike | undefined;
      // defensive call in case subscription shape differs at runtime
      sub?.unsubscribe?.();
    };
  }, [router, setUserName, setUserEmail, setUserGames, setUserFriends, setCollectionStatus]);

  // Render children unchanged — this component only manages client-side sync.
  return <>{children}</>;
}
