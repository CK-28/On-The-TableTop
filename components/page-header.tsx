import { Suspense } from "react";
import { EnvVarWarning } from "./env-var-warning";
import { AuthButton } from "./auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import AuthSearch from "./authenticated-search";

export default function PageHeader() {
    return (
        <header className="relative w-full border-b border-b-foreground/10 header mb-4">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link href="/home">
                    <h1 className="text-xl font-semibold text-white">
                        On The TableTop
                    </h1>
                </Link>

                <AuthSearch />

                {/* Leaving div commented in case we want the search bar back on the right side */}
                {/* <div className="flex items-center gap-4"> */}
                    <div className="flex items-center gap-4 text-sm">
                        {!hasEnvVars ? (
                            <EnvVarWarning />
                        ) : (
                            <Suspense>
                                <AuthButton />
                            </Suspense>
                        )}
                    {/* </div> */}
                </div>
            </div>
        </header>
    );
}