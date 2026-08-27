export function FigmaIcon({ size = 24, className = "" }: { size?: string | number; className?: string }) {
  const s = typeof size === "number" ? `${size}px` : size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path fill="#0ACF83" d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8Z" />
      <path fill="#A259FF" d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" />
      <path fill="#F24E1E" d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" />
      <path fill="#FF7262" d="M12 0h4a4 4 0 0 1 0 8h-4V0Z" />
      <path fill="#1ABCFE" d="M20 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </svg>
  );
}
