"use client";

import { useState } from "react";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Footer } from "@/components/common/Footer";
import Button from "@/components/common/Button";
import { createCareerApplication } from "@/lib/careerRepository";

type CareerFormState = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  location: string;
  resumeLink: string;
  coverLetter: string;
};

const initialForm: CareerFormState = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  location: "",
  resumeLink: "",
  coverLetter: "",
};

export default function CareerPage() {
  const [formData, setFormData] = useState<CareerFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

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

    try {
      await createCareerApplication(formData);
      setSubmitStatus("success");
      setFormData(initialForm);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="career"
        backgroundImage="/images/contact.jpg"
        useDirectImagePath
        backgroundImageAlt="Career opportunities"
        title="Career"
        flipHorizontal={false}
        description="Be part of our career journey and build infrastructure with purpose."
        showGradientOverlay={true}
        scrollIndicatorText="Scroll to apply"
        backgroundColor="bg-brand-dark"
        objectPosition="center"
        maxContentWidth="max-w-4xl"
      />

      <section className="relative isolate overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <SectionHeader
            eyebrow="CAREER FORM"
            title="Apply Now"
            description="Fill your details and our HR team will reach out to you."
            align="center"
          />

          <div className="mt-10 rounded-2xl border border-brand-gray-light/50 bg-white p-4 sm:p-6 lg:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-brand-dark">
                    Full Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-brand-dark">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-brand-dark">
                    Phone <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-brand-dark">
                    Position Applied For <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-brand-dark">
                    Experience <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 3 years"
                    className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-brand-dark">
                    Current Location <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-brand-dark">
                  Resume Link <span className="text-red-500">*</span>
                </span>
                <input
                  name="resumeLink"
                  value={formData.resumeLink}
                  onChange={handleChange}
                  required
                  placeholder="Google Drive / Dropbox resume link"
                  className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-brand-dark">
                  Cover Letter / Additional Details{" "}
                  <span className="text-red-500">*</span>
                </span>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
                />
              </label>

              {submitStatus === "success" && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                  Application submitted successfully.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  Something went wrong. Please try again.
                </div>
              )}

              <Button
                type="primary"
                size="lg"
                htmlType="submit"
                disabled={isSubmitting}
                className="w-full uppercase tracking-wide"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
