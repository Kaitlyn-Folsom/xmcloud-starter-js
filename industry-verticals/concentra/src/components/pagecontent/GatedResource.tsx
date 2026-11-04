'use client';

import { JSX, useState, useEffect, FormEvent } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  RichTextField,
  Text,
  RichText,
  Link,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type JsonValue<T> = { jsonValue: T };

interface SidebarItem {
  id: string;
  image?: JsonValue<ImageField>;
  link?: JsonValue<LinkField>;
}

interface Datasource {
  image?: JsonValue<ImageField>;
  title?: JsonValue<Field<string>>;
  text?: JsonValue<RichTextField>;
  consent?: JsonValue<RichTextField>;
  submitLabel?: JsonValue<Field<string>>;
  sidebarTitle?: JsonValue<Field<string>>;
  newsletterTitle?: JsonValue<Field<string>>;
  newsletterLink?: JsonValue<LinkField>;
  children?: { results?: SidebarItem[] };
}

export type GatedResourceProps = ComponentProps & {
  fields: { data?: { datasource?: Datasource } };
};

// form labels are part of the form's behaviour (as on the live page), not authorable content
const FORM_FIELDS = [
  { name: 'firstName', label: 'First Name (Required)', type: 'text' },
  { name: 'lastName', label: 'Last Name (Required)', type: 'text' },
  { name: 'email', label: 'Email (Required)', type: 'email' },
  { name: 'phone', label: 'Phone Number (Required)', type: 'tel' },
  { name: 'company', label: 'Company (Required)', type: 'text' },
  { name: 'zip', label: 'Zip Code (Required)', type: 'text' },
];

const SHARE = {
  facebook: { label: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' },
  twitter: { label: 'Twitter', url: 'https://twitter.com/intent/tweet?url=' },
};

const ShareIcon = ({ kind, pageUrl }: { kind: 'facebook' | 'linkedin' | 'twitter'; pageUrl: string }): JSX.Element => {
  const paths = {
    facebook: 'M14 8h-2c-.6 0-1 .4-1 1v2h3l-.4 3H11v7H8v-7H6v-3h2V8.5C8 6.6 9.3 5 11.4 5H14v3z',
    linkedin: 'M7 9H4v11h3V9zM5.5 4A1.7 1.7 0 1 0 5.5 7.4 1.7 1.7 0 0 0 5.5 4zM20 13.3c0-3-1.6-4.5-3.8-4.5-1.7 0-2.5.9-2.9 1.6V9H10v11h3v-6c0-1.5.6-2.5 1.9-2.5 1.3 0 1.9.9 1.9 2.5v6h3.2v-6.7z',
    twitter: 'M21 6.5c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.7.4-1.5.7-2.3.9a3.6 3.6 0 0 0-6.2 3.3A10.3 10.3 0 0 1 4.5 5.4a3.6 3.6 0 0 0 1.1 4.8c-.6 0-1.2-.2-1.6-.4 0 1.8 1.2 3.3 2.9 3.6-.5.1-1.1.2-1.6.1.5 1.4 1.8 2.5 3.4 2.5A7.3 7.3 0 0 1 3 17.5 10.3 10.3 0 0 0 8.6 19c6.7 0 10.3-5.5 10.3-10.3v-.5c.7-.5 1.3-1.1 1.8-1.8z',
  };
  return (
    <a className="gr-share-link" href={SHARE[kind].url + encodeURIComponent(pageUrl)} target="_blank" rel="noopener noreferrer">
      <span className="gr-share-icon">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d={paths[kind]} />
        </svg>
      </span>
      <span className="sr-only">Share on {SHARE[kind].label}</span>
    </a>
  );
};

const render = (props: GatedResourceProps, look: string): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const [sent, setSent] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  useEffect(() => setPageUrl(window.location.href), []);
  const ds = props.fields?.data?.datasource;
  if (!ds) {
    return (
      <div className="component gated-resource">
        <span className="is-empty-hint">Gated resource: choose a datasource</span>
      </div>
    );
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); // demo form: nothing is sent
    setSent(true);
  };
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component gated-resource ${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container gr-grid">
        <article className="gr-main">
          <div className="gr-image">
            <NextImage field={ds.image?.jsonValue} width={980} height={450} />
          </div>
          <div className="gr-body">
            <h1 className="gr-title">
              <Text field={ds.title?.jsonValue} />
            </h1>
            <div className="gr-share">
              <ShareIcon kind="facebook" pageUrl={pageUrl} />
              <ShareIcon kind="linkedin" pageUrl={pageUrl} />
              <ShareIcon kind="twitter" pageUrl={pageUrl} />
            </div>
            <div className="gr-columns">
              <RichText field={ds.text?.jsonValue} className="gr-text cc-cross-list" />
              {sent ? (
                <p className="gr-thanks">Thank you. Your download is on its way.</p>
              ) : (
                <form className="gr-form" onSubmit={onSubmit}>
                  {FORM_FIELDS.map((f) => (
                    <label key={f.name} className="gr-field">
                      <span>{f.label}</span>
                      <input name={f.name} type={f.type} required={!isEditing} />
                    </label>
                  ))}
                  <label className="gr-consent">
                    <input type="checkbox" required={!isEditing} />
                    <RichText field={ds.consent?.jsonValue} tag="span" />
                  </label>
                  <button type="submit" className="cc-pill cc-pill-green">
                    <Text field={ds.submitLabel?.jsonValue} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </article>
        <aside className="gr-sidebar">
          <div className="gr-box">
            <h2 className="gr-box-title">
              <Text field={ds.sidebarTitle?.jsonValue} />
            </h2>
            <ul className="gr-list">
              {(ds.children?.results ?? []).map((it) => (
                <li key={it.id} className="gr-list-item">
                  <span className="gr-thumb">
                    <NextImage field={it.image?.jsonValue} width={66} height={66} />
                  </span>
                  <Link field={it.link?.jsonValue ?? { value: {} }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="gr-box">
            <h2 className="gr-box-title">
              <Text field={ds.newsletterTitle?.jsonValue} />
            </h2>
            <div className="gr-box-body">
              <Link field={ds.newsletterLink?.jsonValue ?? { value: {} }} className="cc-pill cc-pill-green" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export const Default = (props: GatedResourceProps): JSX.Element => render(props, '');
export const Concentra = (props: GatedResourceProps): JSX.Element => render(props, 'cc-gated');
