import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <PageHeader />
      <div className="flex-1 flex flex-col justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardContent className="flex flex-col gap-8 p-12 text-center">
            <h1 className="text-2xl font-semibold">
              Welcome to<br />
              On The TableTop
            </h1>
            <div className="flex justify-center">
              <ul className="space-y-3 list-disc text-left text-sm">
                <li>Track your board game collection</li>
                <li>Add your friends and compare collections</li>
                <li>Plan board game nights through the party planner</li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Please sign in to continue
              </p>
              <Button asChild className="w-full">
                <Link href="/auth/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
