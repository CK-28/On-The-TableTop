"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtom, useAtomValue } from "jotai";
import { collectionStatusAtom, userGamesAtom, userNameAtom } from "@/app/store";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AddRemoveGame({ game, item, alreadyInList }: { game: Game, item: number, alreadyInList: boolean }) {
  const [itemInList, setItemInList] = useState(alreadyInList);
  const [userCollection, setUserCollection] = useAtom(userGamesAtom);
  const userName = useAtomValue(userNameAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);

  if (collectionStatus === "loading") {
    return <span>Loading...</span>;
  } else if (collectionStatus === "error") {
    return <span>Unable to load collection.</span>;
  }

  function addItem(item: number): void {
    const nextCollection = userCollection.some((currentGame) => currentGame.id === item)
      ? userCollection
      : [...userCollection, game];
    setUserCollection(nextCollection);

    setItemInList(true);
    updateCollection(nextCollection).then((wasUpdateSuccessful) => {
      setItemInList(wasUpdateSuccessful);
    });
  }

  function removeItem(item: number): void {
    const index = userCollection.findIndex((currentGame) => currentGame.id === item);
    if (index > -1) {
      const nextCollection = userCollection.filter((_, currentIndex) => currentIndex !== index);
      setUserCollection(nextCollection);
      setItemInList(false);
      updateCollection(nextCollection).then((wasUpdateSuccessful) => {
        setItemInList(!wasUpdateSuccessful);
      });
    } else {
      setItemInList(false);
    }
  }

  async function updateCollection(collection: Game[]): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("UserCollectionByUserName").upsert({
      user_name: userName,
      user_collection: collection.map((currentGame) => currentGame.id),
    });

    if (error) {
      console.error("Sync error:", error);
    }

    return !error;
  }

  return !itemInList ? (
    <div className="flex items-center gap-4">
      <Button onClick={() => addItem(item)}>Add</Button>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Button onClick={() => removeItem(item)}>Remove</Button>
    </div>
  );
}
