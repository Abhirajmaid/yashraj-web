import Image from "next/image";

type IconBadgeProps = {
  icon: string;
  alt: string;
  className?: string;
};

export function IconBadge({ icon, alt, className }: IconBadgeProps) {
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md shadow-lg shadow-blue-900/30 ${className ?? ""}`}
    >
      <Image src={icon} alt={alt} width={28} height={28} className="text-white" />
    </div>
  );
}
