"use client";

import { useAtomValue } from 'jotai';
import { collectionStatusAtom, userFriendsAtom, userNameAtom } from "@/app/store";
import AddRemoveUser from "./add-remove-user";

export default function UserList({ users }: { users: User[] }) {
  const userCollection = useAtomValue(userFriendsAtom);
  const userName = useAtomValue(userNameAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);

  if (collectionStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (collectionStatus === "error") {
    return <p>Unable to load friends.</p>;
  }

  function findUserInCollection(userName: string): boolean {
    const index = userCollection.indexOf(userName);
    return index > -1;
  }
  
  return (
    <div className="flex justify-center">
      <ul className="w-full">
        {users.filter((user) => user.user_name !== userName).map((user) => (
          <li key={user.id} className="flex items-center justify-between gap-4 p-2 w-80 mx-auto">
            <span>{user.user_name}</span>
            <AddRemoveUser item={user.user_name} alreadyInList={findUserInCollection(user.user_name)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
