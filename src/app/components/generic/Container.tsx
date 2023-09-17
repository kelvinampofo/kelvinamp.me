import c from 'clsx';

interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={c('flex flex-col justify-center px-8 py-12 md:py-32 lg:px-10 lg:py-32', className)}
    >
      {children}
    </div>
  );
}
