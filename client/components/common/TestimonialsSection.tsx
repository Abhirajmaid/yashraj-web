import { SectionHeader } from "./SectionHeader";
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    title: "Amazing one!",
    quote:
      "Working with Yashraj Constructions has been an exceptional experience. Their attention to detail, commitment to sustainability, and ability to solve each challenge made us feel in the best hands.",
    author: "Zoe Barnett",
    role: "Director, Skyline Group",
    imageSrc: "https://i.pravatar.cc/150?img=32",
    imageAlt: "Portrait of Zoe Barnett",
  },
  {
    title: "Unmatched precision",
    quote:
      "Every phase of our project was handled with care and foresight. The team consistently communicated progress and delivered beyond expectations—truly unmatched precision.",
    author: "Darren Wells",
    role: "Lead Architect, Metropolis Labs",
    imageSrc: "https://i.pravatar.cc/150?img=45",
    imageAlt: "Portrait of Darren Wells",
  },
  {
    title: "Collaborative approach",
    quote:
      "Their collaborative spirit and willingness to explore bold ideas set them apart. Our new headquarters is a testament to their craft and dedication.",
    author: "Meera Sethi",
    role: "COO, Horizon Partners",
    imageSrc: "https://i.pravatar.cc/150?img=12",
    imageAlt: "Portrait of Meera Sethi",
  },
  {
    title: "Future-focused vision",
    quote:
      "From concept to completion, Yashraj Constructions embraced innovation and future-focused solutions. We now have a space that inspires our teams every day.",
    author: "Luis Ortega",
    role: "Founder, Riverfront Studios",
    imageSrc: "https://i.pravatar.cc/150?img=5",
    imageAlt: "Portrait of Luis Ortega",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#D2FDFF] py-24 text-[#0E0E0E]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,14,0.12),transparent_55%)]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:px-10 xl:px-14">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by clients who value innovation and integrity."
          description="Discover how our partners describe the experience of bringing their most ambitious projects to life with the Yashraj Constructions team."
          eyebrowClassName="text-[#0E0E0E]"
          titleClassName="text-[#0E0E0E]"
          descriptionClassName="text-[#0E0E0E]/70 max-w-2xl"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

