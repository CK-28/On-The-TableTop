import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import UserList from "@/components/user-list";
import PartyList from "@/components/party-list";

// TODO: Move this to a shared file of types/interfaces/constants/etc.
type User = {
  id: number;
  user_name: string;
};

const playersInParty: User[] = [];

async function UserData() {
  const supabase = await createClient();
  const { data: profiles } = await supabase.from("profiles").select();

  return (
    <div>
      <UserList users={profiles || []} party={playersInParty} />
    </div>
  );
}

export default function Users() {
  return (
    <div className="flex flex-row gap-60">
      <div>
        <h1>
          All Players
        </h1>
        <Suspense fallback={<div>Loading Users...</div>}>
          <UserData />
        </Suspense>
      </div>
      <div>
        <h1>
          Players In Party
        </h1>
        <PartyList party={playersInParty}/>
      </div>
    </div>
  );
}