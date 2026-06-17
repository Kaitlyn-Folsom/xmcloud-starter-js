'use client';
import { HTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { SearchItemFields } from './index';
// import { DICTIONARY_KEYS } from '../constants';

type SearchItemLinkProps = {
  link: SearchItemFields['title'];
  onClick: () => void;
} & HTMLAttributes<HTMLAnchorElement>;

export const SearchItemLink = ({ className, link, onClick, ...props }: SearchItemLinkProps) => {
  const t = useTranslations();


  const toUrlSlug = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[\u0027\u2018\u2019\u201A\u201B`´]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

  return (
    link && (
      <Link
        field={{ href: `/Articles/${toUrlSlug(link.value)}` }}
        className={cn(
          'inline-flex items-center text-primary hover:text-primary-hover font-medium',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {'Read More'}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    )
  );
};
