"use client";

import { useState } from "react";
import UserList from "../user-list";
import PartyList from "./party-list";
import { Button } from "../ui/button";
import PartyGames from "./partyGames";
import { createClient } from "@/lib/supabase/client";

export default function PartyWrapper({ users }: { users: User[] }) {
  const [party, setParty] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  function addToParty(user: User) {
    setParty((party) => {
      if (party.find((p) => p.id === user.id)) return party;
      return [...party, user];
    });
  }

  function removeFromParty(user: User) {
    setParty((party) => party.filter((u) => u !== user));
  }

  // TODO: These functions are inside each other...not in other files tho. When is what appropriate?
  async function handleClick() {
    const playerUserNames = party.map((p) => p.user_name);
    
    const supabase = await createClient();
    const playerCollections = (await supabase.from("UserCollectionByUserName").select('user_collection').in("user_name", playerUserNames)).data;

    const collections = (playerCollections?.map((pc) => pc.user_collection) ?? []).flat();
    console.log("Combined collections grabbed from all users:", collections);

    const gamesFromCollection = (await supabase.from("BoardGames").select().in("id", collections)).data;
    console.log("Games from collection:", gamesFromCollection);

    setGames(gamesFromCollection || []);
  }

  //   TODO: make right and left panel two seperate components
  return (
    <div className="flex flex-row gap-20">
      {/* Left Panel */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl">Players In Party</h1>
          <PartyList party={party} onRemove={removeFromParty} />
        </div>
        <div>
          {/* TODO: move the users between lists. Currently they always stay in users */}
          <h1 className="text-2xl">All Players</h1>
          <UserList users={users} onAdd={addToParty} />
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
