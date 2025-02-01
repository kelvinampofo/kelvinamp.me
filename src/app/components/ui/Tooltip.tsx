import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { PropsWithChildren, ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  className?: string;
  onMouseDown?: () => void;
}

export default function Tooltip({
  children,
  content,
  className,
  onMouseDown
}: PropsWithChildren<TooltipProps>) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={350}>
        <TooltipPrimitive.Trigger asChild className={className} onMouseDown={onMouseDown}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className="tooltip-content rounded-md border border-neutral-200 bg-[#FEFEFE] p-1.5 text-xs shadow-sm duration-200 dark:border-neutral-800 dark:bg-inherit dark:shadow-neutral-950"
          sideOffset={5}
        >
          {content}
          <TooltipPrimitive.Arrow width={0} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
