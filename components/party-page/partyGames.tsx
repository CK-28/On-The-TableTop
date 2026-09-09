"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { createClient } from "@/lib/supabase/client";
import GameList from "../game-list";

type LengthFilter = "short" | "medium" | "long" | "killer";
type PlayerFilter = "party" | "1" | "2" | "3" | "4" | "5" | "6" | "7+";

const lengthRanges: Record<LengthFilter, { min: number; max?: number }> = {
    short: { min: 0, max: 29 },
    medium: { min: 30, max: 89 },
    long: { min: 90, max: 240 },
    killer: { min: 240 },
};

function supportsPlayerCount(game: Game, playerCount: number): boolean {
    return game.minplayers <= playerCount && game.maxplayers >= playerCount;
}

function supportsPlayerFilter(game: Game, playerFilter: PlayerFilter | null, partySize: number): boolean {
    if (playerFilter === null) {
        return true;
    }

    const playerCount = playerFilter === "party"
        ? partySize
        : Number.parseInt(playerFilter, 10);

    return playerFilter === "7+"
        ? game.maxplayers >= 7
        : supportsPlayerCount(game, playerCount);
}

function supportsLength(game: Game, lengthFilters: LengthFilter[]): boolean {
    if (lengthFilters.length === 0) {
        return true;
    }

    return lengthFilters.some((lengthFilter) => {
        const range = lengthRanges[lengthFilter];
        return range.max === undefined
            ? game.maxplaytime >= range.min
            : game.minplaytime <= range.max && game.maxplaytime >= range.min;
    });
}

export default function PartyGames({ party }: { party: string[] }) {
    const [games, setGames] = useState<Game[]>([]);
    const [playerFilter, setPlayerFilter] = useState<PlayerFilter | null>(null);
    const [lengthFilters, setLengthFilters] = useState<LengthFilter[]>([]);

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

    const displayedGames = games.filter((game) =>
        supportsPlayerFilter(game, playerFilter, party.length) &&
        supportsLength(game, lengthFilters)
    );

    return (
        <Stack spacing={2}>
            <Box className="rounded-xl border bg-background p-4">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    flexWrap="wrap"
                >
                <Stack direction="row" spacing={1} alignItems="center">
                    <span>Players</span>
                    <ToggleButtonGroup exclusive value={playerFilter} onChange={(_, value: PlayerFilter | null) => setPlayerFilter(value)} size="small" sx={{"& .MuiToggleButton-root": {minWidth: 0, height: 28, px: 0.75, fontSize: "0.65rem",},}}>
                        <ToggleButton value="party">
                            Party
                        </ToggleButton>
                        <ToggleButton value="1">
                            1
                        </ToggleButton>
                        <ToggleButton value="2">
                            2
                        </ToggleButton>
                        <ToggleButton value="3">
                            3
                        </ToggleButton>
                        <ToggleButton value="4">
                            4
                        </ToggleButton>
                        <ToggleButton value="5">
                            5
                        </ToggleButton>
                        <ToggleButton value="6">
                            6
                        </ToggleButton>
                        <ToggleButton value="7+">
                            7+
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <span>Length</span>
                    <ToggleButtonGroup value={lengthFilters} onChange={(_, value: LengthFilter[]) => setLengthFilters(value)} size="small" sx={{"& .MuiToggleButton-root": {minWidth: 0, height: 28, px: 0.75, fontSize: "0.65rem",},}}>
                        <ToggleButton value="short">
                            Short
                        </ToggleButton>
                        <ToggleButton value="medium">
                            Medium
                        </ToggleButton>
                        <ToggleButton value="long">
                            Long
                        </ToggleButton>
                        <ToggleButton value="killer">
                            Killer
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                </Stack>
            </Box>
            <h1 className="text-2xl">Board Games On The Table</h1>
            <GameList games={displayedGames} hidePublisher={true} hideOwners={false} hideAddRemove={true} />
        </Stack>
    );
}