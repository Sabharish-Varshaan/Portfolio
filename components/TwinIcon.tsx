// Two figures: a solid "you" in front and a dashed digital echo behind it.
export default function TwinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2.2 1.8" opacity=".6">
        <circle cx="15.5" cy="7.5" r="3.5" />
        <path d="M10.5 20c.5-3.8 2.5-6 5-6s4.6 2.2 5 6" />
      </g>
      <circle cx="8.5" cy="9" r="3.6" fill="currentColor" />
      <path d="M2.5 21c.4-4 2.8-6.4 6-6.4s5.6 2.4 6 6.4Z" fill="currentColor" />
    </svg>
  );
}
