"use client";

export default function PartyList({ party, onClick }: { party: string[], onClick: (u: string) => void }) {
  return (
    <div>
      <ul>
        {party.map((partyMember) => (
          <li key={partyMember}>
            <button onClick={() => onClick(partyMember)}>{partyMember}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

