import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const font = localFont({ src: "../font/font.otf" });

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  return (
    <main className={font.className}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </main>
  );
}
