export type FAQEntry = {
  question: string;
  /** Plain-text answer (use with or without bulletPoints) */
  answer?: string;
  /** Optional bullet list (e.g. process steps) */
  bulletPoints?: string[];
};

export const faqItems: FAQEntry[] = [
  {
    question: "What is your project execution process?",
    answer: "Our process includes:",
    bulletPoints: [
      "Site assessment and planning",
      "Resource mobilization",
      "Execution with strict quality control",
      "Regular reporting and compliance checks",
      "Timely project completion and handover",
    ],
  },
  {
    question: "How do you ensure quality in construction?",
    answer:
      "We follow strict quality control procedures, use certified materials, and adhere to government specifications and engineering standards at every stage of execution.",
  },
  {
    question: "What machinery and equipment do you use?",
    answer:
      "We use modern, well-maintained machinery for road construction, asphalt laying, and concrete works to ensure efficiency and durability. Specific equipment can be discussed based on project requirements.",
  },
  {
    question: "Do you take subcontracting work?",
    answer:
      "Yes, we collaborate on subcontracting opportunities depending on project scope and alignment.",
  },
  {
    question: "How can we get started?",
    answer:
      "You can contact us through our website or directly reach out to our team. We will schedule a consultation and guide you through the next steps.",
  },
  {
    question: "What risks do clients typically face in infrastructure projects?",
    answer:
      "Common risks include delays, poor quality, cost overruns, and compliance issues. We mitigate these through structured planning, quality control, and transparent communication.",
  },
  {
    question: "Can we visit your ongoing or completed projects?",
    answer:
      "Yes, we can arrange site visits to demonstrate our work quality and execution capabilities.",
  },
  {
    question: "Do you offer subcontracting opportunities?",
    answer:
      "Yes, we collaborate with select subcontractors who demonstrate strong technical expertise, reliability, and a commitment to quality. Partnerships are based on project requirements and past performance.",
  },
];
