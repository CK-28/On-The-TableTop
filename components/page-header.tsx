import { Suspense } from "react";
import { EnvVarWarning } from "./env-var-warning";
import { AuthButton } from "./auth-button";
import { hasEnvVars } from "@/lib/utils";
import MainMenu from "./main-menu";

export default function PageHeader() {
    return (
        <div className="w-full flex gap-80 justify-center items-center border-b border-b-foreground/10">
            <MainMenu />
            <h1 className="text-xl">
                On The TableTop
            </h1>
            {/*  TODO: I feel like this shouldnt a nav element */}
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