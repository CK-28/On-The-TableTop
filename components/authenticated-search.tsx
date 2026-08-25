import { createClient } from "@/lib/supabase/server";
import HeaderSearch from "./header-search";

export default async function AuthSearch() {
    const supabase = await createClient();
    
      // You can also use getUser() which will be slower. //can this help with the loading of the first page? we get the user there
      const { data } = await supabase.auth.getClaims();
    
      const user = data?.claims;

      return user ? (
        <HeaderSearch/>
      ) : (
        <div/>
      );
}