export default function Container({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <article className="flex flex-col justify-center px-8 py-12 md:py-32 lg:px-10 lg:py-32">
      {children}
    </article>
  );
}
