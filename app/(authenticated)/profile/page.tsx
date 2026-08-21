"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { collectionStatusAtom, userEmailAtom, userFriendsAtom, userGamesAtom, userNameAtom } from "@/app/store";
import UserList from "@/components/user-list";
import GameList from "@/components/game-list";

export default function Profile() {
  const name = useAtomValue(userNameAtom);
  const gameIds = useAtomValue(userGamesAtom);
  const friends = useAtomValue(userFriendsAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const email = useAtomValue(userEmailAtom);
  const [isClient, setIsClient] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [friendUsers, setFriendUsers] = useState<User[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [gamesLoadedFor, setGamesLoadedFor] = useState<string | null>(null);
  const [friendsLoadedFor, setFriendsLoadedFor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const contentReady = isClient && collectionStatus !== "loading";
  const gameIdsKey = JSON.stringify(gameIds);
  const friendsKey = JSON.stringify(friends);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function loadGames() {
      if (collectionStatus === "loading") {
        setGamesLoadedFor(null);
        return;
      }

      if (gameIds.length === 0) {
        setGames([]);
        setGamesLoadedFor(gameIdsKey);
        return;
      }

      try {
        setLoadingGames(true);
        const supabase = createClient();
        const { data: boardGames, error: gamesError } = await supabase
          .from("BoardGames")
          .select("id, name, image, yearpublished, minplayers, maxplayers, minplaytime, maxplaytime, publisher, is_expansion, description")
          .in("id", gameIds);

        if (gamesError) {
          throw gamesError;
        }
        setGames(boardGames || []);
        setGamesLoadedFor(gameIdsKey);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load games");
        setGamesLoadedFor(gameIdsKey);
      } finally {
        setLoadingGames(false);
      }
    }

    loadGames();
  }, [collectionStatus, gameIds, gameIdsKey]);

  useEffect(() => {
    async function loadFriendUsers() {
      if (collectionStatus === "loading") {
        setFriendsLoadedFor(null);
        return;
      }

      if (friends.length === 0) {
        setFriendUsers([]);
        setFriendsLoadedFor(friendsKey);
        return;
      }

      try {
        setLoadingFriends(true);
        const supabase = createClient();
        const { data: users, error: usersError } = await supabase
          .from("profiles")
          .select("id, user_name")
          .in("user_name", friends);

        if (usersError) throw usersError;
        setFriendUsers(users || []);
        setFriendsLoadedFor(friendsKey);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load friends");
        setFriendsLoadedFor(friendsKey);
      } finally {
        setLoadingFriends(false);
      }
    }

    loadFriendUsers();
  }, [collectionStatus, friends, friendsKey]);

  const displayName = isClient ? name || "Profile" : "Profile";

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=2563eb&color=ffffff&size=128`;

  return (
    <Card className="max-w-[1000px] mx-auto">
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="rounded-xl border bg-background p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-slate-200">
              <Image
                src={avatarUrl}
                alt="Profile avatar"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-2xl font-semibold">{displayName}</p>
              <p className="text-sm text-muted-foreground">
                {isClient ? email || "No email available" : "No email available"}
              </p>
            </div>
          </div>
        </div>

        {/* TODO: Make Games and Friends scrollable after a point */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-background p-6">
            <h2 className="mb-4 text-xl font-semibold">Games</h2>
            {!contentReady || gamesLoadedFor !== gameIdsKey || loadingGames ? (
              <p>Loading games...</p>
            ) : collectionStatus === "error" ? (
              <p>Unable to load games</p>
            ) : games.length > 0 ? (
              <GameList games={games as Game[]} hidePublisher={true} hideGameStats={true} />
            ) : (
              <p className="text-sm text-muted-foreground">No games found</p>
            )}
          </div>

          <div className="rounded-xl border bg-background p-6">
            <h2 className="mb-4 text-xl font-semibold">Friends</h2>
            {!contentReady || friendsLoadedFor !== friendsKey || loadingFriends ? (
              <p>Loading friends...</p>
            ) : collectionStatus === "error" ? (
              <p>Unable to load friends</p>
            ) : friendUsers.length > 0 ? (
              <UserList users={friendUsers} />
            ) : (
              <p className="text-sm text-muted-foreground">No friends found</p>
            )}
          </div>
        </div>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </CardContent>
    </Card>
  );
}
