import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import MainMenu from "./main-menu";

export async function AuthMenu() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower. //can this help with the loading of the first page? we get the user there
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      <MainMenu />
    </div>
  ) : (
    <div />
  );
}
