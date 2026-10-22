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
  useSitecore,
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

const SOCIAL_LINKS = [
  {
    label: 'Dentons on LinkedIn',
    href: 'https://www.linkedin.com/company/dentons',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.7 9.2H1.8V22h2.9V9.2zM3.2 2C2.2 2 1.4 2.8 1.4 3.8S2.2 5.6 3.2 5.6 5 4.8 5 3.8 4.3 2 3.2 2zM22.2 22h-2.9v-6.8c0-1.9-.8-3.2-2.5-3.2-1.3 0-2 .9-2.4 1.7-.1.3-.1.7-.1 1.1V22H11.4s.1-11.2 0-12.8h2.9v2.1c.4-.7 1.4-1.8 3.5-1.8 2.6 0 4.4 1.7 4.4 5.3V22z"
        />
      </svg>
    ),
  },
  {
    label: 'Dentons on X',
    href: 'https://x.com/dentons',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.6 2H2.2l8.1 11.1L2.2 22h1.8l7.1-7.6L15.4 22h6.4l-7.1-11.7zm-2.5 2.7-.8-1.1L4.6 3.3h2.8l5.3 7.1.8 1.1 6.9 9.2h-2.8l-5.4-7.7z"
        />
      </svg>
    ),
  },
  {
    label: 'Dentons on YouTube',
    href: 'https://www.youtube.com/user/Dentons',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z"
        />
      </svg>
    ),
  },
  {
    label: 'Dentons on Instagram',
    href: 'https://www.instagram.com/dentons/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4zm0 7.6A3 3 0 1 1 15 12a3 3 0 0 1-3 3zm5.9-8.8a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1zM21.9 7.1a6.5 6.5 0 0 0-1.8-4.6A6.5 6.5 0 0 0 15.5 1c-1.8-.1-7.2-.1-9 0a6.5 6.5 0 0 0-4.6 1.8A6.6 6.6 0 0 0 .1 7.4c-.1 1.8-.1 7.2 0 9a6.5 6.5 0 0 0 1.8 4.6 6.5 6.5 0 0 0 4.6 1.8c1.8.1 7.2.1 9 0a6.5 6.5 0 0 0 4.6-1.8 6.5 6.5 0 0 0 1.8-4.6c.1-1.8.1-7.2 0-9zm-2 10.9a3.7 3.7 0 0 1-2.1 2.1c-1.4.6-4.8.4-6.4.4s-5 .2-6.4-.4a3.7 3.7 0 0 1-2.1-2.1c-.6-1.4-.4-4.8-.4-6.4s-.2-5 .4-6.4a3.7 3.7 0 0 1 2.1-2.1c1.4-.6 4.8-.4 6.4-.4s5-.2 6.4.4a3.7 3.7 0 0 1 2.1 2.1c.6 1.4.4 4.8.4 6.4s.2 5-.4 6.4z"
        />
      </svg>
    ),
  },
  {
    label: 'Subscribe to our mailing list',
    href: 'https://www.dentons.com/en/subscribe',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M2 5.5h20v13H2v-13zm10 7.2L4.2 7.2V17h15.6V7.2L12 12.7zM4.6 7l7.4 4.8L19.4 7H4.6z"
        />
      </svg>
    ),
  },
  {
    label: 'View our RSS feeds',
    href: 'https://www.dentons.com/en/rss',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6.2 17.4a2.2 2.2 0 1 1-2.2-2.2 2.2 2.2 0 0 1 2.2 2.2zM4 4.5v2.6a12.9 12.9 0 0 1 12.9 12.9H19.5A15.5 15.5 0 0 0 4 4.5zm0 5.4v2.6a7.5 7.5 0 0 1 7.5 7.5h2.6A10.1 10.1 0 0 0 4 9.9z"
        />
      </svg>
    ),
  },
] as const;

const FooterLogo = ({ field }: { field?: ImageField }): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const hasLogo = Boolean(field?.value?.src);

  if (isPageEditing || hasLogo) {
    return <NextImage field={field} width={180} height={45} />;
  }

  return <img src="/dentons-logo.svg" alt="Dentons" width={180} height={45} />;
};

/* Dentons variant: logo, legal links, cookie control and disclaimer. Social icons are hardcoded. */
export const Dentons = (props: FooterProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const legalFields = [props.fields?.Text1, props.fields?.Text2, props.fields?.Text3, props.fields?.Text4];

  return (
    <div
      className={`component footer variant-dentons ${props.params?.styles || ''}`}
      id={props.params.RenderingIdentifier || undefined}
    >
      <div className="container">
        <div className="footer-brand">
          <div className="logo">
            <FooterLogo field={props.fields?.Image1} />
          </div>
          <ul className="socials">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.label}>
                <a href={item.href} aria-label={item.label} target="_blank" rel="noreferrer">
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className="legal-links" aria-label="Legal">
          {legalFields.map((field, index) =>
            field?.value || (isPageEditing && index < 3) ? (
              <RichText key={`legal-${index}`} field={field} />
            ) : null
          )}
        </nav>
        <div className="footnote">
          <button type="button" className="cookie-consent">
            Cookie Consent Manager
          </button>
          {(isPageEditing || props.fields?.Copyright?.value) && (
            <Text field={props.fields?.Copyright} tag="p" />
          )}
        </div>
      </div>
    </div>
  );
};
