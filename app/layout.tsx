import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import AuthProvider from "@/components/auth-provider";
import PWAInstallPrompt from "@/components/ui/pwa-install-prompt";
import PWAServiceWorkerRegister from "@/components/ui/pwa-service-worker-register";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const APP_NAME = "On The TableTop";
const APP_DEFAULT_TITLE = "On The TableTop";
const APP_TITLE_TEMPLATE = "%s - OT3";
const APP_DESCRIPTION = "Track your board game collection!";

export const metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: "/web-app-manifest-512x512.png",
    apple: "/web-app-manifest-512x512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="OT3" />
        <link rel="apple-touch-icon" href="/web-app-manifest-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=crown" />
      </head>
      <body
        className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <AuthProvider>{children}</AuthProvider>
          </main>
          <PWAInstallPrompt />
          <PWAServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
