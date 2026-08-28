"use client";

import { useAtomValue } from 'jotai';
import { collectionStatusAtom, userGamesAtom } from "@/app/store";
import { Stack, Divider, Box, Card, CardContent, Grid } from '@mui/material';
import AddRemoveGame from './add-remove-game';

export default function GameListHome({
  games,
  hidePublisher = false,
  hideAddRemove = false,
  hideGameStats = false,
  hideOwners = false,
}: {
  games: Game[];
  hidePublisher?: boolean;
  hideAddRemove?: boolean;
  hideGameStats?: boolean;
  hideOwners?: boolean;
}) {
  const userCollection = useAtomValue(userGamesAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);

  if (collectionStatus === "loading") {
    return <p>Loading...</p>;
  } else if (collectionStatus === "error") {
    return <p>Unable to load collection.</p>;
  }

  console.log("In game-list: " + userCollection);

  function defaultToMinimum(min: number, max: number) {
    return min == max ? min : (min + '-' + max);
  }

  return (
    <ul style={{ display: "flex", overflow: "auto", padding: 1 }}>
      {games.map((game) => (
        <li key={game.id}>
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
                alignItems: "center"
              }}>
              <Box sx={{ width: "20vh", height: "20vh" }}>
                <img src={game.image} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
              </Box>
              <span style={{ fontWeight: 'bold', display: 'block', overflowWrap: "break-word", padding: 2, textAlign: "center" }}>{game.name}</span>
              <Stack justifyContent={"space-between"} sx={{ fontSize: '12px', width: "100%", height: "100%" }}>
                <Stack direction={"row"} sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingTop: 2 }}>
                  <span style={{ width: "60%" }}>{game.publisher}</span>
                  {Number(game.yearpublished) !== 0 && (
                    <span style={{ fontSize: '12px' }}>{Number(game.yearpublished)}</span>
                  )}
                </Stack>
                <Stack direction={"row"} sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingTop: 1 }}>
                  <span>{defaultToMinimum(game.minplayers, game.maxplayers)}</span>
                  <span>{defaultToMinimum(game.minplaytime, game.maxplaytime)}</span>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </li>
      ))
      }
    </ul >
  );
}