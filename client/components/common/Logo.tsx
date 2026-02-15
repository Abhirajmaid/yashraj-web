import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  compact?: boolean; // reduce height for mobile when scrolled
};

export function Logo({ variant = "light", compact = false }: LogoProps) {
  const textClass =
    variant === "light"
      ? "text-white transition group-hover:text-white"
      : "text-black transition group-hover:text-primary";

  // compact: smaller height on mobile; keep md size for desktop
  const containerClass = `relative transition-all duration-300 ${compact ? "h-12 md:h-15 w-8" : "h-20 md:h-15 w-10"}`;

  return (
    <Link href="/" className="group flex items-center">
      <div className={containerClass}>
        <Image
          src="/logo_main.png"
          alt="Yashraj Infrastructure"
          fill
          className="object-cover"
          priority
        />
      </div>
      <span
        className={`hidden md:inline-block text-lg font-semibold tracking-wide ${textClass}`}
      >
        Yashraj Infrastructure
      </span>
    </Link>
  );
}
