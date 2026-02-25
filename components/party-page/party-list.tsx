"use client";

// TODO: Make common component with user-list
// TODO: Move this to a shared file of types/interfaces/constants/etc.
type User = {
    id: number;
    user_name: string;
};

export default function PartyList({ party, onRemove }: { party: User[], onRemove: (u: User) => void }) {
  return (
    <div>
      <ul>
        {party.map((partyMember) => (
          <li key={partyMember.id}>
            <button onClick={() => onRemove(partyMember)}>{partyMember.user_name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

