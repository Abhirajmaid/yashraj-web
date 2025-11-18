type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-[#0E0E0E]/10 pb-4 sm:pb-6 pt-4 sm:pt-6 first:pt-0 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 sm:gap-6 text-left text-[#0E0E0E] transition hover:translate-x-1 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-lg p-2 -m-2 sm:p-0 sm:m-0"
      >
        <span className="text-base sm:text-lg font-semibold pr-2 sm:pr-0">{question}</span>
        <span className="flex-shrink-0 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-[#0E0E0E] text-xs sm:text-sm font-semibold text-white transition hover:-translate-y-0.5">
          {isOpen ? "—" : "↗"}
        </span>
      </button>
      {isOpen ? (
        <p className="mt-3 sm:mt-4 max-w-3xl text-sm leading-relaxed text-[#0E0E0E]/70">
          {answer}
        </p>
      ) : null}
    </div>
  );
}

