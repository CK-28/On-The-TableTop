import { createClient } from "@/lib/supabase/server";
import PartyWrapper from "@/components/party-page/party-wrapper";
import { Suspense } from "react";

export default async function Users() {
  const supabase = await createClient();
  const { data: profiles } = await supabase.from("profiles").select();

  return (
    <div>
      <Suspense>
        <PartyWrapper users={profiles || []} />
      </Suspense>
    </div>
  );
}