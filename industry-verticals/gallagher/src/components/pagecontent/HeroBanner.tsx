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
  Placeholder,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Tagline?: Field<string>;
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Cta1: LinkField;
  Cta2: LinkField;
  Icon?: ImageField;
}

export type HeroBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

type GallagherHeroVariant = 'default' | 'blue';

const TITLE_ACCENT = 'Trusted Partner';

const renderGallagherTitle = (field: Field<string> | undefined, isPageEditing: boolean) => {
  const value = field?.value || '';
  const idx = value.indexOf(TITLE_ACCENT);

  if (isPageEditing || idx < 0) {
    return <Text field={field} />;
  }

  return (
    <>
      {value.slice(0, idx)}
      <span className="hero-accent">{TITLE_ACCENT}</span>
      {value.slice(idx + TITLE_ACCENT.length)}
    </>
  );
};

const GallagherHero = ({
  props,
  variant,
}: {
  props: HeroBannerProps;
  variant: GallagherHeroVariant;
}): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { Title, Text: body, Image, Cta1, Cta2 } = props.fields || {};
  const variantClass = variant === 'blue' ? 'hero-banner-blue' : 'hero-banner-white';

  return (
    <div
      className={`component hero-banner gallagher ${variantClass} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container container-wide">
        <div className="hero-row">
          <div className="content-column">
            {(isPageEditing || Title?.value) && (
              <h1>{renderGallagherTitle(Title, isPageEditing)}</h1>
            )}
            {(isPageEditing || body?.value) && (
              <div className="rich-content">
                <RichText field={body} />
              </div>
            )}
            <div className="hero-ctas">
              {(isPageEditing || Cta1?.value?.href) && (
                <Link field={Cta1} className="hero-cta hero-cta-outline" />
              )}
              {(isPageEditing || Cta2?.value?.href) && (
                <Link field={Cta2} className="hero-cta hero-cta-solid" />
              )}
            </div>
            <Placeholder name="hero-banner" rendering={props.rendering} />
          </div>
          {(isPageEditing || Image?.value?.src) && (
            <div className="img-column">
              <div className="img-wrapper">
                <NextImage field={Image} className="img-fluid" width={700} height={700} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Default = (props: HeroBannerProps): JSX.Element => (
  <GallagherHero props={props} variant="default" />
);

export const Blue = (props: HeroBannerProps): JSX.Element => (
  <GallagherHero props={props} variant="blue" />
);

export const Gallagher = Blue;
