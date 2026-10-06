"use client"
import { Label } from "@/components/ui/label";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { collectionStatusAtom, userGamesAtom } from "@/app/store";
import AddRemoveGame from "./add-remove-game";
import GameCard, { GAME_CARD_GAP, GAME_CARD_WIDTH } from "./game-card";
import { Box, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";

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
        <Stack
            direction="column"
            spacing={2}
            marginTop={2}
            sx={{
                alignItems: "center",
            }}>
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
                    sx={{
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fill, ${GAME_CARD_WIDTH})`,
                        columnGap: GAME_CARD_GAP,
                        rowGap: 3,
                        justifyContent: "center",
                        listStyle: "none",
                        margin: 0,
                        p: 1,
                        width: "100%",
                    }}
                >
                    {searchResults.map((game) => (
                        <Box
                            component="li"
                            key={game.id}
                            sx={{
                                minWidth: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
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