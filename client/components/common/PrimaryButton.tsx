import Link from "next/link";
import { ReactNode } from "react";
import { Icon } from "@iconify/react";

type PrimaryButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark";
  size?: "md" | "sm";
  showIcon?: boolean;
};

const baseClasses =
  "group inline-flex items-center rounded-full font-semibold shadow-[0_12px_30px_rgba(14,14,14,0.18)] transition hover:-translate-y-1";

const variants: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary:
    "bg-[#f21b29] text-white hover:bg-[#d51422] focus-visible:outline-[#f21b29]",
  secondary:
    "bg-[#FFD700] text-[#0E0E0E] hover:bg-[#ffffff] focus-visible:outline-[#FFD700]",
  dark: "bg-[#0E0E0E] text-white hover:bg-[#1c1c1c] focus-visible:outline-[#FFD700]",
};

const iconVariants: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary: "bg-white text-[#f21b29] group-hover:bg-white/90",
  secondary: "bg-[#f21b29] text-white group-hover:bg-[#d51422]",
  dark: "bg-white text-[#0E0E0E] group-hover:bg-[#FFD700]",
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
  showIcon,
}: PrimaryButtonProps) {
  // Primary buttons always show icon, secondary buttons never show icon
  const shouldShowIcon = showIcon !== undefined 
    ? showIcon 
    : variant === "primary" || variant === "dark";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variants[variant]} ${sizeClasses[size]} ${
        shouldShowIcon ? "" : "gap-0"
      } ${className ?? ""}`}
    >
      <span>{children}</span>
      {shouldShowIcon ? (
        <span
          className={`grid ${iconSizeClasses[size]} place-items-center rounded-full transition ${iconVariants[variant]}`}
        >
          <Icon 
            icon="solar:arrow-right-bold" 
            className="text-lg"
            style={{ fontSize: '20px' }}
          />
        </span>
      ) : null}
    </Link>
  );
}
