"use client";

import { useAtomValue } from 'jotai';
import { collectionStatusAtom, userGamesAtom } from "@/app/store";
import { Stack, Divider, Box } from '@mui/material';
import AddRemoveGame from './add-remove-game';

export default function GameList({
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
  function findGameInCollection(gameID: number): boolean {
    return userCollection.some((game) => game.id === gameID);
  }

  function defaultToMinimum(min: number, max: number) {
    return min == max ? min : (min + '-' + max);
  }

  return (
      <Stack
        alignItems="center"
        justifyContent="center"
      >
      <ul className="w-full">
        {games.map((game) => (
          <Box key={game.id}>
            <li className="flex flex-row gap-4 p-2 flex-wrap items-start">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  flexShrink: 0,
                }}
              >                
                <img src={game.image} alt={game.name} style={{width : '100%', height: '100%', objectFit: 'contain'}} />
              </Box>
              <div className='flex-[2]' style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', overflowWrap: 'anywhere', wordBreak: 'break-word', whiteSpace: 'normal' }}>
                  <span style={{ fontWeight: 'bold', display: 'block', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{game.name}</span>
                  {Number(game.yearpublished) !== 0 && (
                    <span style={{ fontSize: '12px' }}>{Number(game.yearpublished)}</span>
                  )}
                </div>
              </div>
            {!hideGameStats && (
              <Stack
                flex={0.5}
                alignItems="center"
                justifyContent="center"
                sx={{ fontSize: '12px' }}
              >                
                <span>{defaultToMinimum(game.minplayers, game.maxplayers)} players</span>
                <br />
                <span>{defaultToMinimum(game.minplaytime, game.maxplaytime)} min</span>
              </Stack>
            )}
            {!hidePublisher && (
              <Stack
                flex={0.5}
                alignItems="center"
                justifyContent="center"
                sx={{ fontSize: '12px' }}
              >  
                <span>{game.publisher}</span>
              </Stack>
            )}
            {!hideOwners && (
              <Stack
                flex={0.5}
                alignItems="center"
                justifyContent="center"
                sx={{ fontSize: "12px" }}
              >
                <span>
                  {(game.owners ?? []).join(", ")}
                </span>
              </Stack>
            )}
            {!hideAddRemove && (
              <AddRemoveGame game={game} item={game.id} alreadyInList={findGameInCollection(game.id)} />
            )}
            </li>
          <Divider />
          </Box>
        ))}
      </ul>
    </Stack>
  );
}