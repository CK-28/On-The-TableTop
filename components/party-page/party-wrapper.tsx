"use client";

import { useState, useEffect, Suspense } from "react";
import PartyList from "./party-list";
import { Card, CardContent } from "../ui/card";
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

  return (
    <Card className="max-w-[1000px] mx-auto">
      <CardContent className="flex flex-row gap-8 p-6">
        <div className="flex w-1/3 flex-col gap-4 min-h-[640px]">
          <div className="grid flex-1 gap-4 rounded-xl border bg-background p-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">Friends In Party</h1>
              {collectionStatus === "loading" ? (
                <p>Loading friends...</p>
              ) : collectionStatus === "error" ? (
                <p>Unable to load friends.</p>
              ) : (
                <PartyList party={party} onClick={removeFromParty} owner={currentUser} />
              )}
            </div>
          </div>
          <div className="grid flex-1 gap-4 rounded-xl border bg-background p-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">All Friends</h1>
              {collectionStatus === "loading" ? (
                <p>Loading friends...</p>
              ) : collectionStatus === "error" ? (
                <p>Unable to load friends.</p>
              ) : (
                <PartyList party={friends.map((friend) => friend.user_name)} onClick={addToParty} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl">Board Games On The Table</h1>
            <Suspense fallback={<div>Loading Games...</div>}>
                <GameList games={games} hidePublisher={true} hideOwners={false} hideAddRemove={true}/>
            </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
