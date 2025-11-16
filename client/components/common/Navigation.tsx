import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about-us" },
];

type NavigationProps = {
  variant?: "light" | "dark";
};

export function Navigation({ variant = "light" }: NavigationProps) {
  const baseColor =
    variant === "dark" ? "text-[#0E0E0E]" : "text-[#FFD700]";
  const hoverColor =
    variant === "dark" ? "hover:text-[#f21b29]" : "hover:text-white";

  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-8 text-sm font-semibold uppercase tracking-[0.12em] ${baseColor}`}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition ${hoverColor}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
