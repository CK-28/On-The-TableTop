"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtom, useAtomValue } from "jotai";
import { userCollectionAtom, userNameAtom } from "@/app/store";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AddRemoveGame({ item, alreadyInList }: { item: number, alreadyInList: boolean }) {
  const [itemInList, setItemInList] = useState(alreadyInList);
  const [userCollection, setUserCollection] = useAtom(userCollectionAtom);
  const userName = useAtomValue(userNameAtom);

  // TODO: Consider not checking for items assuming we create tests to check logic behind alreadyInList setting - this is a client component...does efficiency really matter
  function addItem(item: number): void {
    // TODO: do we still care to check for duplicates?
    console.log("Before add: " + userCollection);
    console.log("Adding item: " + item);

    userCollection.push(item);
    setUserCollection(userCollection);
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
      userCollection.splice(index, 1)

      console.log("After removing: " + userCollection);
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
    console.log("collectionAtom: " + userCollectionAtom);

    if (!userCollection) {
      console.log("No games found for user, CREATING new collection");
      const { error: insertError } = await supabase.from('UserCollectionByUserName').insert({ user_name: userName, user_collection: userCollection });
      if (insertError) {
        // TODO: Handle error
      }
    } else {
      const { error: updateError } = await supabase.from('UserCollectionByUserName').update({ user_collection: userCollection }).eq('user_name', userName);
      if (updateError) {
        console.error("Update error:", updateError);
      } else {
        console.log("Games updated successfully");
      }
    }

    const { data: verifyData } = await supabase.from('UserCollectionByUserName').select('user_collection').eq('user_name', userName).single();
    console.log('Verified games in DB:', verifyData?.user_collection);
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
