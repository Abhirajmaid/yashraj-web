"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { EnquiryModal } from "@/components/common/EnquiryModal";

type EnquiryModalContextType = {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
};

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(
  undefined
);

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <EnquiryModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <EnquiryModal isOpen={isOpen} onClose={closeModal} />
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (context === undefined) {
    throw new Error(
      "useEnquiryModal must be used within an EnquiryModalProvider"
    );
  }
  return context;
}


