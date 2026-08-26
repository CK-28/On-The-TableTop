"use client";

import { useAtomValue } from 'jotai';
import { collectionStatusAtom, userGamesAtom } from "@/app/store";
import { Stack, Divider, Box, Card, CardContent } from '@mui/material';
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
    <ul style={{ display: "flex" }}>
      {games.map((game) => (
        <Box key={game.id} >
          <Card sx={{
            background: "#f6f2f1",
            marginRight: 2
          }}>
            <CardContent>
              <li style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: 5 }}>
                <Box
                  sx={{
                    width: "30",
                    height: "20vh",
                    flexShrink: 0
                  }}
                >
                  <img src={game.image} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
                <br />
                <span style={{ fontWeight: 'bold', display: 'block', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{game.name}</span>
                <Stack
                  flex={0.5}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ fontSize: '12px' }}
                >
                  {/* TODO: Show on hover or expand or something? */}
                  {/* <span>{defaultToMinimum(game.minplayers, game.maxplayers)} players</span>
                  <span>{defaultToMinimum(game.minplaytime, game.maxplaytime)} min</span>
                  <span>{game.publisher}</span> */}
                  {Number(game.yearpublished) !== 0 && (
                    <span style={{ fontSize: '12px' }}>{Number(game.yearpublished)}</span>
                  )}
                </Stack>
              </li>
            </CardContent>
          </Card>
        </Box>
      ))}
    </ul>
  );
}