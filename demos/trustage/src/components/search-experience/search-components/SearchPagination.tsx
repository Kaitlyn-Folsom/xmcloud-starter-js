'use client';
import { useTranslations } from 'next-intl';
import { DICTIONARY_KEYS } from './constants';

export const SearchPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const t = useTranslations();
  const maxVisiblePages = 3;

  // Determine the window of pages to display (max of 3)
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust start when near the end to keep the window size consistent
  startPage = Math.max(1, Math.min(startPage, Math.max(1, endPage - maxVisiblePages + 1)));

  // Recalculate endPage based on (possibly) adjusted startPage
  endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pages: number[] = [];
  for (let p = startPage; p <= endPage; p++) {
    pages.push(p);
  }

  const showLeftEllipsis = startPage > 1;
  const showRightEllipsis = endPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="text-muted-foreground hover:bg-secondary hover:text-primary flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t(DICTIONARY_KEYS.PREVIOUS_PAGE) || 'Previous'}
      </button>

      {showLeftEllipsis && (
        <span
          key="left-ellipsis"
          className="w-10 h-10 flex items-center justify-center text-gray-400 select-none"
          aria-hidden
        >
          …
        </span>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 cursor-pointer rounded-md hover:bg-secondary hover:text-primary ${
            currentPage === page
              ? 'bg-accent text-accent-foreground'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {showRightEllipsis && (
        <span
          key="right-ellipsis"
          className="w-10 h-10 flex items-center justify-center text-gray-400 select-none"
          aria-hidden
        >
          …
        </span>
      )}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="text-muted-foreground hover:bg-secondary hover:text-primary flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t(DICTIONARY_KEYS.NEXT_PAGE) || 'Next'}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
