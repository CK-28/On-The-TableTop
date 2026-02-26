import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import GameList from "@/components/game-list";
import SearchGames from "@/components/search-games";

export default function Games() {
  return (
    <div>
      <SearchGames/>
    </div>
  );
}