"use client";

import { useAtomValue } from 'jotai';
import { collectionStatusAtom, userGamesAtom } from "@/app/store";
import GameCard from './game-card';

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
    <ul style={{ display: "flex", overflow: "auto", padding: 1 }}>
      {games.map((game) => (
        <li key={game.id}>
          <GameCard game={game}/>
        </li>
      ))
      }
    </ul >
  );
}