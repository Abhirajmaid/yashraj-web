"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

// Order and labels match desktop nav; Contact is in top navbar on mobile
const navLinks = [
  { label: "Home", href: "/", icon: "mdi:home" },
  { label: "Who we are", href: "/about-us", icon: "mdi:information" },
  { label: "What we Do", href: "/services", icon: "mdi:briefcase" },
  { label: "Projects", href: "/projects", icon: "mdi:folder-multiple" },
  { label: "Products", href: "/products", icon: "mdi:package-variant" },
];

export function BottomNavbar() {
  const pathname = usePathname();

  // Hide bottom navigation on all admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Glass Morphism Background (subtle, like StickyHeader) */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/15 border-t border-white/12 shadow-2xl shadow-black/12">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-white/6 opacity-90" />
      </div>

      {/* Navigation Items - line-wise like desktop (single row, icon above label) */}
      <div className="relative z-10 flex flex-nowrap items-center justify-around gap-0 px-1 py-3">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname?.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex min-w-0 flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-xl transition-all duration-200 sm:px-3 ${
                isActive
                  ? "text-brand-primary scale-110"
                  : "text-brand-dark/60 hover:text-brand-dark"
              }`}
              aria-label={link.label}
            >
              <Icon
                icon={link.icon}
                className={`shrink-0 text-[1.35rem] transition-all duration-200 sm:text-2xl ${
                  isActive ? "scale-110" : ""
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-tight text-center transition-all duration-200 sm:text-xs ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              >
                {link.label}
              </span>
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
