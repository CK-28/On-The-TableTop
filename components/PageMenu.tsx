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
      <Button onClick={() => routeTo("/games")}>Go To Games</Button>
      <Button onClick={() => routeTo("/users")}>Users</Button>
      <Button onClick={() => routeTo("/profile")}>Profile</Button>
    </div>
  );
}
