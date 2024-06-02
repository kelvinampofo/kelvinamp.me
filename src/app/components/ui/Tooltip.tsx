import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { PropsWithChildren, ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Tooltip({
  children,
  content,
  className,
  onClick
}: PropsWithChildren<TooltipProps>) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={350}>
        <TooltipPrimitive.Trigger asChild className={className} onClick={onClick}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className="tooltip-content rounded-md border p-[6px] text-xs shadow-sm shadow-neutral-200 duration-200 dark:border-neutral-800 dark:shadow-neutral-950"
          sideOffset={5}
        >
          {content}
          <TooltipPrimitive.Arrow width={0} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
