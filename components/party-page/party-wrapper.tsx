"use client";

import { useState, useEffect, Suspense } from "react";
import PartyList from "./party-list";
import { Card, CardContent } from "../ui/card";
import { createClient } from "@/lib/supabase/client";
import { useAtomValue } from "jotai";
import { userFriendsAtom, userNameAtom } from "@/app/store";
import GameList from "../game-list";

export default function PartyWrapper() {
  const currentUser = useAtomValue(userNameAtom);
  const [friends, setFriends] = useState<string[]>(useAtomValue(userFriendsAtom));
  const [party, setParty] = useState<string[]>(() => (currentUser ? [currentUser] : []));
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (!currentUser) {
      console.log("ERROR: No current user found. Skipping party setup.");
      return;
    }

    setParty((currentParty) =>
      currentParty.includes(currentUser) ? currentParty : [...currentParty, currentUser]
    );
  }, [currentUser]);

  useEffect(() => {
    if (party.length === 0) {
      console.log("ERROR: No users in party. Skipping game fetch.");
      return;
    }
    
    fetchGames();
  }, [party]);

  function addToParty(user: string) {
    setFriends((party) => party.filter((u) => u !== user));

    setParty((party) => {
      if (party.find((p) => p === user)) return party;
      return [...party, user];
    });
  }

  function removeFromParty(user: string) {
    if (currentUser != user) {
      setParty((party) => party.filter((u) => u !== user));

      setFriends((party) => {
        if (party.find((p) => p === user)) return party;
        return [...party, user];
      });
    }
  }

  async function fetchGames() {
    const supabase = await createClient();
    const playerCollections = (await supabase.from("UserCollectionByUserName").select('user_collection').in("user_name", party)).data;

    const collections = (playerCollections?.map((pc) => pc.user_collection) ?? []).flat();
    console.log("Combined collections grabbed from all users:", collections);

    const gamesFromCollection = (await supabase.from("BoardGames").select().in("id", collections)).data;
    console.log("Games from collection:", gamesFromCollection);

    setGames(gamesFromCollection || []);
  }

  return (
    <Card className="max-w-[1000px] mx-auto">
      <CardContent className="flex flex-row gap-8 p-6">
        <div className="flex w-1/3 flex-col gap-4 min-h-[640px]">
          <div className="grid flex-1 gap-4 rounded-xl border bg-background p-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">Friends In Party</h1>
              <PartyList party={party} onClick={removeFromParty} owner={currentUser} />
            </div>
          </div>
          <div className="grid flex-1 gap-4 rounded-xl border bg-background p-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">All Friends</h1>
              <PartyList party={friends} onClick={addToParty} />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl">Board Games On The Table</h1>
            <Suspense fallback={<div>Loading Games...</div>}>
                <GameList games={games} hidePublisher={true} hideAddRemove={true}/>
            </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
