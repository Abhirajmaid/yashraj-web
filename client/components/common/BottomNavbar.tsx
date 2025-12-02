"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const navLinks = [
  { label: "Home", href: "/", icon: "mdi:home" },
  { label: "Projects", href: "/projects", icon: "mdi:folder-multiple" },
  { label: "Services", href: "/services", icon: "mdi:briefcase" },
  { label: "About Us", href: "/about-us", icon: "mdi:information" },
  { label: "Contact", href: "/contact", icon: "mdi:email" },
];

export function BottomNavbar() {
  const pathname = usePathname();

  // Hide bottom navigation on all admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Glass Morphism Background */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/90 border-t border-dark/10 shadow-2xl shadow-black/20">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10" />
      </div>

      {/* Navigation Items */}
      <div className="relative z-10 flex items-center justify-around px-2 py-3">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-brand-primary scale-110"
                  : "text-brand-dark/60 hover:text-brand-dark"
              }`}
              aria-label={link.label}
            >
              <Icon
                icon={link.icon}
                className={`text-2xl transition-all duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
              />
              <span
                className={`text-xs font-medium transition-all duration-200 ${
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

