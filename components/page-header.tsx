import { Suspense } from "react";
import { EnvVarWarning } from "./env-var-warning";
import { AuthButton } from "./auth-button";
import { hasEnvVars } from "@/lib/utils";
import MainMenu from "./main-menu";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";
import { AuthMenu } from "./auth-menu";

export default function PageHeader() {

    return (
        <header className="header-parent">
            <div className="mobile-menu">
                <Suspense>
                    <AuthMenu />
                </Suspense>
            </div>

            <Link href="/home" className="header-text">
                On The TableTop
            </Link>

            <div className="header-buttons">
                {!hasEnvVars ? (
                    <EnvVarWarning />
                ) : (
                    <Suspense>
                        <AuthButton />
                    </Suspense>
                )}
                {/* TODO: Update icon colour and create a dark theme */}
                {/* <ThemeSwitcher /> */}
            </div>
        </header>
    );
}