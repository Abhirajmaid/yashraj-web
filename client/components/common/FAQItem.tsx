type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-[#0E0E0E]/10 pb-6 pt-6 first:pt-0 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 text-left text-[#0E0E0E] transition hover:translate-x-1 focus:outline-none"
      >
        <span className="text-lg font-semibold">{question}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0E0E0E] text-sm font-semibold text-white transition hover:-translate-y-0.5">
          {isOpen ? "—" : "↗"}
        </span>
      </button>
      {isOpen ? (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#0E0E0E]/70">
          {answer}
        </p>
      ) : null}
    </div>
  );
}

