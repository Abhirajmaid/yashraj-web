"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Who we are", href: "/about-us" },
  { label: "What we Do", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Products", href: "/aggregates" },
  { label: "Blogs", href: "/blogs" },
];

type NavigationProps = {
  variant?: "light" | "dark";
};

export function Navigation({ variant = "light" }: NavigationProps) {
  const pathname = usePathname();

  const baseColor =
    variant === "dark"
      ? "text-brand-dark/80 hover:text-brand-dark"
      : "text-white hover:text-white";
  const hoverEffect = "transition-all duration-200 hover:-translate-y-0.5";

  return (
    <nav className="flex items-center space-x-8" style={{ pointerEvents: "auto" }}>
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group font-medium text-xl ${baseColor} ${hoverEffect} relative flex items-center space-x-1`}
            style={{ pointerEvents: "auto" }}
          >
            <span>{link.label}</span>
            <div
              className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 origin-left ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              } bg-brand-primary`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
