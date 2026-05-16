"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Suspense, useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import GameList from "./game-list";
import { Card, CardContent } from "@/components/ui/card";
import Stack from "@mui/material/Stack";

export default function SearchGames() {
    const [searchGame, setSearchGame] = useState("");
    const [searchResults, setSearchResults] = useState<Game[]>([]);

    async function handleClick() {
        console.log(searchGame)
        const supabase = await createClient();

        // TODO: improve search to sort by most popular or something
        const { data, error } = await supabase.rpc('search_boardgames', { search_term: searchGame });

        if (error) {
            console.error(error);
        } 
        
        console.log(data)
        setSearchResults(data || [])
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
                        />
                        <Button onClick={() => handleClick()}>
                            Search
                        </Button>
                    </Stack>
                    <Label>
                        {searchResults?.length} Result(s)
                    </Label>
                    <Suspense fallback={<div>Loading Games...</div>}>
                        <GameList games={searchResults}/>
                    </Suspense>
                </Stack>
            </CardContent>
        </Card>
    );
}