"use client";

import { createClient } from "@/lib/supabase/client";

// TODO: Move this to a shared file of types/interfaces/constants/etc.
type Game = {
    id: number;
    name: string;
    yearpublished: number;
    is_expansion: boolean;
};

async function handleClick(gameID: number) {
    const supabase = await createClient();

    // TODO: Is there a better way to grab the userID? (better yet, not grab it at all? For security reasons)
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    if (!userId) {
        console.error('User ID not found');
        return;
    }

    const userGames = (await supabase.from('userCollection').select('*').eq('user_id', userId)).data?.[0]?.games || [];
    console.log('User Games:', userGames);

    if (!userGames || userGames.length === 0) {
        console.log('No games found for user, CREATING new collection');
        const { error: insertError } = await supabase.from('userCollection').insert({ user_id: userId, games: [gameID] });
        if (insertError) {
        // TODO: Handle error
        }
        
        return;
    }

    console.log('Existing games found for user, UPDATING collection');
    const updatedGames = userGames.concat(gameID);
    // TODO: Do not allow duplicates of gameIDs in the collection
    const { error: updateError } = await supabase.from('userCollection').update({ games: updatedGames }).eq('user_id', userId);
    if (updateError) {
        console.error('Update error:', updateError);
    } else {
        console.log('Games updated successfully');
    }

    const { data: verifyData } = await supabase.from('userCollection').select('games').eq('user_id', userId).single();
    console.log('Verified games in DB:', verifyData?.games);
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
