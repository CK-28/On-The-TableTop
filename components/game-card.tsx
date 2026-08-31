import PeopleAlt from "@mui/icons-material/PeopleAlt";
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Card, CardContent, Stack } from "@mui/material";

export default function GameCard({
    game
}: {
    game: Game;
}) {
    function defaultToMinimum(min: number, max: number) {
        return min == max ? min : (min + '-' + max);
    }

    return (
        <Card sx={{
            background: "#f6f2f1",
            marginRight: 2,
            height: "32vh",
            width: "21vh"
        }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1
                }}>
                <Box sx={{ width: "20vh", height: "20vh" }}>
                    <img src={game.image} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 5 }} />
                </Box>
                <span style={{ fontWeight: 'bold', display: 'block', overflowWrap: "break-word", textAlign: "center" }}>{game.name}</span>
                <Stack justifyContent={"space-between"} sx={{ fontSize: '12px', width: "100%", height: "100%" }}>
                    <Stack direction={"row"} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <span style={{ width: "60%" }}>{game.publisher}</span>
                        {Number(game.yearpublished) !== 0 && (
                            <span style={{ fontSize: '12px' }}>{Number(game.yearpublished)}</span>
                        )}
                    </Stack>
                    <Stack direction={"row"} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", paddingTop: 1 }}>
                        <div>
                            <PeopleAlt sx={{ paddingRight: 0.5 }} />
                            <span>{defaultToMinimum(game.minplayers, game.maxplayers)}</span>
                        </div>
                        <div>
                            <TimerIcon sx={{ paddingRight: 0.5 }} />
                            <span>{defaultToMinimum(game.minplaytime, game.maxplaytime)}</span>
                        </div>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}