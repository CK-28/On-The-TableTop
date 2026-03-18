"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { atomEffect } from "jotai-effect";
import { createClient } from "@/lib/supabase/client";
import { userCollectionAtom, userNameAtom } from "@/app/store";

export function useSyncUserCollection() {
  const supabase = createClient();
  const userName = useAtomValue(userNameAtom);
  const userGames = useAtomValue(userCollectionAtom);

  useEffect(() => {
    async function sync() {
      console.log("useEffect trigger")
      console.log(userGames);
      const { error } = await supabase.from("UserCollectionByUserName").upsert({user_name: userName, user_collection: userGames});

      if (error) {
        console.error("Sync error:", error);
      } else {
        console.log("Collection synced");
      }
    }

    sync();
  }, [supabase, userName, userGames]);
}