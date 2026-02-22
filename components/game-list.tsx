"use client";

import { createClient } from "@/lib/supabase/client";

// TODO: Move this to a shared file of types/interfaces/constants/etc.
type Game = {
    id: number;
    name: string;
    year_published: number;
    is_expansion: boolean;
};

async function handleClick(gameID: number) {
    const supabase = await createClient();

    // TODO: Is there a better way to grab the userID? (better yet, not grab it at all? For security reasons)
    const userName = (await supabase.auth.getUser()).data.user?.user_metadata?.user_name;
    console.log(userName)
    
    if (!userName) {
        console.error('User ID not found');
        return;
    }

    const userGames = (await supabase.from('UserCollectionByUserName').select('*').eq('user_name', userName)).data?.[0]?.user_collection || [];
    console.log('User Games:', userGames);

    if (!userGames || userGames.length === 0) {
        console.log('No games found for user, CREATING new collection');
        const { error: insertError } = await supabase.from('UserCollectionByUserName').insert({ user_name: userName, user_collection: [gameID] });
        if (insertError) {
        // TODO: Handle error
        }
        
        return;
    }

    console.log('Existing games found for user, UPDATING collection');
    const updatedGames = userGames.concat(gameID);
    // TODO: Do not allow duplicates of gameIDs in the collection
    const { error: updateError } = await supabase.from('UserCollectionByUserName').update({ user_collection: updatedGames }).eq('user_name', userName);
    if (updateError) {
        console.error('Update error:', updateError);
    } else {
        console.log('Games updated successfully');
    }

    const { data: verifyData } = await supabase.from('UserCollectionByUserName').select('user_collection').eq('user_name', userName).single();
    console.log('Verified games in DB:', verifyData?.user_collection);
}

export default function GameList({ games }: { games: Game[] }) {
  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <button onClick={() => handleClick(game.id)}>{game.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
