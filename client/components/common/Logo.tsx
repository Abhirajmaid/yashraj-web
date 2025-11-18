import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-secondary text-base font-semibold uppercase text-brand-primary transition group-hover:bg-white group-hover:text-brand-primary">
        YR
      </span>
      <span className="text-lg font-semibold tracking-wide text-brand-secondary transition group-hover:text-white">
        Yashraj
      </span>
    </Link>
  );
}
