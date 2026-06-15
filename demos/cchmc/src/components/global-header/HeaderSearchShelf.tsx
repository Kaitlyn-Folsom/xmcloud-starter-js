'use client';

import { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const popularSearchTerms = [
  'Careers',
  'Urgent Care',
  'MyChart',
  'Neurology',
  'Volunteer',
];

interface HeaderSearchShelfProps {
  isOpen: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  onTermSelect: (term: string) => void;
  shelfRef: React.RefObject<HTMLDivElement | null>;
}

export const HeaderSearchShelf: React.FC<HeaderSearchShelfProps> = ({
  isOpen,
  value,
  onChange,
  onSubmit,
  onClose,
  onTermSelect,
  shelfRef,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  const handleClear = () => {
    if (value) {
      onChange('');
      inputRef.current?.focus();
      return;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={shelfRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="relative overflow-hidden border-t-2 border-primary bg-background shadow-md"
          role="search"
          aria-label="Site search"
        >
          {/* Caret aligned under desktop Search trigger */}
          <div
            className="border-b-primary absolute -top-[10px] right-[148px] hidden h-0 w-0 border-x-[10px] border-x-transparent border-b-[10px] @lg:block @xl:right-[168px]"
            aria-hidden
          />

          <div className="@xl:px-8 mx-auto max-w-screen-xl px-4 py-6">
            <form onSubmit={handleSubmit} className="flex">
              <label htmlFor="header-search-input" className="sr-only">
                Search
              </label>
              <input
                id="header-search-input"
                ref={inputRef}
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder=""
                className="border-foreground/25 bg-secondary text-foreground h-12 min-w-0 flex-1 rounded-none border border-r-0 px-4 text-base focus:outline-none"
                autoComplete="off"
              />
              <div className="bg-primary flex shrink-0 items-stretch">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-primary-foreground hover:bg-primary-hover flex h-12 w-12 items-center justify-center transition-colors"
                  aria-label={value ? 'Clear search' : 'Close search'}
                >
                  <X className="size-5" strokeWidth={2.5} />
                </button>
                <button
                  type="submit"
                  className="text-primary-foreground hover:bg-primary-hover flex h-12 w-12 items-center justify-center border-l border-white/25 transition-colors"
                  aria-label="Submit search"
                >
                  <Search className="size-5" strokeWidth={2.5} />
                </button>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-brand-purple mb-3 text-lg font-bold">Popular search terms</p>
              <div className="flex flex-wrap gap-2">
                {popularSearchTerms.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => onTermSelect(term)}
                    className={cn(
                      'bg-brand-purple text-primary-foreground hover:bg-brand-purple/90 px-3 py-1 text-sm font-semibold transition-colors'
                    )}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
