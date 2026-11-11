"use client";

import { useAtomValue } from 'jotai';
import { collectionStatusAtom, userGamesAtom } from "@/app/store";
import GameCardDesktop, { GAME_CARD_GAP } from './game-card-desktop';
import { Box } from '@mui/material';

export default function GameListHome({
  games,
  imageOnly
}: {
  games: Game[];
  imageOnly: boolean;
}) {
  const userCollection = useAtomValue(userGamesAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);

  if (collectionStatus === "loading") {
    return <p>Loading...</p>;
  } else if (collectionStatus === "error") {
    return <p>Unable to load collection.</p>;
  }

  console.log("In game-list: " + userCollection);

  function displayInfo(game: Game) {
    console.log(game);
  }

  return (
    // imageOnly ? (
    // TODO - centre vertically
    // <ImageList cols={1} gap={10} sx={{display:"flex", flexDirection: "row", overflow: "scroll"}}>
    //   {games.map((game) => (
    //     <ImageListItem key={game.image} sx={{aspectRatio: "4 / 3", maxHeight: "10vh"}}> 
    //       <img
    //         srcSet={`${game.image}`}
    //         src={`${game.image}`}
    //         alt={game.name}
    //         loading="lazy"
    //         onClick={() => displayInfo(game)}
    //       />
    //     </ImageListItem>
    //   ))}
    // </ImageList>

  // ) : (
    <Box className="home-game-list" component="ul" sx={{ display: "flex", gap: GAME_CARD_GAP, overflowX: "auto", overflowY: "hidden", p: 1 }}>
      {games.map((game) => (
        <li key={game.id}>
          <GameCardDesktop game={game} imageOnly={imageOnly} />
        </li>
      ))}
    </Box>
  // )
  );
}