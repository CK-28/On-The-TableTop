"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtom, useAtomValue } from "jotai";
import { collectionStatusAtom, userFriendsAtom, userNameAtom } from "@/app/store";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AddRemoveUser({ user, item, alreadyInList }: { user: User, item: string, alreadyInList: boolean }) {
  const [itemInList, setItemInList] = useState(alreadyInList);
  const [userCollection, setUserCollection] = useAtom(userFriendsAtom);
  const userName = useAtomValue(userNameAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);

  if (collectionStatus === "loading") {
    return <span>Loading...</span>;
  } else if (collectionStatus === "error") {
    return <span>Unable to load friends.</span>;
  }

  function addItem(item: string): void {
    const nextCollection = userCollection.some((currentUser) => currentUser.user_name === item)
      ? userCollection
      : [...userCollection, user];
    setUserCollection(nextCollection);

    setItemInList(true);
    updateCollection(nextCollection).then((wasUpdateSuccessful) => {
      setItemInList(wasUpdateSuccessful);
    });
  }

  function removeItem(item: string): void {
    const index = userCollection.findIndex((currentUser) => currentUser.user_name === item);
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

  async function updateCollection(collection: User[]): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("UserCollectionByUserName").upsert({
      user_name: userName,
      user_friends: collection.map((currentUser) => currentUser.user_name),
    });

    if (error) {
      console.error("Sync error:", error);
    }

    // TODO: Used for verification. Can be removed
    const { data: verifyData } = await supabase.from('UserCollectionByUserName').select('user_friends').eq('user_name', userName).single();
    console.log('Verified games in DB:', verifyData?.user_friends);

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
