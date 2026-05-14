"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { userNameAtom, userGamesAtom, userFriendsAtom } from "@/app/store";
import { PageMenu } from "@/components/PageMenu";
import { createClient } from "@/lib/supabase/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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

    // Example Edge Function call
    // const { data, error } = await supabase.functions.invoke('hello-world', {
    //   body: { name: 'Functions' },
    // })

    // console.log("Hello world function response: ", data, error);
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Card className="max-w-5xl">
        <CardContent className="flex-1 flex flex-col justify-center items-center gap-10 p-5">
          <PageMenu />
        </CardContent>
      </Card>
    </div>
  );
}
