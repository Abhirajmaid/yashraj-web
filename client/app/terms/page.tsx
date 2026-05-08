import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms of Service for Yashraj Infrastructure, including website usage, content ownership, limitations, and contact details.",
  openGraph: {
    title: "Terms of Service - Yashraj Infrastructure",
    description:
      "Website terms covering acceptable use, intellectual property, liability limits, and policy updates.",
    images: ["/images/terms.jpg"],
  },
};

const TERMS_PILLARS = [
  {
    number: "01",
    title: "Acceptance & Website Use",
    description:
      "Using this website means you agree to these terms and to lawful, responsible usage of all content and features.",
  },
  {
    number: "02",
    title: "Content & Intellectual Property",
    description:
      "Website text, visuals, branding, and media are owned by or licensed to Yashraj Infrastructure and require permission for reuse.",
  },
  {
    number: "03",
    title: "Liability & Updates",
    description:
      "Information may change without notice, and continued use after changes means acceptance of updated terms.",
  },
];

const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    points: [
      "By accessing or using this website, you agree to be bound by these Terms of Service.",
      "If you do not agree with any part of these terms, please do not use the website.",
    ],
  },
  {
    title: "2. Use of Website",
    points: [
      "This website is intended to provide information about Yashraj Infrastructure, our services, projects, and products.",
      "You agree to use the website only for lawful purposes and in a way that does not harm, disable, or impair the platform.",
    ],
  },
  {
    title: "3. Intellectual Property",
    points: [
      "All content on this website, including text, design, graphics, logos, and media, is owned by or licensed to Yashraj Infrastructure unless stated otherwise.",
      "You may not reproduce, republish, or distribute content from this website without prior written permission.",
    ],
  },
  {
    title: "4. Accuracy of Information",
    points: [
      "We strive to keep website information accurate and up to date, but we do not guarantee completeness, accuracy, or timeliness at all times.",
      "Project details, service descriptions, and other materials may be updated, modified, or removed without prior notice.",
    ],
  },
  {
    title: "5. Third-Party Links",
    points: [
      "This website may include links to third-party websites for convenience.",
      "Yashraj Infrastructure is not responsible for the content, policies, or practices of any third-party websites.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    points: [
      "Yashraj Infrastructure is not liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.",
      "Use of website content is at your own discretion and risk.",
    ],
  },
  {
    title: "7. Changes to Terms",
    points: [
      "We may revise these Terms of Service at any time without prior notice.",
      "Continued use of the website after updates means you accept the revised terms.",
    ],
  },
  {
    title: "8. Contact Information",
    points: [
      "For any questions regarding these terms, please reach out through our contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="terms"
        backgroundImage="/images/terms.jpg"
        useDirectImagePath
        backgroundImageAlt="Terms and legal information"
        title="Terms & Conditions"
        description="Please read these terms carefully before using our website."
        buttons={[
          {
            text: "Contact us",
            link: "/contact",
            type: "secondary",
            size: "lg",
            className: "w-full sm:w-auto",
          },
        ]}
        showGradientOverlay={false}
        overlayColor="rgba(0,0,0,0.45)"
        scrollIndicatorText="Scroll to read terms"
        backgroundColor="bg-brand-dark"
        objectPosition="center"
        maxContentWidth="max-w-4xl"
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="OUR LEGAL"
            title="Terms & Conditions"
            align="center"
            eyebrowClassName="tracking-[0.12em] text-brand-primary"
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="TERMS HIGHLIGHTS"
                title="Key Terms"
                description="A quick overview of the most important terms for using our website and content."
                eyebrowClassName="text-primary"
                titleClassName="text-brand-dark"
                descriptionClassName="text-brand-dark/70"
              />
            </div>

            <div className="space-y-8">
              {TERMS_PILLARS.map((pillar) => (
                <div key={pillar.title} className="flex gap-4 sm:gap-6">
                  <span className="text-xl sm:text-2xl font-light text-brand-primary">
                    {pillar.number}
                  </span>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-brand-dark">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-dark/70">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <div className="bg-white p-6 sm:p-8 lg:p-10">
            <p className="text-sm text-brand-dark/60">Conditions of Use</p>

            <div className="mt-8 space-y-8">
              {TERMS_SECTIONS.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h2 className="text-xl font-semibold text-brand-dark sm:text-2xl">
                    <span className="text-brand-primary">{section.title.split(" ")[0]}</span>{" "}
                    <span>{section.title.split(" ").slice(1).join(" ")}</span>
                  </h2>
                  <ul className="space-y-2">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="text-base leading-relaxed text-brand-dark/80"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
