import PageHeader from "@/components/page-header";
import HydrationGuard from "@/components/hydration-guard";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader />
      <main>
        <HydrationGuard>{children}</HydrationGuard>
      </main>
    </div>
  );
}
