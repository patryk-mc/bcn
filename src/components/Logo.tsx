import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark" | "stacked";
  tone?: "navy" | "white";
}

/**
 * BCN Ideal Services logo. Vector recreation of the brand banner.
 * `full` = horizontal lockup (house mark + wordmark + tagline)
 * `mark` = monogram only (round badge with house glyph)
 * `stacked` = vertical lockup with tagline
 */
export function Logo({ className, variant = "full", tone = "navy" }: LogoProps) {
  const ink = tone === "white" ? "#FFFFFF" : "#1c3b6f";
  const accent = tone === "white" ? "rgba(255,255,255,0.5)" : "#365388";
  const wash = tone === "white" ? "rgba(255,255,255,0.18)" : "#D5E3FF";

  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 56 56"
        className={cn("h-10 w-10", className)}
        aria-label="BCN Ideal Services"
        role="img"
      >
        <circle cx="28" cy="28" r="27" fill={wash} stroke={ink} strokeOpacity="0.15" />
        <HouseGlyph cx={28} cy={26} size={22} ink={ink} accent={accent} />
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <svg
        viewBox="0 0 220 96"
        className={cn("h-14 w-auto", className)}
        aria-label="BCN Ideal Services"
        role="img"
      >
        <HouseGlyph cx={28} cy={34} size={42} ink={ink} accent={accent} />
        <text x="60" y="40" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="22" letterSpacing="0.04em" fill={ink}>BCN</text>
        <text x="60" y="62" fontFamily="Montserrat, sans-serif" fontWeight="500" fontSize="14" letterSpacing="0.18em" fill={ink}>IDEAL SERVICES</text>
        <line x1="60" y1="72" x2="200" y2="72" stroke={accent} strokeWidth="1" />
        <text x="60" y="87" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="9" letterSpacing="0.14em" fill={ink} opacity="0.8">RELIABLE · BARCELONA · SINCE 2020</text>
      </svg>
    );
  }

  // Full horizontal
  return (
    <svg
      viewBox="0 0 360 64"
      className={cn("h-10 w-auto", className)}
      aria-label="BCN Ideal Services"
      role="img"
    >
      <HouseGlyph cx={28} cy={32} size={44} ink={ink} accent={accent} />
      <g>
        <text
          x="64"
          y="32"
          dominantBaseline="middle"
          fontFamily="Montserrat, sans-serif"
          fontWeight="700"
          fontSize="22"
          letterSpacing="0.08em"
          fill={ink}
        >
          BCN
        </text>
        <text
          x="116"
          y="32"
          dominantBaseline="middle"
          fontFamily="Montserrat, sans-serif"
          fontWeight="500"
          fontSize="18"
          letterSpacing="0.22em"
          fill={ink}
        >
          IDEAL SERVICES
        </text>
        <line x1="64" y1="46" x2="336" y2="46" stroke={accent} strokeWidth="1" opacity="0.6" />
        <text
          x="64"
          y="58"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          fontSize="8.5"
          letterSpacing="0.24em"
          fill={ink}
          opacity="0.7"
        >
          RELIABLE SERVICES · BARCELONA
        </text>
      </g>
    </svg>
  );
}

function HouseGlyph({
  cx,
  cy,
  size,
  ink,
  accent,
}: {
  cx: number;
  cy: number;
  size: number;
  ink: string;
  accent: string;
}) {
  // Stylised house with a sparkle. References the original brand banner.
  const s = size;
  const x = cx - s / 2;
  const y = cy - s / 2;
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* roof */}
      <path
        d={`M${s / 2} ${s * 0.08} L${s * 0.95} ${s * 0.48} L${s * 0.05} ${s * 0.48} Z`}
        fill={accent}
        opacity="0.9"
      />
      {/* walls */}
      <rect
        x={s * 0.18}
        y={s * 0.48}
        width={s * 0.64}
        height={s * 0.42}
        rx={s * 0.04}
        fill="none"
        stroke={ink}
        strokeWidth={s * 0.04}
      />
      {/* door */}
      <rect
        x={s * 0.42}
        y={s * 0.62}
        width={s * 0.16}
        height={s * 0.28}
        rx={s * 0.02}
        fill={ink}
        opacity="0.85"
      />
      {/* window */}
      <rect
        x={s * 0.24}
        y={s * 0.54}
        width={s * 0.12}
        height={s * 0.1}
        rx={s * 0.02}
        fill={ink}
        opacity="0.7"
      />
      {/* sparkle */}
      <g transform={`translate(${s * 0.62}, ${s * 0.18})`}>
        <path
          d={`M0 -${s * 0.08} L${s * 0.03} -${s * 0.03} L${s * 0.08} 0 L${s * 0.03} ${s * 0.03} L0 ${s * 0.08} L-${s * 0.03} ${s * 0.03} L-${s * 0.08} 0 L-${s * 0.03} -${s * 0.03} Z`}
          fill={ink}
        />
      </g>
    </g>
  );
}
