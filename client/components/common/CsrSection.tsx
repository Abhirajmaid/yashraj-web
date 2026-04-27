import { SectionHeader } from "@/components/common/SectionHeader";

const csrParagraphs = [
  "As part of our subcontracting work for SM Autade, under the guidance and directives of the Maharashtra State Road Development Corporation (MSRDC), Yashraj undertook a tree plantation initiative aligned with environmental stewardship goals.",
  "In connection with the development of a truck lay-by on the Mumbai-Pune Expressway, 340 native trees of diverse species were planted to enhance green cover and support ecological balance.",
  "This initiative was carried out with the guidance of Dharmendra Kar, Founder and Trustee of WAY2 ISR Foundation, ensuring the use of suitable local species and sustainable practices.",
  "Through this effort, Yashraj continues to integrate environmental responsibility into infrastructure development.",
];

export function CsrSection() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-light/10 text-brand-dark">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
        <SectionHeader
          eyebrow="CSR"
          title="Corporate Social Responsibility"
          description="Building greener infrastructure through responsible action."
          eyebrowClassName="text-primary"
          titleClassName="text-brand-dark"
          descriptionClassName="text-brand-dark/70"
        />

        <div className="mt-8 space-y-6 text-base leading-relaxed text-brand-dark/80">
          {csrParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
