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

// TODO: not needed anymore? I want the page-header to be constant (already added in root layout) and then just hide/show the burger menu