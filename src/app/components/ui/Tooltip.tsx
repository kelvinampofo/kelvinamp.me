import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export default function Tooltip({ children, content, className }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={350}>
        <TooltipPrimitive.Trigger asChild className={className}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className="tooltip-content rounded-md border px-2 py-1 text-xs font-medium shadow-md duration-200 dark:border-neutral-800 dark:shadow-neutral-950"
          sideOffset={5}
        >
          {content}
          <TooltipPrimitive.Arrow width={0} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
