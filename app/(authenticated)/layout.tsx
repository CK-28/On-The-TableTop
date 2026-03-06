import PageHeader from "@/components/page-header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div>
            <PageHeader />
            <main>{children}</main>
        </div>
    );
}