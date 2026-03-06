"use client";

import AddRemoveButton from "./add-remove-button";

export default function GameList({ games, userCollection }: { games: Game[], userCollection : number[] }) {
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
            <AddRemoveButton  collection={userCollection} item={game.id} alreadyInList={findGameInCollection( game.id )} />
          </li>
        ))}
      </ul>
    </div>
  );
}
