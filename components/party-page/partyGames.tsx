"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { createClient } from "@/lib/supabase/client";
import GameList from "../game-list";

type LengthFilter = "short" | "medium" | "long" | "killer";

const lengthRanges: Record<LengthFilter, { min: number; max?: number }> = {
    short: { min: 0, max: 29 },
    medium: { min: 30, max: 89 },
    long: { min: 90, max: 240 },
    killer: { min: 240 },
};

function supportsPlayerCount(game: Game, playerCount: number): boolean {
    return game.minplayers <= playerCount && game.maxplayers >= playerCount;
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
    const [filterByPlayerCount, setFilterByPlayerCount] = useState(false);
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
        (!filterByPlayerCount || supportsPlayerCount(game, party.length)) &&
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filterByPlayerCount}
                            onChange={(event) => setFilterByPlayerCount(event.target.checked)}
                        />
                    }
                    label="Limit by party size"
                />
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