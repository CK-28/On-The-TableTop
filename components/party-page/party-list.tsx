"use client";

export default function PartyList({party, onClick, owner}: {party: string[]; onClick: (u: string) => void; owner?: string}) {
  return (
    <ul>
      {party.map((partyMember) => (
        <li key={partyMember} className="flex items-center gap-2">
          {partyMember === owner ? (
            <span className="material-symbols-outlined text-yellow-500">crown</span>
          ) : null}
          <button onClick={() => onClick(partyMember)}>{partyMember}</button>
        </li>
      ))}
    </ul>
  );
}

