import Link from "next/link";
import { ReactNode } from "react";

type PrimaryButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "dark";
  size?: "md" | "sm";
  showIcon?: boolean;
};

const baseClasses =
  "group inline-flex items-center rounded-full font-semibold shadow-[0_12px_30px_rgba(14,14,14,0.18)] transition hover:-translate-y-1";

const variants: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary:
    "bg-[#D2FDFF] text-[#0E0E0E] hover:bg-[#ffffff] focus-visible:outline-[#f21b29]",
  dark: "bg-[#0E0E0E] text-white hover:bg-[#1c1c1c] focus-visible:outline-[#D2FDFF]",
};

const iconVariants: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary: "bg-[#f21b29] text-white group-hover:bg-[#d51422]",
  dark: "bg-white text-[#0E0E0E] group-hover:bg-[#D2FDFF]",
};

const sizeClasses: Record<NonNullable<PrimaryButtonProps["size"]>, string> = {
  md: "gap-4 px-6 py-3 text-sm",
  sm: "gap-2.5 px-4 py-2 text-xs",
};

const iconSizeClasses: Record<NonNullable<PrimaryButtonProps["size"]>, string> = {
  md: "h-8 w-8",
  sm: "h-7 w-7",
};

export function PrimaryButton({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  showIcon = true,
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variants[variant]} ${sizeClasses[size]} ${
        showIcon ? "" : "gap-0"
      } ${className ?? ""}`}
    >
      <span>{children}</span>
      {showIcon ? (
        <span
          className={`grid ${iconSizeClasses[size]} place-items-center rounded-full transition ${iconVariants[variant]}`}
        >
          ↗
        </span>
      ) : null}
    </Link>
  );
}
