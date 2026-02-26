"use client";

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

