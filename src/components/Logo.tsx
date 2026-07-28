import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark";
  tone?: "navy" | "white";
  /** Set on the header logo so it is not lazy-loaded above the fold. */
  priority?: boolean;
}

const assets = {
  full: {
    navy: "/logo/bcn-logo.png",
    white: "/logo/bcn-logo-white.png",
    width: 1000,
    height: 194,
    base: "h-10 w-auto",
    sizes: "280px",
  },
  mark: {
    navy: "/logo/bcn-mark.png",
    white: "/logo/bcn-mark-white.png",
    width: 512,
    height: 512,
    base: "h-10 w-auto",
    sizes: "64px",
  },
} as const;

/**
 * BCN Ideal Services logo — the brand artwork itself.
 * `full` = horizontal lockup (droplet mark + wordmark)
 * `mark` = the droplet on its own
 *
 * The `white` tone is a mono cut-out of the same artwork, for dark backgrounds.
 * Both are generated from the brand file by `scripts/make-logo-assets.py`.
 */
export function Logo({
  className,
  variant = "full",
  tone = "navy",
  priority = false,
}: LogoProps) {
  const asset = assets[variant];

  return (
    <Image
      src={tone === "white" ? asset.white : asset.navy}
      alt="BCN Ideal Services"
      width={asset.width}
      height={asset.height}
      sizes={asset.sizes}
      priority={priority}
      className={cn(asset.base, className)}
    />
  );
}
