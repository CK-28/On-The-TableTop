import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import GameList from "@/components/game-list";
import SearchGames from "@/components/search-games";
import PageHeader from "@/components/page-header";

export default function Games() {
  return (
    <div>
      <PageHeader />
      <SearchGames />
    </div>
  );
}