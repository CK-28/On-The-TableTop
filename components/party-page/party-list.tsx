"use client";

import { Avatar } from "@mui/material";

function getAvatarUrl(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Profile")}&background=2563eb&color=ffffff&size=128`;
}

export default function PartyList({party, onClick, owner}: {party: string[]; onClick: (u: string) => void; owner?: string}) {
  return (
    <ul>
      {party.map((partyMember) => (
        <li key={partyMember} className="party-list-of-users">
          <Avatar src={getAvatarUrl(partyMember)} alt={`${partyMember}'s profile picture`} sx={{ width: 36, height: 36, marginRight: 1 }}/>
          <button onClick={() => onClick(partyMember)}>{partyMember}</button>
          {partyMember === owner ? (
            <span style={{color: "rgba(234, 179, 8)"}} className="material-symbols-outlined">crown</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

