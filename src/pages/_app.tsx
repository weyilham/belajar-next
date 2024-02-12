import "@/styles/globals.css";
import AppShell from "@/components/Layouts/AppShell/AppShell";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </SessionProvider>
    </main>
  );
}
