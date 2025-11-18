import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about-us" },
];

type NavigationProps = {
  variant?: "light" | "dark";
};

export function Navigation({ variant = "light" }: NavigationProps) {
  const baseColor =
    variant === "dark" ? "text-brand-dark/80 hover:text-brand-dark" : "text-white hover:text-white";
  const hoverEffect = "transition-all duration-200 hover:-translate-y-0.5";

  return (
    <nav className="flex items-center space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-medium text-xl ${baseColor} ${hoverEffect} relative flex items-center space-x-1`}
        >
          <span>{link.label}</span>
          <div
            className={`absolute bottom-0 left-0 h-0.5 w-0 hover:w-full transition-all duration-300 ${
              variant === "dark" ? "bg-brand-primary" : "bg-white"
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}
