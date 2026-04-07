"use client";

// Dont like this name. maybe PartyFriendsList? and make the other ma
export default function PartyUsers({ party, onRemove }: { party: User[], onRemove: (u: User) => void }) {
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

