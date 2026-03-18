"use client";

import { useAtomValue } from 'jotai';
import { userCollectionAtom } from "@/app/store";
import AddRemoveGame from "./add-remove-game";

export default function GameList({ games }: { games: Game[]}) {
  const userCollection = useAtomValue(userCollectionAtom);
  
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
            <button>{game.name}</button>
            <AddRemoveGame item={game.id} alreadyInList={findGameInCollection( game.id )} />
          </li>
        ))}
      </ul>
    </div>
  );
}
