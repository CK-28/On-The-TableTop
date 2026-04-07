export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col justify-center items-center gap-10 max-w-5xl p-5">
          <h1 className="text-xl">
           Welcome to On The TableTop
          </h1>
          <p>
            Please sign in to continue
          </p>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
        </footer>
      </div>
    </main>
  );
}
