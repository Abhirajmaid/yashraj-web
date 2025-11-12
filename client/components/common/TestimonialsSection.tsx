"use client";
import { useEffect, useRef } from "react";
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
  {
    title: "Excellence in execution",
    quote:
      "The quality of work and professionalism displayed by Yashraj Constructions exceeded all our expectations. They transformed our vision into a stunning reality.",
    author: "Sarah Chen",
    role: "CEO, Urban Dynamics",
    imageSrc: "https://i.pravatar.cc/150?img=47",
    imageAlt: "Portrait of Sarah Chen",
  },
  {
    title: "Timely delivery",
    quote:
      "What impressed us most was their ability to deliver on time without compromising quality. Every milestone was met with precision and excellence.",
    author: "Rajesh Kumar",
    role: "Project Manager, Metro Builders",
    imageSrc: "https://i.pravatar.cc/150?img=33",
    imageAlt: "Portrait of Rajesh Kumar",
  },
  {
    title: "Innovative solutions",
    quote:
      "Yashraj Constructions brought fresh perspectives and innovative solutions to every challenge. Their expertise in modern construction techniques is unmatched.",
    author: "Emily Johnson",
    role: "Director, Green Architecture",
    imageSrc: "https://i.pravatar.cc/150?img=20",
    imageAlt: "Portrait of Emily Johnson",
  },
  {
    title: "Outstanding partnership",
    quote:
      "Working with Yashraj Constructions has been a true partnership. They listened to our needs, provided expert guidance, and delivered beyond our expectations.",
    author: "Michael Brown",
    role: "Founder, Tech Spaces Inc",
    imageSrc: "https://i.pravatar.cc/150?img=51",
    imageAlt: "Portrait of Michael Brown",
  },
];

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scroll = () => {
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 24; // gap-6 = 24px
      const scrollAmount = cardWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        // Reset to start when reaching the end
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll to next card
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    };

    const autoScroll = setInterval(scroll, 4000); // Auto-swipe every 4 seconds

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#FFD700] py-24 text-[#0E0E0E]">
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
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex-shrink-0 snap-start"
              style={{
                width: "calc((100% - 72px) / 4)",
                minWidth: "calc((100% - 72px) / 4)",
              }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

