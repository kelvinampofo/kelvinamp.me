import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import localInterFont from "next/font/local";

import Fade from "../components/fade/Fade";

import Providers from "./providers";

import "../styles/globals.css";

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

const inter = localInterFont({
  src: "../../public/assets/fonts/InterVariable.woff2",
  variable: "--font-inter",
});

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <div id="__next">
          <Fade />
          <main>
            <div className="layout-grid">
              <Providers>
                {children}
                <Analytics />
              </Providers>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
