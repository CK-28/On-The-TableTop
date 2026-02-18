import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import GameList from "@/components/game-list";

async function GamesData() {
  const supabase = await createClient();
  const { data: BoardGames } = await supabase.from("BoardGames").select();

  return (
    <div>
      <GameList games={BoardGames || []} />
    </div>
  );
}

export default function Games() {
  return (
    <Suspense fallback={<div>Loading Games...</div>}>
      <GamesData />
    </Suspense>
  );
}