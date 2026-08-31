'use client';

import { ComponentMap, ImageField } from '@sitecore-content-sdk/nextjs';
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

const AUDIENCE_LINKS: EyebrowLink[] = [
  { label: 'Future Students', href: '#' },
  { label: 'Current Students', href: '#' },
  { label: 'Alumni', href: '#' },
  { label: 'Faculty & Staff', href: '#' },
];

const ACTION_LINKS: EyebrowLink[] = [
  { label: 'Apply', href: '#' },
  { label: 'Visit', href: '#' },
  { label: 'Give', href: '#' },
];

type EyebrowLinkListProps = {
  links: EyebrowLink[];
  ariaLabel: string;
  prefix?: string;
};

const EyebrowLinkList = ({ links, ariaLabel, prefix }: EyebrowLinkListProps): JSX.Element => (
  <nav className="eyebrow-links" aria-label={ariaLabel}>
    {prefix && <span className="eyebrow-links-prefix">{prefix}</span>}
    <ul>
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export const Default = (props: EyebrowProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component eyebrow msu ${props.params.styles?.trimEnd() ?? ''}`}
      id={id ? id : undefined}
    >
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="eyebrow-bar">
          <EyebrowLinkList links={AUDIENCE_LINKS} ariaLabel="Audience links" prefix="For:" />
          <EyebrowLinkList links={ACTION_LINKS} ariaLabel="Quick links" />
        </div>
      </div>
    </div>
  );
};
