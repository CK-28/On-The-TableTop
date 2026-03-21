"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtom, useAtomValue } from "jotai";
import { userFriendsAtom, userNameAtom } from "@/app/store";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AddRemoveUser({ item, alreadyInList }: { item: string, alreadyInList: boolean }) {
  const [itemInList, setItemInList] = useState(alreadyInList);
  const [userCollection, setUserCollection] = useAtom(userFriendsAtom);
  const userName = useAtomValue(userNameAtom);

  // TODO: Consider not checking for items assuming we create tests to check logic behind alreadyInList setting - this is a client component...does efficiency really matter
  function addItem(item: string): void {
    // TODO: do we still care to check for duplicates?
    userCollection.push(item);
    setUserCollection(userCollection);

    setItemInList(true);
    updateCollection().then((wasUpdateSuccessful) => {
      setItemInList(wasUpdateSuccessful);
    })
  }

  function removeItem(item: string): void {
    const index = userCollection.indexOf(item);
    if (index > -1) {
      userCollection.splice(index, 1)

      setUserCollection(userCollection);
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

    const { data: verifyData } = await supabase.from('UserCollectionByUserName').select('user_friends').eq('user_name', userName).single();
    console.log('Verified games in DB:', verifyData?.user_friends);
    return true;
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
