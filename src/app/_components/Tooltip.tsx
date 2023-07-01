import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface Props {
  children: React.ReactNode;
  content: string;
}

export default function Tooltip({ children, content }: Props) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={500}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className="animate-tooltip rounded-md border p-1 text-xs shadow-md duration-200 dark:border-neutral-800 dark:shadow-neutral-950"
          sideOffset={2}
        >
          {content}
          <TooltipPrimitive.Arrow width={0} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
