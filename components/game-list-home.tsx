"use client";

import { useAtomValue } from 'jotai';
import { collectionStatusAtom, userGamesAtom } from "@/app/store";
import GameCard, { GAME_CARD_GAP } from './game-card';
import { Box } from '@mui/material';

export default function GameListHome({
  games
}: {
  games: Game[];
}) {
  const userCollection = useAtomValue(userGamesAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);

  if (collectionStatus === "loading") {
    return <p>Loading...</p>;
  } else if (collectionStatus === "error") {
    return <p>Unable to load collection.</p>;
  }

  console.log("In game-list: " + userCollection);

  return (
    <Box component="ul" sx={{ display: "flex", gap: GAME_CARD_GAP, overflow: "auto", p: 1 }}>
      {games.map((game) => (
        <li key={game.id}>
          <GameCard game={game}/>
        </li>
      ))
      }
    </Box>
  );
}