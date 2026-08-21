"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtom, useAtomValue } from "jotai";
import { collectionStatusAtom, userGamesAtom, userNameAtom } from "@/app/store";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AddRemoveGame({ item, alreadyInList }: { item: number, alreadyInList: boolean }) {
  const [itemInList, setItemInList] = useState(alreadyInList);
  const [userCollection, setUserCollection] = useAtom(userGamesAtom);
  const userName = useAtomValue(userNameAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);

  if (collectionStatus === "loading") {
    return <span>Loading...</span>;
  }

  if (collectionStatus === "error") {
    return <span>Unable to load collection.</span>;
  }

  function addItem(item: number): void {
    console.log("Before add: " + userCollection);
    console.log("Adding item: " + item);

    setUserCollection((currentCollection) => [...currentCollection, item]);
    console.log("After add: " + userCollection);

    setItemInList(true);
    updateCollection().then((wasUpdateSuccessful) => {
      setItemInList(wasUpdateSuccessful);
    })
  }

  function removeItem(item: number): void {
    const index = userCollection.indexOf(item);
    if (index > -1) {
      console.log("Before remove: " + userCollection);
      console.log("Removing item: " + item);
      const nextCollection = userCollection.filter((_, currentIndex) => currentIndex !== index);
      console.log("After removing: " + nextCollection);
      setUserCollection(nextCollection);
    } else {
      console.log("Failed to update, item not found in collection");
    }

    setItemInList(false);
    updateCollection().then((wasUpdateSuccessful) => {
      setItemInList(!wasUpdateSuccessful);
    })
  }

  async function updateCollection(): Promise<boolean> {
    const supabase = createClient();
    console.log("username: " + userName);
    console.log("collection: " + userCollection);
    console.log("collectionAtom: " + userGamesAtom);

    const { error } = await supabase.from("UserCollectionByUserName").upsert({user_name: userName, user_collection: userCollection});

    if (error) {
      console.error("Sync error:", error);
    } else {
      console.log("Collection synced");
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
