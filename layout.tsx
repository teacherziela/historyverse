import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HISTORYVERSE 360 • Cikgu Zamzila",
  description: "Ekosistem Pembelajaran Sejarah Imersif Berasaskan Gamifikasi: Jelajah, Bermain, Kuasai Sejarah.",
  manifest: "/manifest.webmanifest",
  applicationName: "HISTORYVERSE 360",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ms"><body>{children}</body></html>;
}
