import PeopleAlt from "@mui/icons-material/PeopleAlt";
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Card, CardContent, Stack } from "@mui/material";

export const GAME_CARD_WIDTH = "21vh";
export const GAME_CARD_GAP = 2;

export default function GameCard({
    game,
}: {
    game: Game;
}) {
    function defaultToMinimum(min: number, max: number) {
        return min == max ? min : (min + '-' + max);
    }

    return (
        <Card sx={{ background: "#f6f2f1", height: "28vh", width: GAME_CARD_WIDTH, display: "flex", flexDirection: "column", border: "1px solid #e5e7eb", borderRadius: 2, boxShadow: "0 2px 8px rgba(30, 41, 59, 0.08)" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, width: "100%", boxSizing: "border-box", p: 1.25, "&:last-child": { pb: 1.25 } }}>
                <Box sx={{ width: "100%", aspectRatio: "4 / 3", borderRadius: 1, overflow: "hidden" }}>
                    <Box component="img" src={game.image} alt={game.name} sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </Box>
                <Box component="span" sx={{ fontWeight: 700, display: "-webkit-box", overflow: "hidden", overflowWrap: "break-word", width: "100%", height: "2.4em", maxHeight: "2.4em", flexShrink: 0, lineHeight: "1.2em", mt: "0.65em", mb: "0.6em", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{game.name}</Box>
                <Stack sx={{ fontSize: 11, width: "100%", minWidth: 0 }}>
                    <Box component="span" sx={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {game.publisher}
                    </Box>
                    {Number(game.yearpublished) !== 0 && (
                        <Box component="span" sx={{ display: "block", mt: 0.375 }}>
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
            </CardContent>
        </Card>
    )
}