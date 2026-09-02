"use client";

import { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { createClient } from "@/lib/supabase/client";
import GameList from "../game-list";

export default function PartyGames({ party }: { party: string[] }) {
    const [games, setGames] = useState<Game[]>([]);
    const [filterByPlayerCount, setFilterByPlayerCount] = useState(false);

    useEffect(() => {
        if (party.length === 0) {
            return;
        }

        async function loadGames() {
            const supabase = createClient();
            const { data, error } = await supabase.functions.invoke(
                "getPartyGames",
                {
                    body: {
                        players: party,
                    },
                }
            );

            console.log("Response from getPartyGames function:", { data, error });
            setGames(data?.data ?? []);
        }

        loadGames();
    }, [party]);

    const displayedGames = filterByPlayerCount
        ? games.filter(
                (game) => game.minplayers <= party.length && game.maxplayers >= party.length
            )
        : games;

    return (
        <Stack spacing={2}>
            <Box className="rounded-xl border bg-background p-4">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filterByPlayerCount}
                            onChange={(event) => setFilterByPlayerCount(event.target.checked)}
                        />
                    }
                    label="Limit by party size"
                />
            </Box>
            <h1 className="text-2xl">Board Games On The Table</h1>
            <GameList games={displayedGames} hidePublisher={true} hideOwners={false} hideAddRemove={true} />
        </Stack>
    );
}