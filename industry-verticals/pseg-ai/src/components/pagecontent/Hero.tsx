'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Text,
  RichText,
  useSitecore,
  Link,
  LinkField,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

export type HeroProps = ComponentProps & {
  fields: Fields;
};

const HeroFallback = (): JSX.Element => (
  <div className="component hero">
    <div className="component-content">
      <span className="is-empty-hint">Hero</span>
    </div>
  </div>
);

const HeroCopy = ({
  fields,
  isPageEditing,
  linkClassName,
}: {
  fields: Fields;
  isPageEditing: boolean;
  linkClassName: string;
}): JSX.Element => {
  const { Title, Text: textField, Link: linkField } = fields || {};

  return (
    <>
      {(Title?.value || isPageEditing) && (
        <h1 className="hero-title">
          <Text field={Title} />
        </h1>
      )}
      {(textField?.value || isPageEditing) && (
        <div className="hero-text">
          <RichText field={textField} />
        </div>
      )}
      {(isPageEditing || linkField?.value?.href) && (
        <Link field={linkField} className={linkClassName} />
      )}
    </>
  );
};

export const Default = (props: HeroProps): JSX.Element => {
  const { fields, params } = props || {};
  const id = params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${params?.styles || ''}`;

  if (!fields) {
    return <HeroFallback />;
  }

  return (
    <section className={`component hero hero-default ${sxaStyles}`} id={id ? id : undefined}>
      <div className="hero-media">
        <NextImage field={fields.Image} className="hero-background" width={1920} height={560} />
      </div>
      <div className="hero-inner">
        <div className="hero-panel">
          <HeroCopy fields={fields} isPageEditing={isPageEditing} linkClassName="hero-cta" />
        </div>
      </div>
    </section>
  );
};

export const ImageNoBackground = (props: HeroProps): JSX.Element => {
  const { fields, params } = props || {};
  const id = params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${params?.styles || ''}`;

  if (!fields) {
    return <HeroFallback />;
  }

  const { Title, Text: textField, Image, Link: linkField } = fields;
  const hasLink = Boolean(linkField?.value?.href);

  return (
    <section
      className={`component hero hero-image-no-background ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="hero-copy">
        {(Title?.value || isPageEditing) && (
          <h1 className="hero-title">
            <Text field={Title} />
          </h1>
        )}
        {(textField?.value || isPageEditing) && (
          <div className="hero-text">
            <RichText field={textField} />
          </div>
        )}
        {(hasLink || isPageEditing) && <Link field={linkField} className="hero-cta" />}
      </div>
      <div className="hero-media">
        <NextImage field={Image} className="hero-image" width={960} height={480} />
      </div>
    </section>
  );
};
