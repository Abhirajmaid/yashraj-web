import Image from "next/image";

export function ProjectsHeroSection() {
  return (
    <section
      id="projects"
      data-hero-root
      className="relative isolate min-h-screen overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/yashrajhero.jpg"
          alt="Projects hero background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pb-16 pt-[20vh]">
        <h1 className="text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem]">
          Yashraj
        </h1>
      </div>
    </section>
  );
}

