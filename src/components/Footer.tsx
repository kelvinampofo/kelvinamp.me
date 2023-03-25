export default function Footer() {
  return (
    <footer className="absolute bottom-0 mx-auto mb-3 flex w-full max-w-3xl flex-col items-end px-8 text-xs dark:text-neutral-400 md:text-sm">
      <span>
        <i>{new Date().getFullYear()}</i> © Kelvin Ampofo.
      </span>
    </footer>
  );
}
