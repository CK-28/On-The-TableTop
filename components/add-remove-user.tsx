"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtom, useAtomValue } from "jotai";
import { collectionStatusAtom, userFriendsAtom, userNameAtom } from "@/app/store";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AddRemoveUser({ item, alreadyInList }: { item: string, alreadyInList: boolean }) {
  const [itemInList, setItemInList] = useState(alreadyInList);
  const [userCollection, setUserCollection] = useAtom(userFriendsAtom);
  const userName = useAtomValue(userNameAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);

  if (collectionStatus === "loading") {
    return <span>Loading...</span>;
  }

  if (collectionStatus === "error") {
    return <span>Unable to load friends.</span>;
  }

  function addItem(item: string): void {
    setUserCollection((currentCollection) => [...currentCollection, item]);

    setItemInList(true);
    updateCollection().then((wasUpdateSuccessful) => {
      setItemInList(wasUpdateSuccessful);
    })
  }

  function removeItem(item: string): void {
    const index = userCollection.indexOf(item);
    if (index > -1) {
      setUserCollection(userCollection.filter((_, currentIndex) => currentIndex !== index));
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
    console.log("collectionAtom: " + userFriendsAtom);

    const { error } = await supabase.from("UserCollectionByUserName").upsert({user_name: userName, user_friends: userCollection});

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
