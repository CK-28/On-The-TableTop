"use client";

import AddRemoveButton from "./add-remove-button";

export default function GameList({ games, userCollection }: { games: Game[], userCollection : number[] }) {
  function findGameInCollection(gameID: any): boolean {
    const index = userCollection.indexOf(gameID);
    return index > -1;
  }

  // TODO: AddRemoveButton needs to update status when clicked
  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id} className="flex flex-row justify-between p-2">
            <button>{game.name}</button>
            <AddRemoveButton game={game} isGameInCollection={findGameInCollection( game.id )} />
          </li>
        ))}
      </ul>
    </div>
  );
}
