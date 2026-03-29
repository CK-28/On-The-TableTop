"use client";

export default function PartyList({ party, onClick }: { party: User[], onClick: (u: User) => void }) {
  return (
    <div>
      <ul>
        {party.map((partyMember) => (
          <li key={partyMember.id}>
            <button onClick={() => onClick(partyMember)}>{partyMember.user_name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

