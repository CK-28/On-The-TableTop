import { Suspense } from "react";
import { EnvVarWarning } from "./env-var-warning";
import { AuthButton } from "./auth-button";
import { hasEnvVars } from "@/lib/utils";
import MainMenu from "./main-menu";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";

export default function PageHeader() {

    return (
        <header className="relative w-full border-b border-b-foreground/10 header mb-4">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center">
                    <MainMenu />
                </div>

                <Link href="/home">
                    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-center">
                        On The TableTop
                    </h1>
                </Link>


                <div className="flex items-center gap-4 text-sm">
                    {!hasEnvVars ? (
                        <EnvVarWarning />
                    ) : (
                        <Suspense>
                            <AuthButton />
                        </Suspense>
                    )}
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}