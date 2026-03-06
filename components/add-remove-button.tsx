"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AddRemoveButton({ collection, item, alreadyInList }: { collection: (number | string)[], item: (number | string), alreadyInList : boolean }) {
  const [itemInList, setItemInList] = useState(alreadyInList);

  // TODO: Consider not checking for items assuming we create tests to check logic behind alreadyInList setting - this is a client component...does efficiency really matter
  function addItem(arr: (number | string)[], item: (number | string)): (number | string)[] {
    if (arr.find((i) => i === item)) {
      return arr;
    }
    
    setItemInList(true);
    return [...arr, item];
  }

  function removeItem(arr: (number | string)[], item: (number | string)): (number | string)[] {
    if (arr.find((i) => i === item)) {
      arr = arr.filter((i) => i !== item);
      setItemInList(false);
      return arr;
    }

    console.log("Failed to update, item not found in collection");
    return arr;
  }

  async function handleClick(item: (number|string), isAdd: boolean) {
    const supabase = await createClient();
    const userName = (await supabase.auth.getUser()).data.user?.user_metadata
      ?.user_name;
    if (!userName) {
      console.error("User not found");
      return;
    }

    const userGames =
      (
        await supabase
          .from("UserCollectionByUserName")
          .select("*")
          .eq("user_name", userName)
      ).data?.[0]?.user_collection || [];
    console.log("User Games:", userGames);

    let updatedGames: number[] = [];
    if (isAdd) {
      if (!userGames || userGames.length === 0) {
        console.log("No games found for user, CREATING new collection");
        const { error: insertError } = await supabase
          .from("UserCollectionByUserName")
          .insert({ user_name: userName, user_collection: [gameID] });
        if (insertError) {
          // TODO: Handle error
        }
      }

      console.log("Existing games found for user, UPDATING collection");
      updatedGames = addItem(userGames, item);
    } else {
      updatedGames = removeItem(userGames, item);
    }

    const { error: updateError } = await supabase
      .from("UserCollectionByUserName")
      .update({ user_collection: updatedGames })
      .eq("user_name", userName);
    if (updateError) {
      console.error("Update error:", updateError);
    } else {
      console.log("Games updated successfully");
    }
  }

  return !itemInList ? (
    <div className="flex items-center gap-4">
      <Button onClick={() => handleClick(item, true)}>Add</Button>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Button onClick={() => handleClick(item, false)}>Remove</Button>
    </div>
  );
}
