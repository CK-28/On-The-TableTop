"use client"
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";

function addGame(userGames: number[], gameID: number) {
  const index = userGames.indexOf(gameID);
  if (index > -1) {
    console.log("Game alrady exists in collection");
    return userGames;
  } else {
    return userGames.concat(gameID);
  }
}

function removeGame(userGames: number[], gameID: number) {
  const index = userGames.indexOf(gameID);
  if (index > -1) {
    console.log("Game found, removing from collection");
    userGames.splice(index, 1)
    return userGames;
  } else {
    console.log("Failed to update, game not found in collection");
  }
}

export default function AddRemoveButton({ game, isGameInCollection }: { game: Game, isGameInCollection : boolean }) {
  async function handleClick(gameID: number, isAdd: boolean) {
    const supabase = await createClient();

    // TODO: Is this already done in a parent component? If so, can we pass it down instead of querying again? really shouldnt be done this far down.
    const userName = (await supabase.auth.getUser()).data.user?.user_metadata?.user_name;
    console.log(userName)

    if (!userName) {
      console.error('User not found');
      return;
    }

    const userGames = (await supabase.from('UserCollectionByUserName').select('*').eq('user_name', userName)).data?.[0]?.user_collection || [];
    console.log('User Games:', userGames);

    let updatedGames: any = []
    if (isAdd) {
      if (!userGames || userGames.length === 0) {
        console.log('No games found for user, CREATING new collection');
        const { error: insertError } = await supabase.from('UserCollectionByUserName').insert({ user_name: userName, user_collection: [gameID] });
        if (insertError) {
          // TODO: Handle error
        }
      }

      console.log('Existing games found for user, UPDATING collection');
      updatedGames = addGame(userGames, game.id);
    } else {
      updatedGames = removeGame(userGames, game.id);
    }

    const { error: updateError } = await supabase.from('UserCollectionByUserName').update({ user_collection: updatedGames }).eq('user_name', userName);
    if (updateError) {
      console.error('Update error:', updateError);
    } else {
      console.log('Games updated successfully');
    }

    const { data: verifyData } = await supabase.from('UserCollectionByUserName').select('user_collection').eq('user_name', userName).single();
    console.log('Verified games in DB:', verifyData?.user_collection);
  }

  return !isGameInCollection ? (
    <div className="flex items-center gap-4">
      <Button onClick={() => handleClick(game.id, true)}>Add</Button>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Button onClick={() => handleClick(game.id, false)}>Remove</Button>
    </div>
  );
}
