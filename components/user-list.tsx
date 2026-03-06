"use client";

export default function UserList({ users, onAdd }: { users: any[], onAdd: (u: User) => void }) {
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
