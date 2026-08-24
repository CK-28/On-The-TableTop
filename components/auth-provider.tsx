"use client";

import React, { useEffect } from "react";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  userNameAtom,
  userEmailAtom,
  userAvatarUrlAtom,
  userGamesAtom,
  userFriendsAtom,
  collectionStatusAtom,
} from "@/app/store";

// Minimal subscription shape so we can call unsubscribe safely without `any`.
type RealtimeSubscriptionLike = { unsubscribe?: () => void };

// Small type for the user metadata shape we expect from Supabase.
type UserMetadata = { user_name?: string };

function getAvatarUrl(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "Profile"
  )}&background=2563eb&color=ffffff&size=128`;
}

/**
 * AuthProvider
 * - Client-side component that hydrates Jotai atoms from Supabase auth + DB
 * - Ensures `userNameAtom`, `userGamesAtom`, and `userFriendsAtom` are populated
 *   after page load and on auth state changes.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUserName = useSetAtom(userNameAtom);
  const setUserEmail = useSetAtom(userEmailAtom);
  const setUserAvatarUrl = useSetAtom(userAvatarUrlAtom);
  const setUserGames = useSetAtom(userGamesAtom);
  const setUserFriends = useSetAtom(userFriendsAtom);
  const setCollectionStatus = useSetAtom(collectionStatusAtom);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // 'mounted' guards against setting state after unmount.
    let mounted = true;
    let collectionRequestId = 0;

    function clearCollection(status: "loaded" | "error" = "loaded") {
      setUserGames([]);
      setUserFriends([]);
      setCollectionStatus(status);
    }

    function clearUserState(status: "loaded" | "error" = "loaded") {
      setUserName("");
      setUserEmail("");
      setUserAvatarUrl("");
      clearCollection(status);
    }

    function setUserIdentity(user: { email?: string; user_metadata?: unknown }) {
      const name = (user.user_metadata as UserMetadata | undefined)?.user_name ?? "";
      setUserName(name);
      setUserEmail(user.email ?? "");
      setUserAvatarUrl(getAvatarUrl(name));
      return name;
    }

    // Fetch the user's saved collection row and update atoms.
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

        const gameIds = row?.user_collection ?? [];
        const friendNames = row?.user_friends ?? [];
        const [gamesResult, friendsResult] = await Promise.all([
          gameIds.length > 0
            ? supabase
                .from("BoardGames")
                .select("id, name, image, yearpublished, minplayers, maxplayers, minplaytime, maxplaytime, publisher, is_expansion, description")
                .in("id", gameIds)
            : Promise.resolve({ data: [], error: null }),
          friendNames.length > 0
            ? supabase
                .from("profiles")
                .select("id, user_name")
                .in("user_name", friendNames)
            : Promise.resolve({ data: [], error: null }),
        ]);

        if (gamesResult.error) throw gamesResult.error;
        if (friendsResult.error) throw friendsResult.error;

        setUserGames(gamesResult.data ?? []);
        setUserFriends(friendsResult.data ?? []);
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
        // A missing session is expected on public pages, not an application error.
        if (error && error.name !== "AuthSessionMissingError") throw error;
        const user = data?.user;
        if (!mounted) return;

        if (user) {
          const name = setUserIdentity(user);

          if (name) {
            void loadAndSetCollection(name);
          } else {
            clearCollection();
          }
        } else {
          clearUserState();
        }
      } catch (err) {
        console.error("AuthProvider init error", err);
        if (mounted) {
          clearUserState("error");
        }
      }
    }

    init();

    /**
     * Listen for auth state changes and update atoms accordingly.
     * Subscribes to Supabase client-side auth events and reloads the collection
     * when the user signs in or auth changes.
     */
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      // init() already loads the current session on mount. Ignore Supabase's
      // initial-session notification so the collection is not fetched twice.
      if (event === "INITIAL_SESSION") return;

      // If session is null or event is SIGNED_OUT, clear atoms.
      if (!session || event === "SIGNED_OUT") {
        collectionRequestId++;
        clearUserState();
        router.replace("/");
      } else if (session.user) {
        if (event !== "SIGNED_IN" && event !== "USER_UPDATED") return;
        
        const name = setUserIdentity(session.user);
        if (name) {
          void loadAndSetCollection(name);
        } else {
          clearCollection();
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
  }, [router, setUserName, setUserEmail, setUserAvatarUrl, setUserGames, setUserFriends, setCollectionStatus]);

  // Render children unchanged — this component only manages client-side sync.
  return <>{children}</>;
}
