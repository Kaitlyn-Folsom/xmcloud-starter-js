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
import { ComponentProps } from 'lib/component-props';
import { IconAccent } from 'components/non-sitecore/IconAccent';
import { DottedAccent } from 'components/non-sitecore/DottedAccent';

interface Fields {
  Tagline: Field<string>;
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Cta1: LinkField;
  Cta2: LinkField;
  Icon: ImageField;
}

export type HeroBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeroBannerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component hero-banner ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container container-wide">
        <div className="hero-row">
          <div className="content-column">
            <h6 className="eyebrow-accent">
              <Text field={props.fields.Tagline} />
            </h6>
            <h1 className="display-2 fw-bold">
              <Text field={props.fields.Title} />
            </h1>

            <div className="rich-content mb-4">
              <RichText field={props.fields.Text} />
            </div>
            <div className="btn-array pt-3 pb-4">
              {(isPageEditing || props.fields?.Cta1?.value?.href) && (
                <Link field={props.fields.Cta1} className="button button-main" />
              )}
              {(isPageEditing || props.fields?.Cta2?.value?.href) && (
                <Link field={props.fields.Cta2} className="button button-simple mx-4" />
              )}
            </div>
            <div className="row mt-2">
              <Placeholder name="hero-banner" rendering={props.rendering} />
            </div>
            <IconAccent image={props.fields.Icon} />
          </div>
          <div className="img-column">
            <div className="img-wrapper">
              <DottedAccent className="dotted-accent-top" />
              <NextImage
                field={props.fields.Image}
                className="img-fluid"
                width={700}
                height={700}
              />
              <DottedAccent className="dotted-accent-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Concentra variants (client look; extra fields from the derived template, R22) ----

const ConcentraHero = (props: HeroBannerProps, look: 'panel' | 'mini' | 'light'): JSX.Element => {
  const { page } = useCcSitecore();
  const isEditing = page.mode.isEditing;
  const f = props.fields;
  const id = props.params?.RenderingIdentifier;
  if (!f) return <div className="component hero-banner cc-hero is-empty-hint">Hero banner</div>;
  const hasIcon = !!f.Icon?.value?.src;
  return (
    <div className={`component hero-banner cc-hero cc-hero-${look} ${hasIcon ? 'has-icon' : ''} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="cc-hero-inner">
        <CcImage field={f.Image} className="cc-hero-bg" width={1600} height={700} priority />
        <div className="cc-hero-copy">
          {(isEditing || f.Tagline?.value) && (
            <p className="cc-intro">
              <CcText field={f.Tagline} />
            </p>
          )}
          <h1 className="cc-headline">
            <CcText field={f.Title} />
          </h1>
          {look === 'light' && (isEditing || f.Cta1?.value?.href) && <CcLink field={f.Cta1} className="cc-text-link" />}
        </div>
        {look === 'panel' && (
          <div className="cc-hero-panel">
            {(isEditing || hasIcon) && <CcImage field={f.Icon} className="cc-hero-icon" width={44} height={44} />}
            <div className="cc-hero-panel-text">
              <CcRichText field={f.Text} />
            </div>
            {(isEditing || f.Cta1?.value?.href) && <CcLink field={f.Cta1} className={`cc-pill ${hasIcon ? 'cc-pill-white' : 'cc-pill-green'}`} />}
          </div>
        )}
      </div>
    </div>
  );
};

export const Concentra = (props: HeroBannerProps): JSX.Element => ConcentraHero(props, 'panel');
export const ConcentraPanelRight = (props: HeroBannerProps): JSX.Element => ConcentraHero(props, 'panel');
export const ConcentraMiniHero = (props: HeroBannerProps): JSX.Element => ConcentraHero(props, 'mini');
export const ConcentraLightOverlay = (props: HeroBannerProps): JSX.Element => ConcentraHero(props, 'light');
