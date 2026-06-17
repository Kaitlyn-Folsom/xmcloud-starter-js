'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
// import { DICTIONARY_KEYS } from './constants';

interface SearchInputProps {
  value: string;
  onChange: (query: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={'Enter Search Term ...'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-input w-full rounded-none px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        <svg
          className="text-muted-foreground absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-muted-foreground hover:text-foreground focus:text-foreground absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform transition-colors focus:outline-none"
            aria-label="Clear search"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
