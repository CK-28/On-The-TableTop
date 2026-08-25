"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function PageMenu() {
  const router = useRouter();

  const routeTo = (pageName: string) => {
    router.push(pageName);
  };

  return (
    <div className="grid gap-2 w-full">
      <Button onClick={() => routeTo("/games")}>Search for Games</Button>
      <Button onClick={() => routeTo("/users")}>Search for Users</Button>
      <Button onClick={() => routeTo("/party")}>Plan a Party!</Button>
      <Button onClick={() => routeTo("/profile")}>Go to your Profile</Button>
    </div>
  );
}
