import { Tooltip } from "@base-ui/react/tooltip";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Tooltip.Provider>{children}</Tooltip.Provider>
    </ThemeProvider>
  );
}
