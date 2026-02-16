import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function GamesData() {
  const supabase = await createClient();
  const { data: BoardGames } = await supabase.from("BoardGames").select();

  return <pre>{JSON.stringify(BoardGames, null, 2)}</pre>;
}

export default function Games() {
  return (
    <Suspense fallback={<div>Loading Games...</div>}>
      <GamesData />
    </Suspense>
  );
}