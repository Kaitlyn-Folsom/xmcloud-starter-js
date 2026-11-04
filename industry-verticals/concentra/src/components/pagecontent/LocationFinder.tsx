'use client';

import { JSX, useMemo, useState } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import NextLink from 'next/link';
import { ComponentProps } from 'lib/component-props';

type JsonValue<T> = { jsonValue: T };

interface LocationPage {
  id: string;
  url?: { path?: string };
  centerName?: JsonValue<Field<string>>;
  street?: JsonValue<Field<string>>;
  city?: JsonValue<Field<string>>;
  state?: JsonValue<Field<string>>;
  zip?: JsonValue<Field<string>>;
  phone?: JsonValue<Field<string>>;
  statusLabel?: JsonValue<Field<string>>;
  directionsLink?: JsonValue<LinkField>;
}

interface Datasource {
  heading?: JsonValue<Field<string>>;
  telemedLink?: JsonValue<LinkField>;
  mapImage?: JsonValue<ImageField>;
  locations?: { targetItems?: LocationPage[] };
}

export type LocationFinderProps = ComponentProps & {
  fields: { data?: { datasource?: Datasource } };
};

const PinIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const render = (props: LocationFinderProps, look: string): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const [q, setQ] = useState('');
  const ds = props.fields?.data?.datasource;
  const all = useMemo(() => ds?.locations?.targetItems ?? [], [ds]);
  const v = (f?: JsonValue<Field<string>>) => String(f?.jsonValue?.value ?? '');
  const shown = all.filter((l) => {
    const t = q.trim().toLowerCase();
    if (!t) return true;
    return [v(l.centerName), v(l.city), v(l.state), v(l.zip), v(l.street)].some((s) => s.toLowerCase().includes(t));
  });
  if (!ds) {
    return (
      <div className="component location-finder">
        <span className="is-empty-hint">Location finder: choose a datasource</span>
      </div>
    );
  }
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component location-finder ${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="lf-titlebar">
        <h1 className="lf-heading">
          <Text field={ds.heading?.jsonValue} />
        </h1>
        {(isEditing || ds.telemedLink?.jsonValue?.value?.href) && (
          <div className="lf-telemed">
            <span>Injured employee? </span>
            <Link field={ds.telemedLink?.jsonValue ?? { value: {} }} />
          </div>
        )}
      </div>
      <div className="lf-body">
        <div className="lf-list-col">
          <form className="lf-search" onSubmit={(e) => e.preventDefault()}>
            <label>
              <span>Search City, State, or Zip</span>
              <span className="lf-input">
                <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search City, State, or Zip" />
                {q && (
                  <button type="button" className="lf-clear" aria-label="Clear" onClick={() => setQ('')}>
                    ×
                  </button>
                )}
                <button type="submit" className="lf-go" aria-label="Search">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="M15.5 15.5 21 21" />
                  </svg>
                </button>
              </span>
            </label>
            <button type="button" className="lf-filters">
              Filters
            </button>
          </form>
          <p className="lf-count">
            {shown.length} visible locations / There are {all.length} results
          </p>
          <ul className="lf-list">
            {shown.map((l) => (
              <li key={l.id} className="lf-item">
                <div className="lf-item-main">
                  <NextLink href={l.url?.path ?? '#'} className="lf-name">
                    {v(l.centerName)}
                  </NextLink>
                  <p className="lf-address">
                    {v(l.street)}
                    <br />
                    {v(l.city)}, {v(l.state)} {v(l.zip)}
                  </p>
                  {v(l.statusLabel) && <p className="lf-status">{v(l.statusLabel)}</p>}
                  {v(l.phone) && (
                    <p className="lf-phone">
                      Phone: <a href={`tel:${v(l.phone)}`}>{v(l.phone)}</a>
                    </p>
                  )}
                </div>
                <div className="lf-item-links">
                  {l.directionsLink?.jsonValue?.value?.href && <Link field={l.directionsLink.jsonValue} editable={false}>Get Directions</Link>}
                  <NextLink href={l.url?.path ?? '#'}>Clinic Details</NextLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lf-map">
          <NextImage field={ds.mapImage?.jsonValue} width={1110} height={750} />
          {shown.length > 0 && (
            <span className="lf-map-pin">
              <PinIcon />
            </span>
          )}
        </div>
      </div>
      <div className="lf-bottombar">
        <button type="button" className="lf-export">
          Export Filtered Locations
        </button>
        <button type="button" className="lf-export">
          Export All Locations
        </button>
        <button type="button" className="lf-market">
          Generate Market Map
        </button>
      </div>
    </div>
  );
};

export const Default = (props: LocationFinderProps): JSX.Element => render(props, '');
export const Concentra = (props: LocationFinderProps): JSX.Element => render(props, 'cc-finder');
