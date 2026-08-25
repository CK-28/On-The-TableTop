import SearchGames from "@/components/search-games";
import { Suspense } from "react";

export default function Games() {
  return (
    <div>
      <Suspense fallback={<div className="mx-auto max-w-[1000px] p-6">Loading games...</div>}>
        <SearchGames />
      </Suspense>
    </div>
  );
}