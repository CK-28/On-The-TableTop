"use client";

import { useAtomValue } from 'jotai';
import { userGamesAtom } from "@/app/store";
import AddRemoveGame from "./add-remove-game";

export default function GameList({ games }: { games: Game[]}) {
  const userCollection = useAtomValue(userGamesAtom);
  
  console.log("In game-list: " + userCollection);
  function findGameInCollection(gameID: number): boolean {
    const index = userCollection.indexOf(gameID);
    return index > -1;
  }

  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id} className="flex flex-row justify-between p-2">
            <div className='w-20 h-20'>
              <img src={game.image} alt={game.name} style={{width : '100%', height: '100%', objectFit: 'contain'}} />
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>{game.name}</span><span>, {game.yearpublished}</span>
            </div>
            <AddRemoveGame item={game.id} alreadyInList={findGameInCollection( game.id )} />
          </li>
        ))}
      </ul>
    </div>
  );
}
