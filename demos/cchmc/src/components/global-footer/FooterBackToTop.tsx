'use client';

import { Button } from '@/components/ui/button';

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FooterBackToTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      type="button"
      variant="magenta"
      size="icon"
      onClick={handleClick}
      className="h-10 w-10 shrink-0 rounded-full"
      aria-label="Back to top"
    >
      <ArrowUpIcon />
    </Button>
  );
};
