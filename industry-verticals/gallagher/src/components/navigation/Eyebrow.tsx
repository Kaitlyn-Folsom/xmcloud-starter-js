'use client';

import { AppPlaceholder, ComponentMap, ImageField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';

export type EyebrowProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

type EyebrowLink = {
  label: string;
  href: string;
};

const UTILITY_LINKS: EyebrowLink[] = [
  { label: 'Careers', href: '#' },
  { label: 'Investor Relations', href: '#' },
  { label: 'Locations', href: '#' },
];

const GlobeIcon = (): JSX.Element => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M3 12h18M12 3c2.5 3 3.7 6 3.7 9s-1.2 6-3.7 9c-2.5-3-3.7-6-3.7-9s1.2-6 3.7-9z" />
  </svg>
);

export const Gallagher = (props: EyebrowProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();

  return (
    <div className={`component eyebrow gallagher ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="eyebrow-bar">
          <nav className="eyebrow-links" aria-label="Utility links">
            <ul>
              {UTILITY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="eyebrow-meta">
            <div className="eyebrow-region" aria-label="Region">
              <GlobeIcon />
              <span>United States</span>
            </div>
            <span className="eyebrow-divider" aria-hidden="true">
              |
            </span>
            <div className="eyebrow-tools">
              <AppPlaceholder
                name="eyebrow-right"
                rendering={props.rendering}
                page={page}
                componentMap={props.componentMap}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = Gallagher;
