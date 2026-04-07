"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { userNameAtom, userGamesAtom, userFriendsAtom } from "@/app/store";
import { PageMenu } from "@/components/PageMenu";
import { createClient } from "@/lib/supabase/client";

export default function ProtectedPage() {
  const userName = useAtomValue(userNameAtom);
  const setUserCollection = useSetAtom(userGamesAtom);
  const setUserFriends = useSetAtom(userFriendsAtom);

  asyncFuntion();
  async function asyncFuntion() {
    const supabase = await createClient();
    // TODO: update userGames to come from store
    const userGames =
      (
        await supabase
          .from("UserCollectionByUserName")
          .select("*")
          .eq("user_name", userName)
      ).data?.[0]?.user_collection || [];
    console.log("In protected new - userGames: " + userGames);
    setUserCollection(userGames);
    
    const userFriends =
      (
        await supabase
          .from("UserCollectionByUserName")
          .select("*")
          .eq("user_name", userName)
      ).data?.[0]?.user_friends || [];
    setUserFriends(userFriends);
  }

  return (
    <div className="w-full flex flex-col">
      <div>
        <p>{userName}</p>
        <PageMenu />
      </div>
    </div>
  );
}
