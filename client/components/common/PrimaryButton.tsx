import Link from "next/link";
import { ReactNode } from "react";

type PrimaryButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "dark";
};

const baseClasses =
  "group inline-flex items-center gap-4 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition hover:-translate-y-1";

const variants: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary: "bg-white text-blue-700 shadow-blue-900/25 hover:bg-white/90",
  dark: "bg-neutral-900 text-white shadow-black/30 hover:bg-neutral-800",
};

const iconVariants: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary: "bg-blue-700 text-white group-hover:bg-blue-800",
  dark: "bg-white text-neutral-900 group-hover:bg-neutral-200",
};

export function PrimaryButton({
  href,
  children,
  className,
  variant = "primary",
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variants[variant]} ${className ?? ""}`}
    >
      <span>{children}</span>
      <span
        className={`grid h-8 w-8 place-items-center rounded-full transition ${iconVariants[variant]}`}
      >
        ↗
      </span>
    </Link>
  );
}
