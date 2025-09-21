import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "../components/tooltip/Tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
