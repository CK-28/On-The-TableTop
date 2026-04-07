"use client";

import { useState } from "react";
import PartyList from "./party-list";
import { Button } from "../ui/button";
import PartyGames from "./partyGames";
import { createClient } from "@/lib/supabase/client";
import { useAtomValue } from "jotai";
import { userFriendsAtom } from "@/app/store";

export default function PartyWrapper() {
  const [friends, setFriends] = useState<string[]>(useAtomValue(userFriendsAtom))
  const [party, setParty] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>([]);

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
    <div className="flex flex-row gap-20">
      {/* Left Panel */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl">Players In Party</h1>
          <PartyList party={party} onClick={removeFromParty} />
        </div>
        <div>
          {/* TODO: move the users between lists. Currently they always stay in users */}
          <h1 className="text-2xl">All Players</h1>
          <PartyList party={friends} onClick={addToParty} />
        </div>
        <Button onClick={() => handleClick()}>Start Party</Button>
      </div>
      {/* Right Panel */}
      <div>
        <h1 className="text-2xl">Board Games</h1>
        <PartyGames games={games} />
      </div>
    </div>
  );
}
