import PageHeader from "@/components/page-header";
import MobileNavigation from "@/components/mobile-navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader />
      <main className="authenticated-main">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
}
