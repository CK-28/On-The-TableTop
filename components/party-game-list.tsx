"use client";

import { useAtomValue } from 'jotai';
import { userGamesAtom } from "@/app/store";
import Divider from '@mui/material/Divider';

export default function PartyGameList({ games }: { games: Game[]}) {
  const userCollection = useAtomValue(userGamesAtom);
  
  console.log("In game-list: " + userCollection);
  function findGameInCollection(gameID: number): boolean {
    const index = userCollection.indexOf(gameID);
    return index > -1;
  }

  function settlePlaytime(minPlayTime: number, maxPlayTime: number) {
    return "";
  }

  return (
    <div className="flex justify-center">
      <ul className="w-full">
        {games.map((game) => (
          <div key={game.id}>
            <li className="flex flex-row gap-4 p-2">
              <div className='w-20 h-20 flex-shrink-0'>
                <img src={game.image} alt={game.name} style={{width : '100%', height: '100%', objectFit: 'contain'}} />
              </div>
              <div className='flex-[2]'>
                <span style={{ fontWeight: 'bold' }}>{game.name}</span><span>, {game.yearpublished}</span>
              </div>
              <div className='flex-[0.5] flex items-center justify-center flex-col' style={{fontSize: '12px'}}>
                <span>{game.minplayers} - {game.maxplayers} players</span>
                <br />
                <span>{game.minplaytime} - {game.maxplaytime} min</span>
              </div>
            </li>
          <Divider />
          </div>
        ))}
      </ul>
    </div>
  );
}