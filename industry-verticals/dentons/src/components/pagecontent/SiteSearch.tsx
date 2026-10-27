'use client';

import { JSX } from 'react';
import { Field, Link, LinkField, Text, useSitecore } from '@sitecore-content-sdk/nextjs';

interface SearchResultFields {
  Title?: Field<string>;
  Excerpt?: Field<string>;
  Link?: LinkField;
}

export type SiteSearchProps = {
  params: { [key: string]: string };
  fields?: {
    Title?: Field<string>;
    SearchPlaceholder?: Field<string>;
    items?: { fields?: SearchResultFields; displayName?: string }[];
  };
};

const Search = (props: SiteSearchProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields;
  const id = props.params?.RenderingIdentifier;

  return (
    <section className={`component site-search ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        {(fields?.Title?.value || isEditing) && <Text tag="h1" field={fields?.Title} />}
        <input
          type="search"
          readOnly
          aria-label={fields?.SearchPlaceholder?.value || 'Search'}
          placeholder={fields?.SearchPlaceholder?.value || ''}
        />
        <ul>
          {(fields?.items ?? []).map((item, index) => (
            <li key={item.displayName || index}>
              {(item.fields?.Title?.value || isEditing) && <Text tag="h2" field={item.fields?.Title} />}
              {(item.fields?.Excerpt?.value || isEditing) && <Text tag="p" field={item.fields?.Excerpt} />}
              {item.fields?.Link?.value?.href && <Link field={item.fields.Link} />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const Default = Search;
export const Dentons = Search;
