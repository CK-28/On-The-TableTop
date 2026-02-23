"use client";

import { createClient } from "@/lib/supabase/client";

// TODO: Make common component with user-list
// TODO: Move this to a shared file of types/interfaces/constants/etc.
type User = {
    id: number;
    user_name: string;
};

export default function PartyList({ party }: { party: User[] }) {
  return (
    <div>
      <ul>
        {party.map((partyMember) => ( 
          <li key={partyMember.id}>
            <button>{partyMember.user_name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

