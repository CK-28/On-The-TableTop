"use client";

import { useAtomValue } from 'jotai';
import { userFriendsAtom, userNameAtom } from "@/app/store";
import AddRemoveUser from "./add-remove-user";

export default function UserList({ users }: { users: User[] }) {
  const userCollection = useAtomValue(userFriendsAtom);
  const userName = useAtomValue(userNameAtom);

  function findUserInCollection(userName: string): boolean {
    const index = userCollection.indexOf(userName);
    return index > -1;
  }
  
  return (
    <div>
      <ul>
        {users.filter((user) => user.user_name !== userName).map((user) => (
          <li key={user.id} className="flex flex-row justify-between p-2">
            <button>{user.user_name}</button>
            <AddRemoveUser item={user.user_name} alreadyInList={findUserInCollection( user.user_name )} />
          </li>
        ))}
      </ul>
    </div>
  );
}
