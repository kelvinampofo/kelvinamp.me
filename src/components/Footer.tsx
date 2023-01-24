import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer
      className={cn(
        'absolute bottom-0 mx-auto mb-3 flex w-full max-w-3xl flex-col items-end px-8 text-xs dark:text-[#A0A0A0] md:text-sm'
      )}
    >
      <span>
        CC BY-NC 4.0 <i>{new Date().getFullYear()}</i> © Kelvin Ampofo.
      </span>
    </footer>
  );
}
