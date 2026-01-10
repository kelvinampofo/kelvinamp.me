import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import localFont from "next/font/local";

import Fade from "../components/fade/Fade";

import Providers from "./providers";

import "../styles/system.css";

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

const inter = localFont({
  src: "../fonts/InterVariable.woff2",
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html className={inter.variable} lang="en" suppressHydrationWarning>
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
