import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";

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

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
