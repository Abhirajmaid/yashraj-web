import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Yashraj Infrastructure collects, uses, stores, and protects your data when you use our website and contact channels.",
  openGraph: {
    title: "Privacy Policy - Yashraj Infrastructure",
    description:
      "Learn how we handle personal information, cookies, third-party services, and your privacy rights.",
    images: ["/images/privacy.jpg"],
  },
};

const PRIVACY_PILLARS = [
  {
    number: "01",
    title: "Data We Collect",
    description:
      "We collect only the information required to respond to enquiries, improve website experience, and provide relevant project or service communication.",
  },
  {
    number: "02",
    title: "How We Use Data",
    description:
      "Your data is used for communication, internal analysis, service improvement, and legal compliance where required.",
  },
  {
    number: "03",
    title: "Protection & Control",
    description:
      "We follow reasonable safeguards to protect data and provide channels to request updates, corrections, or deletion.",
  },
];

const PRIVACY_SECTIONS = [
  {
    title: "1. Information We Collect",
    points: [
      "We may collect details such as your name, email address, phone number, and project-related information when you submit forms or contact us.",
      "Basic technical data such as browser type, pages visited, and usage patterns may be collected for analytics and performance improvements.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    points: [
      "To respond to your enquiries, share relevant service details, and support project-related communication.",
      "To improve website functionality, user experience, and content relevance.",
      "To comply with legal or regulatory obligations when applicable.",
    ],
  },
  {
    title: "3. Cookies and Tracking",
    points: [
      "This website may use cookies or similar technologies to understand visitor interactions and improve performance.",
      "You can manage cookie settings through your browser preferences.",
    ],
  },
  {
    title: "4. Data Sharing",
    points: [
      "We do not sell your personal information.",
      "Data may be shared with trusted service providers only where necessary to operate the website or deliver communication.",
    ],
  },
  {
    title: "5. Data Security",
    points: [
      "We apply reasonable technical and administrative safeguards to protect your information from unauthorized access, loss, or misuse.",
      "No online transmission or storage method is fully risk-free; however, we continuously improve our security practices.",
    ],
  },
  {
    title: "6. Third-Party Links",
    points: [
      "Our website may include links to third-party websites for convenience.",
      "We are not responsible for the privacy practices or content of those external sites.",
    ],
  },
  {
    title: "7. Your Rights",
    points: [
      "You may request access, correction, or deletion of your personal data by contacting us.",
      "You may also opt out of non-essential communication at any time.",
    ],
  },
  {
    title: "8. Policy Updates",
    points: [
      "We may update this Privacy Policy periodically to reflect operational, legal, or regulatory changes.",
      "Continued use of the website after updates indicates acceptance of the revised policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="privacy"
        backgroundImage="/images/privacy.jpg"
        useDirectImagePath
        backgroundImageAlt="Privacy policy and legal information"
        title="Privacy Policy"
        description="How we collect, use, and protect your information."
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
        scrollIndicatorText="Scroll to read policy"
        backgroundColor="bg-brand-dark"
        objectPosition="center"
        maxContentWidth="max-w-4xl"
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="OUR LEGAL"
            title="Privacy Policy"
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
                eyebrow="PRIVACY HIGHLIGHTS"
                title="Key Privacy Points"
                description="A quick overview of how we handle your data and your privacy rights."
                eyebrowClassName="text-primary"
                titleClassName="text-brand-dark"
                descriptionClassName="text-brand-dark/70"
              />
            </div>

            <div className="space-y-8">
              {PRIVACY_PILLARS.map((pillar) => (
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
            <p className="text-sm text-brand-dark/60">Information Handling</p>

            <div className="mt-8 space-y-8">
              {PRIVACY_SECTIONS.map((section) => (
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
