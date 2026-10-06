"use client"
import { useAtomValue } from "jotai";
import { collectionStatusAtom, userGamesAtom } from "@/app/store";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { Label } from "./ui/label";
import { Box, Stack } from "@mui/material";

import AddRemoveGame from "./add-remove-game";
import GameCard from "./game-card";

export default function SearchGames() {
    const searchParams = useSearchParams();
    const searchGame = searchParams.get("search") || "";
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const userCollection = useAtomValue(userGamesAtom);
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
            {isLoading ? (
                <div>Loading Games...</div>
            ) : collectionStatus === "loading" ? (
                <div>Loading collection...</div>
            ) : collectionStatus === "error" ? (
                <div>Unable to load collection.</div>
            ) : (
                <Box
                    component="ul"
                    className="game-search-grid"
                >
                    {searchResults.map((game) => (
                        <Box
                            component="li"
                            key={game.id}
                        >
                            <GameCard game={game} />
                            <AddRemoveGame
                                game={game}
                                item={game.id}
                                alreadyInList={userCollection.some((currentGame) => currentGame.id === game.id)}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </Stack>
    );
}