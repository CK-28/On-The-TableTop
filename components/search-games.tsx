"use client"
import { Input } from "@/components/ui/input";
import { Suspense, useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import GameList from "./game-list";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchGames() {
    const [searchGame, setSearchGame] = useState("");
    const [searchResults, setSearchResults] = useState<Game[]>([]);

    

    async function handleClick() {
        console.log(searchGame)
        const supabase = await createClient();

        // TODO: improve search to sort by most popular or something
        // TODO: make search on partial text
        const BoardGames = (await supabase.from("BoardGames").select().textSearch('name', searchGame)).data;
        // const { data, error } = await supabase.rpc('search_boardgames_partial', { query: searchGame });

        // if (error) console.error(error);
        // else console.log(data);
        
        
        // console.log(BoardGames)
        setSearchResults(BoardGames || [])
    }

    return (
        <Card className="max-w-[1000px] mx-auto">
            <CardContent className="flex flex-col justify-center items-center p-2">
                <div className="flex flex-row gap-2 mb-4 mt-4">
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
                </div>
                <Suspense fallback={<div>Loading Games...</div>}>
                    <GameList games={searchResults} />
                </Suspense>
            </CardContent>
        </Card>
    );
}