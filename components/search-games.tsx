"use client"
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import GameList from "./game-list";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "next/navigation";

export default function SearchGames() {
    const searchParams = useSearchParams();
    const searchGame = searchParams.get("search") || "";
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            ) : (
                <GameList games={searchResults} />
            )}
        </Stack>
    );
}