"use client";

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  collectionStatusAtom,
  userEmailAtom,
  userFriendsAtom,
  userAvatarUrlAtom,
  userGamesAtom,
  userNameAtom,
} from "@/app/store";
import UserList from "@/components/user-list";
import GameList from "@/components/game-list";

export default function Profile() {
  const name = useAtomValue(userNameAtom);
  const games = useAtomValue(userGamesAtom);
  const friends = useAtomValue(userFriendsAtom);
  const userAvatarUrl = useAtomValue(userAvatarUrlAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const email = useAtomValue(userEmailAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayName = isClient ? name || "Profile" : "Profile";
  const avatarUrl = isClient && userAvatarUrl
    ? userAvatarUrl
    : "https://ui-avatars.com/api/?name=Profile&background=2563eb&color=ffffff&size=128";

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
            {collectionStatus === "loading" ? (
              <p>Loading games...</p>
            ) : collectionStatus === "error" ? (
              <p>Unable to load games</p>
            ) : games.length > 0 ? (
              <GameList games={games} hidePublisher={true} hideGameStats={true} />
            ) : (
              <p className="text-sm text-muted-foreground">No games found</p>
            )}
          </div>

          <div className="rounded-xl border bg-background p-6">
            <h2 className="mb-4 text-xl font-semibold">Friends</h2>
            {collectionStatus === "loading" ? (
              <p>Loading friends...</p>
            ) : collectionStatus === "error" ? (
              <p>Unable to load friends</p>
            ) : friends.length > 0 ? (
              <UserList users={friends} />
            ) : (
              <p className="text-sm text-muted-foreground">No friends found</p>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
