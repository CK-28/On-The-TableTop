"use client";

import { useState, useEffect } from "react";
import PartyList from "./party-list";
import { Card, CardContent, Grid, Stack } from "@mui/material";
import { useAtomValue } from "jotai";
import { collectionStatusAtom, userFriendsAtom, userNameAtom } from "@/app/store";
import PartyGames from "./partyGames";

export default function PartyWrapper() {
  const currentUser = useAtomValue(userNameAtom);
  const friendsAtom = useAtomValue(userFriendsAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const [friends, setFriends] = useState<User[]>([]);
  const [party, setParty] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser) {
      console.log("ERROR: No current user found. Skipping party setup.");
      return;
    }

    setParty((currentParty) =>
      currentParty.includes(currentUser) ? currentParty : [...currentParty, currentUser]
    );

    if (collectionStatus !== "loading") {
      setFriends(friendsAtom);
    }
  }, [collectionStatus, currentUser, friendsAtom]);

  function addToParty(user: string) {
    setFriends((party) => party.filter((friend) => friend.user_name !== user));

    setParty((party) => {
      if (party.find((p) => p === user)) return party;
      return [...party, user];
    });
  }

  function removeFromParty(user: string) {
    if (currentUser != user) {
      setParty((party) => party.filter((u) => u !== user));

      setFriends((party) => {
        if (party.find((friend) => friend.user_name === user)) return party;
        return [...party, { id: 0, user_name: user }];
      });
    }
  }

  return (
    <Grid container spacing={2} width="100%" justifyContent="center">
      <Stack spacing={2} sx={{ width: { xs: "100%", md: "20%" } }}>
        <Card sx={{ minHeight: "40vh" }}>
          <CardContent>
            <Stack spacing={2}>
              <h1 className="text-2xl">Party Members ({party.length})</h1>
              {collectionStatus === "loading" ? (
                <p>Loading friends...</p>
              ) : collectionStatus === "error" ? (
                <p>Unable to load friends.</p>
              ) : (
                <PartyList party={party} onClick={removeFromParty} owner={currentUser} />
              )}
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ minHeight: "40vh" }}>
          <CardContent>
            <Stack spacing={2}>
              <h1 className="text-2xl">Add Friends</h1>
              {collectionStatus === "loading" ? (
                <p>Loading friends...</p>
              ) : collectionStatus === "error" ? (
                <p>Unable to load friends.</p>
              ) : (
                <PartyList party={friends.map((friend) => friend.user_name)} onClick={addToParty} />
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack spacing={2} sx={{ width: { xs: "100%", md: "60%" } }}>
        <Card sx={{ minHeight: "80vh" }}>
          <CardContent>
            <PartyGames party={party} />
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}
