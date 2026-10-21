'use client';

import { JSX, useState } from 'react';
import { ComponentProps } from 'lib/component-props';

export type SiteSearchProps = ComponentProps;

const SiteSearchEmpty = (): JSX.Element => (
  <div className="component site-search">
    <span className="is-empty-hint">SiteSearch</span>
  </div>
);

export const Default = ({ params }: SiteSearchProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  if (!params) return <SiteSearchEmpty />;

  return (
    <div
      className={`component site-search ${params.styles || ''}`}
      id={params.RenderingIdentifier || undefined}
    >
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        Search
      </button>
      {open && (
        <form onSubmit={(event) => event.preventDefault()}>
          <label>
            Search this site
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          </label>
        </form>
      )}
    </div>
  );
};

export const Dentons = ({ params }: SiteSearchProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  if (!params) return <SiteSearchEmpty />;

  return (
    <div
      className={`component site-search variant-dentons ${params.styles || ''}`}
      id={params.RenderingIdentifier || undefined}
    >
      <button type="button" aria-label="Search this site" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.25" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M15.2 15.2 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <form onSubmit={(event) => event.preventDefault()}>
          <label>
            Search this site
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          </label>
        </form>
      )}
    </div>
  );
};
