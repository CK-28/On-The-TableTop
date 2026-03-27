import { createClient } from "@/lib/supabase/server";
import PartyWrapper from "@/components/party-page/party-wrapper";

// TODO: Do we even need a wrapper right now?
export default async function Party() {
  return (
    <div>
      <PartyWrapper />
    </div>
  );
}