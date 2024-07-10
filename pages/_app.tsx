import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const font = localFont({ src: "../font/font.otf" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}
