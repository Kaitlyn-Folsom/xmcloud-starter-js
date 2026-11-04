'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
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
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Title1: Field<string>;
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Title2: Field<string>;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Title3: Field<string>;
  Text3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Title4: Field<string>;
  Text4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
  Heading?: CcField<string>;
}

export type FourColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    title,
    text,
    link,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col-sm-12 col-lg-3 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        }`}
        ref={domRef}
      >
        <Link field={link}>
          <div className="content-wrapper">
            <NextImage field={image} width={300} height={300} />
            <div className="text-wrapper">
              <h2>
                <Text field={title} />
              </h2>
              <p>
                <Text field={text} />
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced four-column-cta ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
          />
          <Column
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            title={props.fields.Title3}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={1000}
          />
          <Column
            image={props.fields.Image4}
            title={props.fields.Title4}
            text={props.fields.Text4}
            link={props.fields.Link4}
            delay={1500}
          />
        </div>
      </div>
    </div>
  );
};

// ---- Concentra variants (client look; extra fields from the derived template, R22) ----

const ConcentraFour = (props: FourColumnCtaProps, look: 'round' | 'teal' | 'tiles'): JSX.Element => {
  const { page } = useCcSitecore();
  const isEditing = page.mode.isEditing;
  const f = props.fields;
  const id = props.params?.RenderingIdentifier;
  if (!f) return <div className="component four-column-cta is-empty-hint">Four column CTA</div>;
  const items = [1, 2, 3, 4].map((n) => ({
    title: f[`Title${n}` as keyof typeof f] as CcField<string>,
    text: f[`Text${n}` as keyof typeof f] as CcField<string>,
    image: f[`Image${n}` as keyof typeof f] as CcImageField,
    link: f[`Link${n}` as keyof typeof f] as CcLinkField,
  }));
  return (
    <div className={`component four-column-cta cc-four cc-four-${look} ${look === 'round' ? 'cc-navy-band' : ''} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        {(isEditing || f.Heading?.value) && (
          <h2 className="cc-four-heading">
            <CcText field={f.Heading} />
          </h2>
        )}
        <div className="cc-four-grid">
          {items.map((it, i) =>
            look === 'tiles' ? (
              <CcLink key={i} field={it.link ?? { value: {} }} className="cc-tile" editable={false}>
                <CcImage field={it.image} width={320} height={320} />
                <span className="cc-tile-label">
                  <CcText field={it.title} />
                </span>
              </CcLink>
            ) : (
              <div key={i} className="cc-four-item">
                {look === 'round' && (
                  <span className="cc-round">
                    <CcImage field={it.image} width={220} height={220} />
                  </span>
                )}
                {isEditing || !it.link?.value?.href ? (
                  <h3 className="cc-four-title">
                    <CcText field={it.title} />
                  </h3>
                ) : (
                  // live site: the card title is itself a link to the service page
                  <p className="cc-four-title">
                    <CcLink field={it.link} editable={false}>
                      <CcText field={it.title} editable={false} />
                    </CcLink>
                  </p>
                )}
                <p className="cc-four-text">
                  <CcText field={it.text} />
                </p>
                {(isEditing || it.link?.value?.href) && (
                  <CcLink field={it.link} className={`cc-pill ${look === 'teal' ? 'cc-pill-white' : 'cc-pill-outline-white'}`} />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const Concentra = (props: FourColumnCtaProps): JSX.Element => ConcentraFour(props, 'round');
export const ConcentraRoundPhotos = (props: FourColumnCtaProps): JSX.Element => ConcentraFour(props, 'round');
export const ConcentraTealText = (props: FourColumnCtaProps): JSX.Element => ConcentraFour(props, 'teal');
export const ConcentraTiles = (props: FourColumnCtaProps): JSX.Element => ConcentraFour(props, 'tiles');
