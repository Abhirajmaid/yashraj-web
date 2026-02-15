import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "@iconify/react";

const footerColumns = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Who we are", href: "/about-us" },
      { label: "What we Do", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Products", href: "/aggregates" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    heading: "Projects",
    links: [{ label: "All Projects", href: "/projects" }],
  },
  {
    heading: "Resources",
    links: [
      { label: "FAQs", href: "/contact#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const socialLinks = [
  { label: "LinkedIn", icon: "mdi:linkedin", href: "#" },
  { label: "Facebook", icon: "mdi:facebook", href: "#" },
  { label: "Instagram", icon: "mdi:instagram", href: "#" },
  { label: "Twitter", icon: "mdi:twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-brand-dark text-white">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-complementary-blue/20 via-transparent to-brand-primary/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10 xl:px-14">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr),minmax(0,2fr)] lg:items-start lg:gap-16">
          {/* Left Column - Brand & Description */}
          <div className="space-y-6">
            <Logo variant="light" />
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              Yashraj Infrastructure – A Yashraj Group company. Contributing to
              India's development story. Trusted government partner in Navi
              Mumbai delivering infrastructure projects across Maharashtra since
              2008.
            </p>

            {/* Social Media Links */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:border-brand-primary hover:bg-brand-primary/20 hover:-translate-y-0.5"
                  >
                    <Icon
                      icon={social.icon}
                      width={20}
                      height={20}
                      className="text-white/70 transition group-hover:text-brand-primary"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Navigation Links */}
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.heading} className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-primary">
                  {column.heading}
                </p>
                <ul className="space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/70 transition-all hover:text-brand-primary hover:translate-x-1 inline-block"
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

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} Yashraj Infrastructure – A Yashraj
              Group Company. All rights reserved.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-6">
            {bottomLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/60 transition hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
