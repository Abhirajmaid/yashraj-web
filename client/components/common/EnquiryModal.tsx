"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Button from "./Button";

type EnquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      
      // Close modal after 2 seconds on success
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl transform transition-all">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-brand-gray-light/50 bg-white px-6 py-4 sm:px-8 sm:py-5 rounded-t-2xl sm:rounded-t-3xl">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-brand-dark">
              Get in Touch
            </h2>
            <p className="text-sm text-brand-dark/70 mt-1">
              Fill out the form below and we&apos;ll get back to you soon.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-brand-gray-light/30 text-brand-dark transition hover:bg-brand-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            aria-label="Close modal"
          >
            <Icon icon="mdi:close" className="text-lg sm:text-xl" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8">
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
                rows={5}
                placeholder="Tell us about your project, timeline, and any specific requirements..."
                className="w-full rounded-xl border border-brand-gray-light bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
              />
            </label>

            {submitStatus === "success" && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-3 sm:p-4 text-xs sm:text-sm text-green-800">
                Thank you! Your message has been sent. We&apos;ll get back to
                you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 sm:p-4 text-xs sm:text-sm text-red-800">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="secondary"
                size="lg"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="lg"
                htmlType="submit"
                disabled={isSubmitting}
                className="flex-1 uppercase tracking-wide"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


