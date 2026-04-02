"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

/** Digits only, country code included (+91 8208074747). Override via NEXT_PUBLIC_WHATSAPP_NUMBER. */
const DEFAULT_WHATSAPP_E164 = "918208074747";

function getWhatsAppUrl(): string {
  const n =
    typeof process.env.NEXT_PUBLIC_WHATSAPP_NUMBER === "string" &&
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, "").length >= 10
      ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, "")
      : DEFAULT_WHATSAPP_E164;
  return `https://wa.me/${n}`;
}

export function WhatsappCTA() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp"
      aria-label="Chat with us on WhatsApp"
      className="group animate-whatsapp-cta-in fixed bottom-20 right-4 z-[190] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition duration-300 lg:bottom-8 lg:right-8 lg:h-[3.25rem] lg:w-[3.25rem] hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <Icon
        icon="mdi:whatsapp"
        width={28}
        height={28}
        className="drop-shadow-sm"
        aria-hidden
      />
      <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg bg-brand-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition group-hover:opacity-100 lg:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
