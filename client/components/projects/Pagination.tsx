"use client";

import { Icon } from "@iconify/react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Results Info */}
      <div className="text-sm text-brand-gray">
        Showing <span className="font-medium text-brand-dark">{startItem}</span> to{" "}
        <span className="font-medium text-brand-dark">{endItem}</span> of{" "}
        <span className="font-medium text-brand-dark">{totalItems}</span> projects
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-gray-light/50 bg-white text-brand-dark transition-all hover:bg-brand-gray-light/30 hover:border-brand-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-brand-gray-light/50"
        >
          <Icon icon="solar:alt-arrow-left-bold" className="text-lg" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-brand-gray"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${
                  isActive
                    ? "border-brand-primary bg-brand-primary text-white"
                    : "border-brand-gray-light/50 bg-white text-brand-dark hover:bg-brand-gray-light/30 hover:border-brand-primary"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-gray-light/50 bg-white text-brand-dark transition-all hover:bg-brand-gray-light/30 hover:border-brand-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-brand-gray-light/50"
        >
          <Icon icon="solar:alt-arrow-right-bold" className="text-lg" />
        </button>
      </div>
    </div>
  );
}

