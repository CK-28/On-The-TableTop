import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <PageHeader />
      <div className="flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-5xl">
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-10 p-5">
            <h1 className="text-xl">
             Welcome to On The TableTop
            </h1>
            <p>
              Please sign in to continue
            </p>
          </CardContent>
        </Card>
      </div>
      {/* <footer className="w-full flex items-center justify-center border-t text-center text-xs gap-8 py-16 px-4 sm:px-6">
      </footer> */}
    </main>
  );
}
