'use client';

import { JSX } from 'react';
import { Field, ImageField, LinkField, NextImage, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';

interface PersonFields {
  Name?: Field<string>;
  Role?: Field<string>;
  Office?: Field<string>;
  Email?: LinkField;
  Photo?: ImageField;
  LinkedIn?: LinkField;
  Biography?: Field<string>;
}

interface SectionFields {
  Heading?: Field<string>;
  Text?: Field<string>;
}

export type PersonProfileProps = {
  params: { [key: string]: string };
  fields?: PersonFields & { items?: { fields?: SectionFields; displayName?: string }[] };
};

const Profile = (props: PersonProfileProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields;
  const id = props.params?.RenderingIdentifier;

  return (
    <article className={`component person-profile variant-dentons ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="dentons-person">
        <div className="dentons-person-head">
          {(fields?.Photo?.value?.src || isEditing) && fields?.Photo && (
            <NextImage field={fields.Photo} width={151} height={181} className="dentons-person-photo" />
          )}
          <div>
            {(fields?.Name?.value || isEditing) && <Text tag="h1" field={fields?.Name} />}
            {(fields?.Role?.value || isEditing) && <Text tag="p" className="dentons-person-role" field={fields?.Role} />}
            {(fields?.Office?.value || isEditing) && <Text tag="p" field={fields?.Office} />}
          </div>
        </div>
        {(fields?.Biography?.value || isEditing) && <RichText className="dentons-article-body" field={fields?.Biography} />}
        <div>
          {(fields?.items ?? []).map((item, index) => (
            <section key={item.displayName || index}>
              {(item.fields?.Heading?.value || isEditing) && <Text tag="h2" field={item.fields?.Heading} />}
              {(item.fields?.Text?.value || isEditing) && <RichText field={item.fields?.Text} />}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
};

export const Default = Profile;
export const Dentons = Profile;
