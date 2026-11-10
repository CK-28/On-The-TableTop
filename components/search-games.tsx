"use client"

import { useAtomValue } from "jotai";
import { collectionStatusAtom } from "@/app/store";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Label } from "./ui/label";
import GameList from "./game-list";

export default function SearchGames() {
    const searchParams = useSearchParams();
    const searchGame = searchParams.get("search") || "";
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const collectionStatus = useAtomValue(collectionStatusAtom);

    const handleSearch = useCallback(async (term: string) => {
        console.log('User searched for "', searchGame, '"')
        setIsLoading(true);
        const supabase = await createClient();

        // TODO: improve search to sort by most popular or something
        try {
            const { data, error } = await supabase.rpc('search_boardgames', { search_term: term });

            if (error) {
                console.error(error);
            }

            console.log(data);
            setSearchResults(data || []);
        } finally {
            setIsLoading(false);
        }
    }, [searchGame]);

    useEffect(() => {
        if (searchGame) {
            void handleSearch(searchGame);
        } else {
            setSearchResults([]);
        }
    }, [handleSearch, searchGame]);

    return (
        <Stack className="search-stack" spacing={2}>
            <Label>
                {searchGame ? `${searchResults.length} Result(s)` : "Search for a game"}
            </Label>
            <div className="search-results">
                {isLoading ? (
                    <div>Loading Games...</div>
                ) : collectionStatus === "loading" ? (
                    <div>Loading collection...</div>
                ) : collectionStatus === "error" ? (
                    <div>Unable to load collection.</div>
                ) : (
                    <GameList games={searchResults} hideOwners={true} actionOnRight={true} />
                )}
            </div>
        </Stack>
    );
}