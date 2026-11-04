'use client';

import { JSX } from 'react';
import { Field, Text, Link, LinkField, useSitecore } from '@sitecore-content-sdk/nextjs';
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
import Head from 'next/head';

interface Fields {
  Eyebrow: Field<string>;
  Heading: Field<string>;
  Text: Field<string>;
  Link: LinkField;
  Link2?: LinkField;
}

export type HeadingCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeadingCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component heading-cta ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="row gx-5">
          <div className="col">
            <div className="heading-content-wrapper">
              <h6 className="eyebrow-accent">
                <Text field={props.fields?.Eyebrow} />
              </h6>
              <h2 className="display-4 fw-bold">
                <Text field={props.fields?.Heading} />
              </h2>
              <p>
                <Text field={props.fields?.Text} />
              </p>
            </div>
          </div>
          <div className="col-12 pt-lg-5 col-lg-auto">
            {(isPageEditing || props.fields?.Link?.value?.href) && (
              <Link field={props.fields.Link} className="button button-main" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Compact = (props: HeadingCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component heading-cta compact ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="heading-content-wrapper">
              <h6 className="eyebrow-accent">
                <Text field={props.fields?.Eyebrow} />
              </h6>
              <h2 className="display-6 fw-bold">
                <Text field={props.fields?.Heading} />
              </h2>
              <p>
                <Text field={props.fields?.Text} />
              </p>
            </div>
            {(isPageEditing || props.fields?.Link?.value?.href) && (
              <Link field={props.fields.Link} className="button button-main" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageHeading = (props: HeadingCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <>
      <Head>
        <meta property="og:description" content={props.fields?.Text.value} />
        <meta property="og:name" content={props.fields?.Heading?.value} />
        <meta property="og:title" content={props.fields?.Heading?.value} />
        <meta property="og:type" content="page" />
      </Head>
      <div className={`component heading-cta ${sxaStyles}`} id={id ? id : undefined}>
        <div className="container container-wide">
          <div className="row gx-5">
            <div className="col">
              <div className="heading-content-wrapper">
                <h6 className="eyebrow-accent">
                  <Text field={props.fields?.Eyebrow} />
                </h6>
                <h1 className="display-1 fw-bold">
                  <Text field={props.fields?.Heading} />
                </h1>
                <p>
                  <Text field={props.fields?.Text} />
                </p>
              </div>
            </div>
            <div className="col-12 pt-lg-5 col-lg-auto">
              {(isPageEditing || props.fields?.Link?.value?.href) && (
                <Link field={props.fields.Link} className="button button-main" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Centered = (props: HeadingCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component heading-cta ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="heading-content-wrapper mx-auto text-center">
          <h6 className="eyebrow-accent">
            <Text field={props.fields?.Eyebrow} />
          </h6>
          <h2 className="display-4 fw-bold">
            <Text field={props.fields?.Heading} />
          </h2>
          <p>
            <Text field={props.fields?.Text} />
          </p>
          {(isPageEditing || props.fields?.Link?.value?.href) && (
            <Link field={props.fields.Link} className="button button-main" />
          )}
        </div>
      </div>
    </div>
  );
};

// ---- Concentra variants (client look; extra fields from the derived template, R22) ----

const ConcentraHeading = (props: HeadingCtaProps, look: 'band' | 'title'): JSX.Element => {
  const { page } = useCcSitecore();
  const isEditing = page.mode.isEditing;
  const f = props.fields;
  const id = props.params?.RenderingIdentifier;
  if (!f) return <div className="component heading-cta is-empty-hint">Heading CTA</div>;
  if (look === 'title') {
    return (
      <div className={`component heading-cta cc-page-title ${props.params?.styles || ''}`} id={id || undefined}>
        <div className="container">
          {(isEditing || f.Eyebrow?.value) && (
            <p className="cc-intro">
              <CcText field={f.Eyebrow} />
            </p>
          )}
          <h1 className="cc-headline">
            <CcText field={f.Heading} />
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className={`component heading-cta cc-navy-band cc-heading-band ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        <h2 className="cc-band-heading">
          <CcText field={f.Heading} />
        </h2>
        <p className="cc-band-text">
          <CcText field={f.Text} />
        </p>
        <div className="cc-block-buttons">
          {(isEditing || f.Link?.value?.href) && <CcLink field={f.Link} className="cc-button-block" />}
          {(isEditing || f.Link2?.value?.href) && <CcLink field={f.Link2 ?? { value: {} }} className="cc-button-block" />}
        </div>
      </div>
    </div>
  );
};

export const Concentra = (props: HeadingCtaProps): JSX.Element => ConcentraHeading(props, 'band');
export const ConcentraNavyBand = (props: HeadingCtaProps): JSX.Element => ConcentraHeading(props, 'band');
export const ConcentraPageTitle = (props: HeadingCtaProps): JSX.Element => ConcentraHeading(props, 'title');
