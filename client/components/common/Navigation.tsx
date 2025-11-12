import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Pages", href: "#pages" },
];

export function Navigation() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD700]">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="transition hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
