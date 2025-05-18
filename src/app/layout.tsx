import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";

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

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div id="__next">
          <div className="blur-overlay" aria-hidden />
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
