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
    <div className="flex flex-1 flex-col items-start gap-6 text-sm font-medium uppercase tracking-widest text-white/80 sm:flex-row sm:items-center sm:justify-end sm:gap-8">
      <nav className="flex flex-wrap items-center gap-6">
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
      <Link
        href="#contact"
        className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-blue-900/20 backdrop-blur transition hover:bg-white hover:text-blue-700"
      >
        Contact us
      </Link>
    </div>
  );
}
