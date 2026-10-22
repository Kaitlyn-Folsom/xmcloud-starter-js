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
import { ChevronLeft, ChevronRight, Pause } from 'lucide-react';
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

const HERO_ACCENT = 'Dentons is here to help';

const splitHeroTitle = (value: string): { lead: string; accent: string } | null => {
  const index = value.indexOf(HERO_ACCENT);
  if (index <= 0) return null;
  const lead = value.slice(0, index).trim();
  if (!lead) return null;
  return { lead, accent: value.slice(index).trim() };
};

/* Dentons variant: photo hero with an eyebrow, a two-line headline, a white pill and slide controls */
export const Dentons = (props: HeroBannerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const titleText = props.fields?.Title?.value ?? '';
  const splitTitle = isPageEditing ? null : splitHeroTitle(titleText);

  return (
    <div className={`component hero-banner variant-dentons ${sxaStyles}`} id={id ? id : undefined}>
      <div className="hero-media">
        {(isPageEditing || props.fields?.Image?.value?.src) && (
          <NextImage field={props.fields.Image} className="hero-photo" width={1440} height={560} />
        )}
        <div className="hero-copy">
          {(isPageEditing || props.fields?.Tagline?.value) && (
            <p className="hero-kicker">
              <Text field={props.fields.Tagline} />
            </p>
          )}
          <h1>
            {splitTitle ? (
              <>
                <span className="hero-line">{splitTitle.lead}</span>
                <span className="hero-line is-strong">{splitTitle.accent}</span>
              </>
            ) : (
              <Text field={props.fields.Title} />
            )}
          </h1>
          {(isPageEditing || props.fields?.Cta1?.value?.href) && (
            <Link field={props.fields.Cta1} className="button button-pill" />
          )}
        </div>
        <div className="hero-controls" aria-hidden="true">
          <span className="hero-control">
            <ChevronLeft size={16} strokeWidth={1.75} />
          </span>
          <span className="hero-control">
            <Pause size={14} strokeWidth={1.75} />
          </span>
          <span className="hero-control">
            <ChevronRight size={16} strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </div>
  );
};
