"use client";

// TODO: Move this to a shared file of types/interfaces/constants/etc.
type User = {
    id: number;
    user_name: string;
};

export default function UserList({ users, onAdd }: { users: User[], onAdd: (u: User) => void }) {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => onAdd(user)}>{user.user_name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
