import { Suspense } from "react";
import { EnvVarWarning } from "./env-var-warning";
import { AuthButton } from "./auth-button";
import { hasEnvVars } from "@/lib/utils";

export default function PageHeader() {
    return (
        <div className="w-full flex gap-80 justify-center items-center border-b border-b-foreground/10">
            <h1 className="text-xl">
                On The TableTop
            </h1>
            <nav className=" justify-center  h-16 p-5 px-10 ">
                <div className="w-full max-w-5xl flex justify-between items-center text-sm">
                    {!hasEnvVars ? (
                        <EnvVarWarning />
                    ) : (
                        <Suspense>
                            <AuthButton />
                        </Suspense>
                    )}
                </div>
            </nav>
        </div>
    )
}