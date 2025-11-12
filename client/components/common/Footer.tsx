import Link from "next/link";
import { Logo } from "./Logo";

const footerColumns = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: "#home" },
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
    ],
  },
  {
    heading: "Case Studies",
    links: [
      { label: "Skyline Towers", href: "/projects/skyline-towers" },
      { label: "Riverfront Residences", href: "/projects/riverfront-residences" },
      { label: "Modular Megacity", href: "/projects/modular-megacity" },
      { label: "All Projects", href: "/projects" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "#faq" },
      { label: "Contact", href: "/contact" },
      { label: "Schedule a Call", href: "/contact#consult" },
    ],
  },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-[#FFD700]">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:px-10 xl:px-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr),minmax(0,2fr)] lg:items-start">
          <div className="space-y-6">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-[#FFD700]/75">
              Bringing architectural visions to life with bold design, precise
              engineering, and a commitment to timeless quality.
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]/50">
              © {new Date().getFullYear()} Yashraj Constructions. All rights reserved.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.heading} className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD700]/70">
                  {column.heading}
                </p>
                <ul className="space-y-3 text-sm text-[#FFD700]/80">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 border-t border-white/10 pt-6 text-xs text-[#FFD700]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Crafted in India with a passion for detail.</p>
          <nav className="flex flex-wrap items-center gap-6">
            {bottomLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}



