"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FAQSection } from "@/components/common/FAQSection";
import { Footer } from "@/components/common/Footer";
import Button from "@/components/common/Button";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

export default function ContactPage() {
  const { openCareerModal } = useEnquiryModal();
  const officeLocationLabel =
    "Yashraj Infrastructure, 505 Ambience Court, Sector 19D, Vashi, Navi Mumbai, Maharashtra";
  const officeLocationQuery = encodeURIComponent(officeLocationLabel);
  const officeMapsLink = `https://www.google.com/maps/search/?api=1&query=${officeLocationQuery}`;
  const officeMapsEmbedLink = `https://maps.google.com/maps?hl=en&q=${officeLocationQuery}&z=17&ie=UTF8&iwloc=B&output=embed`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "mdi:map-marker",
      title: "Office Address",
      content: "505, AMBIENCE COURT, SECTOR 19D, VASHI, NAVI MUMBAI",
      link: officeMapsLink,
    },
    {
      icon: "mdi:phone",
      title: "Phone",
      content: "91 8591954712",
      link: "tel:+918591954712",
    },
    {
      icon: "mdi:email",
      title: "Email",
      content: "yashrajinfra@gmail.com",
      link: "mailto:yashrajinfra@gmail.com",
    },
  ];

  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="contact"
        backgroundImage="/images/contact1.jpg"
        useDirectImagePath
        backgroundImageAlt="Contact hero background"
        title="Contact Us"
        flipHorizontal={true}
        description="Get in touch with Yashraj Infrastructure."
        showGradientOverlay={false}
        scrollIndicatorText="Scroll to contact form"
        backgroundColor="bg-brand-dark"
        objectPosition="top"
        maxContentWidth="max-w-4xl"
      />

      {/* Contact Form & Info Section */}
      <section className="relative isolate overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
            <SectionHeader
              eyebrow="CONTACT US"
              title="Let's start a conversation"
              description="Fill out the form below or reach out to us directly. We're here to help with your infrastructure and construction needs."
              align="center"
            />
          </div>

          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.2fr,1fr] lg:gap-16">
            {/* Contact Form */}
            <div
              className="rounded-2xl border border-brand-gray-light/50 bg-white p-4 sm:p-6 lg:p-10 shadow-sm"
              id="contact-form"
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-brand-dark">
                      Full Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-brand-dark">
                      Email Address <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-brand-dark">
                      Company Name
                    </span>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Inc."
                      className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-brand-dark">
                      Phone Number
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-brand-dark">
                    Project Details <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
                  />
                </label>

                {submitStatus === "success" && (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-3 sm:p-4 text-xs sm:text-sm text-green-800">
                    Thank you! Your message has been sent. We&apos;ll get back
                    to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-3 sm:p-4 text-xs sm:text-sm text-red-800">
                    Something went wrong. Please try again or contact us
                    directly.
                  </div>
                )}

                <Button
                  type="primary"
                  size="lg"
                  htmlType="submit"
                  disabled={isSubmitting}
                  className="w-full uppercase tracking-wide"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-2xl border border-brand-gray-light/50 bg-linear-to-br from-brand-primary/5 to-transparent p-5 sm:p-6 lg:p-10">
                <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-brand-dark">
                  Contact Information
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.link}
                      className="group flex items-start gap-3 sm:gap-4 transition hover:opacity-80"
                    >
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white transition group-hover:scale-110">
                        <Icon
                          icon={info.icon}
                          className="text-lg sm:text-2xl"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-brand-dark">
                          {info.title}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-brand-dark/70">
                          {info.content}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-brand-gray-light/50 bg-white p-5 sm:p-6 lg:p-10">
                <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-brand-dark">
                  Business Hours
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-brand-dark/70">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Office location map */}
          <div className="mt-10 lg:mt-14">
            <h3 className="mb-4 text-lg font-semibold text-brand-dark sm:mb-6">
              Our Location
            </h3>
            <div className="overflow-hidden rounded-2xl border border-brand-gray-light/50 shadow-sm">
              <iframe
                title="Yashraj Infrastructure office location - 505, Ambience Court, Sector 19D, Vashi, Navi Mumbai"
                src={officeMapsEmbedLink}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full min-h-[280px] sm:min-h-[350px] lg:min-h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-brand-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Career
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Be part of our career journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/90">
              Join Yashraj Infrastructure and help us build high-impact projects
              across Maharashtra.
            </p>
            <Button
              onClick={openCareerModal}
              type="secondary"
              size="lg"
              className="mt-8 rounded-full text-sm font-semibold shadow-[0_8px_24px_rgba(var(--color-primary-rgb),0.18)]"
            >
              Apply for Career
            </Button>
          </div>
        </div>
      </section>

      <div id="faq" className="bg-white">
        <FAQSection />
      </div>

      <Footer />
    </main>
  );
}
