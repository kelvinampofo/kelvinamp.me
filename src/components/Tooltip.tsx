import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface Props {
  children: React.ReactNode;
  content: string;
}

export default function Tooltip({ children, content }: Props) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={350}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className="rounded-md border p-1 text-xs duration-200 ease-linear dark:border-neutral-800"
          sideOffset={2}
        >
          {content}
          <TooltipPrimitive.Arrow width={0} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
