"use client";

import { useAtomValue } from 'jotai';
import { userFriendsAtom } from "@/app/store";
import AddRemoveUser from "./add-remove-user";

// TODO create partyUsers to match partyGames to display list of users without add or remove button
export default function UserList({ users }: { users: User[] }) {
  const userCollection = useAtomValue(userFriendsAtom);

  // TODO: User can add themselves as a friend...stop that.
  function findUserInCollection(userName: string): boolean {
    const index = userCollection.indexOf(userName);
    return index > -1;
  }
  
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex flex-row justify-between p-2">
            <button>{user.user_name}</button>
            <AddRemoveUser item={user.user_name} alreadyInList={findUserInCollection( user.user_name )} />
          </li>
        ))}
      </ul>
    </div>
  );
}
