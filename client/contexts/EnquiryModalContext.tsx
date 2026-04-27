"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { EnquiryModal } from "@/components/common/EnquiryModal";

type ModalType = "contact" | "career";

type EnquiryModalContextType = {
  openModal: () => void;
  openCareerModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
  modalType: ModalType;
};

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(
  undefined
);

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("contact");

  const openModal = () => {
    setModalType("contact");
    setIsOpen(true);
  };

  const openCareerModal = () => {
    setModalType("career");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType("contact");
  };

  return (
    <EnquiryModalContext.Provider
      value={{ openModal, openCareerModal, closeModal, isOpen, modalType }}
    >
      {children}
      <EnquiryModal isOpen={isOpen} onClose={closeModal} modalType={modalType} />
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


