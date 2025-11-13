import Link from "next/link";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

type SiteHeaderProps = {
  backgroundClassName?: string;
  contactHref?: string;
};

export function SiteHeader({ backgroundClassName = "", contactHref = "/contact" }: SiteHeaderProps) {
  return (
    <header className={`sticky top-0 z-50 w-full px-6 py-4 ${backgroundClassName}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6">
        <Logo />
        <div className="flex flex-1 justify-center">
          <Navigation />
        </div>
        <Link
          href={contactHref}
          className="rounded-full bg-[#FFD700] px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#0E0E0E] shadow-[0_10px_24px_rgba(14,14,14,0.18)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700]"
        >
          Contact us
        </Link>
      </div>
    </header>
  );
}

