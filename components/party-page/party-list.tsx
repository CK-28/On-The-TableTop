"use client";

import { Avatar } from "@mui/material";

function getAvatarUrl(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Profile")}&background=2563eb&color=ffffff&size=128`;
}

export default function PartyList({party, onClick, owner}: {party: string[]; onClick: (u: string) => void; owner?: string}) {
  return (
    <ul>
      {party.map((partyMember) => (
        <li key={partyMember} className="flex items-center gap-2">
          <Avatar src={getAvatarUrl(partyMember)} alt={`${partyMember}'s profile picture`} sx={{ width: 36, height: 36 }}/>
          <button onClick={() => onClick(partyMember)}>{partyMember}</button>
          {partyMember === owner ? (
            <span className="material-symbols-outlined text-yellow-500">crown</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

