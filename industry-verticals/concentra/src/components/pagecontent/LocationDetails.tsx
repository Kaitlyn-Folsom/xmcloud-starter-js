'use client';

import { JSX, useState } from 'react';
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
import NextLink from 'next/link';
import { ComponentProps } from 'lib/component-props';

// context component: reads the fields of the Location Page it sits on (every center shares the template, so they can be bulk-updated)
interface LocationFields {
  CenterName?: Field<string>;
  Street?: Field<string>;
  City?: Field<string>;
  State?: Field<string>;
  Zip?: Field<string>;
  Phone?: Field<string>;
  StatusLabel?: Field<string>;
  WalkIn?: Field<boolean>;
  MedicalHours?: RichTextField;
  TherapyHours?: RichTextField;
  ContactInfo?: RichTextField;
  MapImage?: ImageField;
  DirectionsLink?: LinkField;
}

export type LocationDetailsProps = ComponentProps;

const Section = ({ title, field, open, onToggle }: { title: string; field?: RichTextField; open: boolean; onToggle: () => void }): JSX.Element => (
  <div className={`ld-acc ${open ? 'open' : ''}`}>
    <button type="button" className="ld-acc-head" onClick={onToggle} aria-expanded={open}>
      <span>{title}</span>
      <span className="ld-acc-icon" aria-hidden="true">
        {open ? '−' : '+'}
      </span>
    </button>
    {open && <RichText field={field} className="ld-acc-body" />}
  </div>
);

const render = (props: LocationDetailsProps, look: string): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const [open, setOpen] = useState(0);
  const f = (page.layout?.sitecore?.route?.fields ?? {}) as unknown as LocationFields;
  const id = props.params?.RenderingIdentifier;
  const walkIn = String(f.WalkIn?.value ?? '') === '1' || f.WalkIn?.value === true;

  return (
    <div className={`component location-details ${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        <NextLink href="/urgent-care-centers" className="ld-back">
          Back to Search
        </NextLink>
        <h1 className="ld-name">
          <Text field={f.CenterName} />
        </h1>
        <p className="ld-address">
          <Text field={f.Street} />
          <span className="ld-sep" />
          <Text field={f.City} />, <Text field={f.State} /> <Text field={f.Zip} />
        </p>
        <p className="ld-badges">
          {(isEditing || f.StatusLabel?.value) && (
            <span className="ld-badge">
              <Text field={f.StatusLabel} />
            </span>
          )}
          {walkIn && <span className="ld-badge">Walk-in clinic</span>}
        </p>
        <div className="ld-grid">
          <div className="ld-info">
            <Section title="Medical Center Hours" field={f.MedicalHours} open={isEditing || open === 0} onToggle={() => setOpen(open === 0 ? -1 : 0)} />
            <Section title="Physical Therapy Hours" field={f.TherapyHours} open={isEditing || open === 1} onToggle={() => setOpen(open === 1 ? -1 : 1)} />
            <Section title="Center Contact Info" field={f.ContactInfo} open={isEditing || open === 2} onToggle={() => setOpen(open === 2 ? -1 : 2)} />
          </div>
          <div className="ld-map">
            <NextImage field={f.MapImage} width={752} height={752} />
            {(isEditing || f.DirectionsLink?.value?.href) && <Link field={f.DirectionsLink ?? { value: {} }} className="ld-directions" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = (props: LocationDetailsProps): JSX.Element => render(props, '');
export const Concentra = (props: LocationDetailsProps): JSX.Element => render(props, 'cc-location');
