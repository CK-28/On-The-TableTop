"use client"
import { Input } from "@/components/ui/input";
import { Suspense, useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import GameList from "./game-list";

export default function SearchGames() {
    const [searchGame, setSearchGame] = useState("");
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const [userCollection, setUserCollection] = useState<number[]>([]);

    async function handleClick() {
        console.log(searchGame)
        const supabase = await createClient();

        // TODO: improve search to sort by most popular or something
        const BoardGames = (await supabase.from("BoardGames").select().textSearch('name', searchGame)).data;
        console.log(BoardGames)
        setSearchResults(BoardGames || [])
        
        // Needed to compare against and determine what button to show. Calling here to avoid querying collection for every game
        getUserCollection();
    }


    // TODO: Why grabbing user collection here and not in GameList?
    async function getUserCollection() {
        const supabase = await createClient();
        const userName = (await supabase.auth.getUser()).data.user?.user_metadata?.user_name;

        const userGames = (await supabase.from('UserCollectionByUserName').select('*').eq('user_name', userName)).data?.[0]?.user_collection || [];
        console.log('User Games:', userGames);
        setUserCollection(userGames || []);
    }

    return (
        <div className="flex flex-col justify-center items-center p-2">
            <div className="flex flex-row gap-2">
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
                <GameList games={searchResults} userCollection={userCollection} />
            </Suspense>
        </div>
    );
}