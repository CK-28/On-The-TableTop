"use client";

import { createClient } from "@/lib/supabase/client";

// TODO: Move this to a shared file of types/interfaces/constants/etc.
type User = {
    id: number;
    user_name: string;
};

async function handleClick(user: User, playersInParty : User[]) {
    const supabase = await createClient();

    //  TODO: Disable duplicates. Better yet, making clicking a second time = removing from party
    playersInParty.push(user);
    console.log(playersInParty);
}

export default function UserList({ users, party }: { users: User[],party: User[] }) {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => handleClick(user, party)}>{user.user_name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
