"use client";

import { useState, useEffect, Suspense } from "react";
import PartyList from "./party-list";
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import { createClient } from "@/lib/supabase/client";
import { useAtomValue } from "jotai";
import { collectionStatusAtom, userFriendsAtom, userNameAtom } from "@/app/store";
import GameList from "../game-list";

export default function PartyWrapper() {
  const currentUser = useAtomValue(userNameAtom);
  const friendsAtom = useAtomValue(userFriendsAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const [friends, setFriends] = useState<User[]>([]);
  const [party, setParty] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [filterByPlayerCount, setFilterByPlayerCount] = useState(false);

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

  useEffect(() => {
    if (party.length === 0) {
      console.log("ERROR: No users in party. Skipping game fetch.");
      return;
    }

    async function loadGames() {
      const supabase = createClient();
      const { data, error } = await supabase.functions.invoke(
        "getPartyGames",
        {
          body: {
            players: party,
          },
        }
      );

      console.log("Response from getPartyGames function:", { data, error });
      setGames(data?.data ?? []);
    }

    loadGames();
  }, [party]);

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

  const displayedGames = filterByPlayerCount ? games.filter((game) => game.minplayers <= party.length && game.maxplayers >= party.length) : games;

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
            <Stack spacing={2}>
              <Box className="rounded-xl border bg-background p-4">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterByPlayerCount}
                      onChange={(event) => setFilterByPlayerCount(event.target.checked)}
                    />
                  }
                  label={`Limit by party size`}
                />
              </Box>
              <h1 className="text-2xl">Board Games On The Table</h1>
              <Suspense fallback={<div>Loading Games...</div>}>
                <GameList games={displayedGames} hidePublisher={true} hideOwners={false} hideAddRemove={true} />
              </Suspense>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}
