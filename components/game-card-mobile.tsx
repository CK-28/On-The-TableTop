import PeopleAlt from "@mui/icons-material/PeopleAlt";
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Stack } from "@mui/material";
import { useState } from "react";

export const GAME_CARD_WIDTH = "21vh";
export const GAME_CARD_GAP = 2;

export default function GameCardMobile({
    game,
}: {
    game: Game;
}) {
    const [showInfo, setShowInfo] = useState(false);

    function defaultToMinimum(min: number, max: number) {
        return min == max ? min : (min + '-' + max);
    }

    return (showInfo ? (
        <Box onClick={() => setShowInfo(!showInfo)}
            sx={{
                width: "15vh",
                height: "100%",
                objectFit: "contain",
                display: "flex",
                flexDirection: "column",
                alignItems: "justify-between",
                justifyContent: "flex-end",
                backgroundColor: "#5f6769",
                color: "white",
                padding: "5%",
                borderRadius: "5%"
            }}>
            <div>
                <Box component="span" sx={{ fontWeight: 700, display: "-webkit-box", overflow: "hidden", overflowWrap: "break-word", textAlign: "r", width: "100%", height: "2.4em", maxHeight: "2.4em", flexShrink: 0, lineHeight: "1.2em", mt: "0.65em", mb: "0.6em", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{game.name}</Box>
                <Stack direction="row" sx={{ fontSize: 11, width: "100%", minWidth: 0, alignItems: "center", gap: 0.5 }}>
                    <Box component="span" sx={{ minWidth: 0, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {game.publisher}
                    </Box>
                    {Number(game.yearpublished) !== 0 && (
                        <Box component="span" sx={{ flexShrink: 0 }}>
                            {Number(game.yearpublished)}
                        </Box>
                    )}
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", pt: 1, mt: "auto", fontSize: 11 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.375 }}>
                        <PeopleAlt sx={{ fontSize: 16 }} />
                        <span>{defaultToMinimum(game.minplayers, game.maxplayers)}</span>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.375 }}>
                        <TimerIcon sx={{ fontSize: 16 }} />
                        <span>{defaultToMinimum(game.minplaytime, game.maxplaytime)}</span>
                    </Box>
                </Stack>
            </div>
        </Box>
    ) : (
        <Box onClick={() => setShowInfo(!showInfo)}
            sx={{
                width: "15vh",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "white",
                borderRadius: "5%"
            }}>
            <img
                src={game.image} alt={game.name} style={{ maxWidth: "14vh", maxHeight: "auto", objectFit: "contain", borderRadius: "5%" }}
            />
        </Box>
    ))
}