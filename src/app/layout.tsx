import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import localInterFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import Fade from "../components/fade/fade";

import "../styles/globals.css";

const inter = localInterFont({
  src: "../../public/assets/fonts/InterVariable.woff2",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kelvinamp.me"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Kelvin Ampofo",
    template: "%s",
  },
  description: "Software Engineer",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <div id="__next">
          <Fade />
          <main>
            <div className="main-grid">
              <ThemeProvider>
                {children}
                <Analytics />
              </ThemeProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
