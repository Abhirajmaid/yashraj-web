import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
};

export function Logo({ variant = "light" }: LogoProps) {
  const textClass =
    variant === "light"
      ? "text-white transition group-hover:text-white"
      : "text-black transition group-hover:text-primary";

  return (
    <Link href="/" className="group flex items-center">
      <div className="relative h-20 md:h-15 w-10">
        <Image
          src="/logo_main.png"
          alt="Yashraj Infrastructure"
          fill
          className="object-cover"
          priority
        />
      </div>
      <span
        className={`hidden md:inline-block text-lg font-semibold tracking-wide ${textClass}`}
      >
        Yashraj Infrastructure
      </span>
    </Link>
  );
}
