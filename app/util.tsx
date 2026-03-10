"use Client";

import { createClient } from "@/lib/supabase/client";
import { userCollectionAtom, userNameAtom } from "@/app/store";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

export const useUpdateGamesCollection = () => {
    const supabase = createClient();
    const userName = useAtomValue(userNameAtom);
    const userCollection = useAtomValue(userCollectionAtom);

    // TODO: user upsert (combined insert and update)
    const useUpdateGamesCollection = useCallback(async () => {
      if (!userCollection) {
      console.log("No games found for user, CREATING new collection");
      const { error: insertError } = await supabase.from('UserCollectionByUserName').insert({ user_name: userName, user_collection: userCollection });
      if (insertError) {
        console.error("Insert error:", insertError);
      } else {
        console.log("Games created successfully");
      }
    } else {
      const { error: updateError } = await supabase.from('UserCollectionByUserName').update({ user_collection: userCollection }).eq('user_name', userName);
      if (updateError) {
        console.error("Update error:", updateError);
      } else {
        console.log("Games updated successfully");
      }
    }
  }, [supabase, userName, userCollection]);
  return useUpdateGamesCollection;
}
