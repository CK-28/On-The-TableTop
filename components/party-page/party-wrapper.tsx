"use client";

import { useState, useEffect } from "react";
import PartyList from "./party-list";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import PartyGames from "./partyGames";
import { createClient } from "@/lib/supabase/client";
import { useAtomValue } from "jotai";
import { userFriendsAtom, userNameAtom } from "@/app/store";

export default function PartyWrapper() {
  const [friends, setFriends] = useState<string[]>(useAtomValue(userFriendsAtom));
  const [party, setParty] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [currentUser, setCurrentUser] = useState<string>(useAtomValue(userNameAtom));

  useEffect(() => {
    console.log("WHEN THE USE EFFECTS");


  }, []);

  useEffect(() => {
    console.log("currentUser", currentUser);
    console.log("friends", friends);

    if (!party.includes(currentUser)) {
      console.log("adding the current user");
      setParty([...party, currentUser]);
    } 

    console.log(party);

  }, [party]);

  function addToParty(user: string) {
    setFriends((party) => party.filter((u) => u !== user));

    setParty((party) => {
      if (party.find((p) => p === user)) return party;
      return [...party, user];
    });
  }

  function removeFromParty(user: string) {
    setParty((party) => party.filter((u) => u !== user));

    setFriends((party) => {
      if (party.find((p) => p === user)) return party;
      return [...party, user];
    });
  }

  // TODO: These functions are inside each other...not in other files tho. When is what appropriate?
  async function handleClick() {    
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
              <PartyList party={party} onClick={removeFromParty} />
            </div>
          </div>
          <div className="grid flex-1 gap-4 rounded-xl border bg-background p-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">All Friends</h1>
              <PartyList party={friends} onClick={addToParty} />
            </div>
          </div>
          <Button className="w-full" onClick={() => handleClick()}>
            Start Party
          </Button>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl">Board Games On The Table</h1>
          <PartyGames games={games} />
        </div>
      </CardContent>
    </Card>
  );
}
