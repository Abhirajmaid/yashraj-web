import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-base font-semibold text-blue-700">
        AL
      </span>
      <span className="text-lg font-semibold tracking-wide">Altuz</span>
    </Link>
  );
}
