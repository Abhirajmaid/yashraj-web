import Image from "next/image";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
};

export function ServiceCard({
  title,
  description,
  image,
  imageAlt,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col">
      {/* Image - Separate entity */}
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Information - Separate entity below image */}
      <div className="flex flex-col">
        <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

