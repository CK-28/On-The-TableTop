"use client";

import { useAtomValue } from 'jotai';
import { userGamesAtom } from "@/app/store";
import { Stack, Divider, Box } from '@mui/material';
import AddRemoveGame from './add-remove-game';

export default function GameList({
  games,
  hidePublisher = false,
  hideAddRemove = false
}: {
  games: Game[];
  hidePublisher?: boolean;
  hideAddRemove?: boolean;
}) {
  const userCollection = useAtomValue(userGamesAtom);
  
  console.log("In game-list: " + userCollection);
  function findGameInCollection(gameID: number): boolean {
    const index = userCollection.indexOf(gameID);
    return index > -1;
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
            <li className="flex flex-row gap-4 p-2">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  flexShrink: 0,
                }}
              >                
                <img src={game.image} alt={game.name} style={{width : '100%', height: '100%', objectFit: 'contain'}} />
              </Box>
              <div className='flex-[2]'>
                <span style={{ fontWeight: 'bold' }}>{game.name}</span><span>, {game.yearpublished}</span>
              </div>
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
            {!hideAddRemove && (
              <AddRemoveGame item={game.id} alreadyInList={findGameInCollection( game.id )} />
            )}
            </li>
          <Divider />
          </Box>
        ))}
      </ul>
    </Stack>
  );
}