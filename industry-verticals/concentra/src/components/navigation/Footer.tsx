'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link,
  Text,
  RichTextField,
  RichText,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import {
  Text as CcText,
  RichText as CcRichText,
  Link as CcLink,
  NextImage as CcImage,
  useSitecore as useCcSitecore,
  Field as CcField,
  RichTextField as CcRichTextField,
  ImageField as CcImageField,
  LinkField as CcLinkField,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Image1: ImageField;
  Title1: Field<string>;
  Text1: RichTextField;
  Title2: Field<string>;
  Text2: RichTextField;
  Title3: Field<string>;
  Text3: RichTextField;
  Title4: Field<string>;
  Text4: RichTextField;
  Copyright: Field<string>;
  Link1: LinkField;
  Link2: LinkField;
  SocialsTitle: Field<string>;
  SocialLink1: LinkField;
  SocialIcon1: ImageField;
  SocialLink2: LinkField;
  SocialIcon2: ImageField;
  SocialLink3: LinkField;
  SocialIcon3: ImageField;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component component-spaced footer ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
            />
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 row-gap-5 gx-5">
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title3} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text3} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title4} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text4} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithSocials = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced footer with-socials ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
            />
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-gap-5 gx-5">
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.SocialsTitle} />
              </div>
              <div className="links links-socials">
                <Link field={props.fields?.SocialLink1}>
                  <NextImage field={props.fields?.SocialIcon1} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink2}>
                  <NextImage field={props.fields?.SocialIcon2} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink3}>
                  <NextImage field={props.fields?.SocialIcon3} width={16} height={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Concentra variants (client look; extra fields from the derived template, R22) ----

const SOCIAL_PATHS: Record<string, string> = {
  facebook: 'M14 8h-2c-.6 0-1 .4-1 1v2h3l-.4 3H11v7H8v-7H6v-3h2V8.5C8 6.6 9.3 5 11.4 5H14v3z',
  twitter: 'M21 6.5c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.7.4-1.5.7-2.3.9a3.6 3.6 0 0 0-6.2 3.3A10.3 10.3 0 0 1 4.5 5.4a3.6 3.6 0 0 0 1.1 4.8c-.6 0-1.2-.2-1.6-.4 0 1.8 1.2 3.3 2.9 3.6-.5.1-1.1.2-1.6.1.5 1.4 1.8 2.5 3.4 2.5A7.3 7.3 0 0 1 3 17.5 10.3 10.3 0 0 0 8.6 19c6.7 0 10.3-5.5 10.3-10.3v-.5c.7-.5 1.3-1.1 1.8-1.8z',
  linkedin: 'M7 9H4v11h3V9zM5.5 4A1.7 1.7 0 1 0 5.5 7.4 1.7 1.7 0 0 0 5.5 4zM20 13.3c0-3-1.6-4.5-3.8-4.5-1.7 0-2.5.9-2.9 1.6V9H10v11h3v-6c0-1.5.6-2.5 1.9-2.5 1.3 0 1.9.9 1.9 2.5v6h3.2v-6.7z',
  youtube: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z',
  email: 'M3 6h18v12H3V6zm9 6.5L4.5 7.5v.2L12 13l7.5-5.3v-.2L12 12.5z',
  rss: 'M5 17a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 10a11 11 0 0 1 11 11h-3a8 8 0 0 0-8-8v-3zm0-6a17 17 0 0 1 17 17h-3A14 14 0 0 0 3 7V4z',
};
const SocialIcon = ({ kind }: { kind: string }): JSX.Element => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d={SOCIAL_PATHS[kind] ?? SOCIAL_PATHS.email} />
  </svg>
);

export const Concentra = (props: FooterProps): JSX.Element => {
  const f = props.fields;
  const id = props.params?.RenderingIdentifier;
  if (!f) return <footer className="component footer cc-footer is-empty-hint">Footer</footer>;
  const cols = [
    { title: f.Title1, text: f.Text1 },
    { title: f.Title2, text: f.Text2 },
    { title: f.Title3, text: f.Text3 },
    { title: f.Title4, text: f.Text4 },
  ].filter((c) => c.title?.value || c.text?.value);
  // three editable social links (the template has three), the other three icons are drawn like the live footer
  const social = [
    { kind: 'facebook', link: f.SocialLink1 },
    { kind: 'twitter', link: f.SocialLink2 },
    { kind: 'linkedin', link: f.SocialLink3 },
  ];
  return (
    <div className={`component footer cc-footer ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container cc-footer-grid">
        {cols.map((c, i) => (
          <div key={i} className="cc-footer-col">
            <h3 className="cc-footer-title">
              <CcText field={c.title} />
            </h3>
            <CcRichText field={c.text} className="cc-footer-links" />
          </div>
        ))}
        <div className="cc-footer-social">
          <div className="cc-social-icons">
            {social.map((s) => (
              <CcLink key={s.kind} field={s.link ?? { value: { href: '#' } }} className="cc-social" editable={false} aria-label={s.kind}>
                <SocialIcon kind={s.kind} />
              </CcLink>
            ))}
            {['youtube', 'email', 'rss'].map((k) => (
              <span key={k} className="cc-social" aria-label={k}>
                <SocialIcon kind={k} />
              </span>
            ))}
          </div>
          <p className="cc-copyright">
            <CcText field={f.Copyright} />
          </p>
        </div>
      </div>
    </div>
  );
};
