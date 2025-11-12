import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FFD700] text-base font-semibold uppercase text-[#f21b29] transition group-hover:bg-white group-hover:text-[#f21b29]">
        YR
      </span>
      <span className="text-lg font-semibold tracking-wide text-[#FFD700] transition group-hover:text-white">
        Yashraj
      </span>
    </Link>
  );
}
