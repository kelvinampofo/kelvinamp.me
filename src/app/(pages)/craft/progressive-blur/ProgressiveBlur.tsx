export default function ProgressiveBlur() {
  return (
    <div className="mask-gradient relative w-full overflow-hidden whitespace-nowrap">
      <div className="marquee inline-flex items-center gap-4 pl-[100%] will-change-transform">
        <p>The quick brown fox jumps over the lazy dog.</p>
        <p>The five boxing wizards jump quickly.</p>
      </div>
    </div>
  );
}
