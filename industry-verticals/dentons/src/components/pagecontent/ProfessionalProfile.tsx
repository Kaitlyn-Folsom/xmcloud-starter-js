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
import { ComponentProps } from 'lib/component-props';

type ProfileFields = {
  Name?: Field<string>;
  Role?: Field<string>;
  Office?: Field<string>;
  Photo?: ImageField;
  Email?: LinkField;
  Phone?: Field<string>;
  Bio?: RichTextField;
  Experience?: RichTextField;
  Recognition?: RichTextField;
  Activities?: RichTextField;
  Education?: RichTextField;
  Languages?: Field<string>;
};

export type ProfessionalProfileProps = ComponentProps & { fields?: ProfileFields };

const TABS = [
  { id: 'about', label: 'About', field: 'Bio' },
  { id: 'experience', label: 'Experience', field: 'Experience' },
  { id: 'recognition', label: 'Recognition', field: 'Recognition' },
  { id: 'activities', label: 'Activities and Affiliations', field: 'Activities' },
] as const;

const ProfessionalProfileEmpty = (): JSX.Element => (
  <div className="component professional-profile">
    <div className="component-content">
      <span className="is-empty-hint">ProfessionalProfile</span>
    </div>
  </div>
);

export const Default = ({ params }: ProfessionalProfileProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const fields = (page?.layout?.sitecore?.route?.fields || {}) as ProfileFields;
  const recognitionHeading = fields.Recognition?.value?.match(/<h2>([^<]+)<\/h2>/i)?.[1]?.trim();
  const tabs = TABS.map((item) =>
    item.id === 'recognition' && recognitionHeading ? { ...item, label: recognitionHeading } : item
  ).filter((item) => isPageEditing || fields[item.field]?.value);
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('about');
  if (!fields.Name && !isPageEditing) return <ProfessionalProfileEmpty />;

  const active = tabs.find((item) => item.id === tab) || tabs[0];
  const activeField = active ? fields[active.field] : undefined;

  return (
    <div
      className={`component professional-profile ${params?.styles || ''}`}
      id={params?.RenderingIdentifier || undefined}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            {(isPageEditing || fields.Photo?.value?.src) && (
              <NextImage field={fields.Photo} width={151} height={181} />
            )}
            {(isPageEditing || fields.Email?.value?.href) && (
              <Link field={fields.Email} className="button button-main" />
            )}
            {(isPageEditing || fields.Phone?.value) && <Text tag="p" field={fields.Phone} />}
            {(isPageEditing || fields.Education?.value) && <RichText field={fields.Education} />}
            {(isPageEditing || fields.Languages?.value) && (
              <>
                <h2>Languages</h2>
                <Text tag="p" field={fields.Languages} />
              </>
            )}
          </div>
          <div className="col-md-8">
            <h1>
              <Text field={fields.Name} />
            </h1>
            {(isPageEditing || fields.Role?.value) && <Text tag="p" className="role" field={fields.Role} />}
            {(isPageEditing || fields.Office?.value) && <Text tag="p" field={fields.Office} />}
            <div className="tabs" role="tablist">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div role="tabpanel">
              {(isPageEditing || activeField?.value) && <RichText field={activeField} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Dentons = (props: ProfessionalProfileProps): JSX.Element => <Default {...props} />;
