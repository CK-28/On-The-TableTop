"use client";

import Card from "@mui/material/Card";
import { Box, CardContent, Grid, Stack } from "@mui/material";
import PartyButton from "@/components/party-button";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { collectionStatusAtom, userAvatarUrlAtom, userEmailAtom, userFriendsAtom, userGamesAtom, userNameAtom } from "@/app/store";
import Image from "next/image";
import GameList from "@/components/game-list";
import UserList from "@/components/user-list";
import GameListHome from "@/components/game-list-home";


export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const userAvatarUrl = useAtomValue(userAvatarUrlAtom);
  const name = useAtomValue(userNameAtom);
  const email = useAtomValue(userEmailAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const games = useAtomValue(userGamesAtom);
  const friends = useAtomValue(userFriendsAtom);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayName = isClient ? name || "Profile" : "Profile";
  const avatarUrl = isClient && userAvatarUrl
    ? userAvatarUrl
    : "https://ui-avatars.com/api/?name=Profile&background=2563eb&color=ffffff&size=128";

  return (
    <Grid container spacing={2} width={"100%"} justifyContent={"center"}>
      <Stack spacing={2} width={"20%"}>
        <Card style={{
          height: "60vh"
        }}>
          <CardContent
            style={{
              padding: 50
            }}>
            <Stack
              spacing={6}
              style={{
                alignItems: "center",
                textAlign: "center",
              }}>
              <div className="relative h-36 w-36 overflow-hidden rounded-full border border-slate-200">
                <Image
                  src={avatarUrl}
                  alt="Profile avatar"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <p className="text-2xl font-semibold">{displayName}</p>
                <p className="text-sm text-muted-foreground">
                  {isClient ? email || "No email available" : "No email available"}
                </p>
              </div>
            </Stack>
          </CardContent>
        </Card>
        <Card style={
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20vh"
          }
        }>
          <PartyButton />
        </Card>
      </Stack>
      <Stack spacing={2} width={"60%"}>
        <Card sx={{ height: "40vh" }} >
          <CardContent>
            <h2 className="mb-2 text-xl font-semibold">Games</h2>
            {collectionStatus === "loading" ? (
              <p>Loading games...</p>
            ) : collectionStatus === "error" ? (
              <p>Unable to load games</p>
            ) : games.length > 0 ? (
              <GameListHome games={games} hidePublisher={true} hideGameStats={true} />
            ) : (
              <p className="text-sm text-muted-foreground">No games found</p>
            )}
          </CardContent>
        </Card>
        <Card sx={{ height: "40vh"}}>
          <CardContent>
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
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}
