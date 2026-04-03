import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  compact?: boolean; // icon-only for navbar on scroll and mobile nav
};

const HORIZONTAL_LOGO_LIGHT = "/images/yash.png"; // dark bg / overlay (navbar initial, footer)
const HORIZONTAL_LOGO_DARK = "/Horizontal Logo 4.png"; // light bg when scrolled
const LOGO_ICON = "/icon 1.png";

export function Logo({ variant = "light", compact = false }: LogoProps) {
  // Compact: show icon only (navbar on scroll + mobile header)
  if (compact) {
    return (
      <Link
        href="/"
        className="group flex items-center"
        aria-label="Yashraj Infrastructure – Yashraj Group Ventures - Home"
      >
        <div className="relative h-12 w-12 shrink-0 md:h-14 md:w-14">
          <Image
            src={LOGO_ICON}
            alt="Yashraj Infrastructure – Yashraj Group Ventures"
            fill
            className="object-contain"
            priority
            sizes="40px"
          />
        </div>
      </Link>
    );
  }

  // Full horizontal logo: light variant on dark/overlay, dark variant on light background
  const logoSrc =
    variant === "light" ? HORIZONTAL_LOGO_LIGHT : HORIZONTAL_LOGO_DARK;

  return (
    <Link href="/" className="group flex items-center">
      <div className="relative h-12 w-40 md:h-20 md:w-62">
        <Image
          src={logoSrc}
          alt="Yashraj Infrastructure – Yashraj Group Ventures"
          fill
          className="object-contain object-left"
          priority
          sizes="(max-width: 768px) 160px, 192px"
        />
      </div>
    </Link>
  );
}
