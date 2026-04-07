import { Suspense } from "react";
import PartyWrapper from "@/components/party-page/party-wrapper";

export default function Users() {
  

  return (
    <div>
      <Suspense>
        <PartyWrapper />
      </Suspense>
    </div>
  );
}