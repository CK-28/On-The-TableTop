"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import GameList from "./game-list";
import { Card, CardContent } from "@/components/ui/card";
import Stack from "@mui/material/Stack";

export default function SearchGames() {
    const [searchGame, setSearchGame] = useState("");
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        console.log('User searched for "', searchGame, '"')
        setIsLoading(true);
        const supabase = await createClient();

        // TODO: improve search to sort by most popular or something
        try {
            const { data, error } = await supabase.rpc('search_boardgames', { search_term: searchGame });

            if (error) {
                console.error(error);
            }
            
            console.log(data);
            setSearchResults(data || []);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="max-w-[1000px] mx-auto">
            <CardContent className="flex flex-col justify-center items-center p-2">
                <Stack
                    direction="column"
                    spacing={2}
                    marginTop={2}
                    sx={{
                        alignItems: "center",
                    }}>
                    <Stack  
                        direction="row"
                        spacing={1}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Input
                            id="search-games"
                            type="search"
                            placeholder="Search"
                            className="w-80"
                            value={searchGame}
                            onChange={(e) => setSearchGame(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleClick();
                                }
                            }}
                        />
                        <Button onClick={() => handleClick()}>
                            Search
                        </Button>
                    </Stack>
                    <Label>
                        {searchResults?.length} Result(s)
                    </Label>
                    {isLoading ? (
                        <div>Loading Games...</div>
                    ) : (
                        <GameList games={searchResults}/>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}