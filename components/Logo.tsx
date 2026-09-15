type LogoMarkProps = {
  className?: string;
  variant?: "navy" | "white";
};

export function LogoMark({ className, variant = "navy" }: LogoMarkProps) {
  const ring = variant === "white" ? "#ffffff" : "#10233f";
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Albany Airport Taxi and Limo Service medallion mark"
    >
      <circle cx="100" cy="100" r="92" fill="none" stroke={ring} strokeWidth="6" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#c8912f" strokeWidth="3" />
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontWeight="700"
        fontSize="62"
        fill={ring}
      >
        AT
      </text>
      <text
        x="100"
        y="150"
        textAnchor="middle"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="13"
        letterSpacing="2"
        fill="#c8912f"
      >
        ALBANY · NY
      </text>
    </svg>
  );
}
