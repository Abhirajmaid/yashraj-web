"use client";
import { useEffect, useRef } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
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

    let intervalId: NodeJS.Timeout | null = null;

    const scroll = () => {
      const firstCardWrapper = container.firstElementChild as HTMLElement;
      if (!firstCardWrapper) return;

      const cardWidth = firstCardWrapper.offsetWidth;
      // Responsive gap: 16px (gap-4) on mobile, 24px (gap-6) on sm and up
      const gap = window.innerWidth < 640 ? 16 : 24;
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

    const startAutoScroll = () => {
      // Disable auto-scroll on mobile for better touch experience
      if (window.innerWidth < 768) return;

      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(scroll, 4000); // Auto-swipe every 4 seconds
    };

    const stopAutoScroll = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // Start auto-scroll (only on desktop)
    startAutoScroll();

    // Pause on hover (desktop only)
    if (window.innerWidth >= 768) {
      container.addEventListener("mouseenter", stopAutoScroll);
      container.addEventListener("mouseleave", startAutoScroll);
    }

    // Handle window resize
    const handleResize = () => {
      stopAutoScroll();
      if (window.innerWidth >= 768) {
        startAutoScroll();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative isolate bg-white py-12 sm:py-16 lg:py-24 text-brand-dark">
      <div className="relative z-10 mx-auto flex max-w-[90%] md:max-w-[80%] flex-col gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-10 xl:px-14">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by clients who value innovation and integrity."
          description="Discover how our partners describe the experience of bringing their most ambitious projects to life with the Yashraj Constructions team."
          eyebrowClassName="text-primary"
          titleClassName="text-brand-dark text-2xl sm:text-3xl lg:text-4xl"
          descriptionClassName="text-brand-dark/70 max-w-2xl text-sm sm:text-base"
        />
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex-shrink-0 snap-start w-[calc(100%-2rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
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
