'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
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
  Body1?: CcRichTextField;
  Body2?: CcRichTextField;
  NewsImage1?: CcImageField;
  NewsLink1?: CcLinkField;
  NewsImage2?: CcImageField;
  NewsLink2?: CcLinkField;
}

export type TwoColumnCtaProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: TwoColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    title,
    text,
    link,
    placeholder,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    placeholder: string;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    const buttonStyle = props.params?.ButtonStyle
      ? `button-${props.params.ButtonStyle.toLowerCase()}`
      : 'button-main';

    return (
      <div
        className={`col-sm-12 col-lg-6 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        }`}
        ref={domRef}
      >
        <div className="content-wrapper">
          <NextImage field={image} width={800} height={800} />
          {(isPageEditing || title?.value) && (
            <h2>
              <Text field={title} />
            </h2>
          )}
          {(isPageEditing || text?.value) && (
            <p>
              <Text field={text} />
            </p>
          )}
          {(isPageEditing || link?.value?.href) && (
            <Link field={link} className={`button ${buttonStyle}`} />
          )}
          <Placeholder name={placeholder} rendering={props.rendering} />
        </div>
      </div>
    );
  };

  return (
    <div className={`component two-column-cta pb-5 ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
            placeholder="two-col-placeholder-left"
            delay={0}
          />
          <Column
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            placeholder="two-col-placeholder-right"
            delay={500}
          />
        </div>
      </div>
    </div>
  );
};

// ---- Concentra variants (client look; extra fields from the derived template, R22) ----

const ConcentraCards = (props: TwoColumnCtaProps, look: 'resource' | 'feature'): JSX.Element => {
  const { page } = useCcSitecore();
  const isEditing = page.mode.isEditing;
  const f = props.fields;
  const id = props.params?.RenderingIdentifier;
  if (!f) return <div className="component two-column-cta is-empty-hint">Two column CTA</div>;
  const cards = [
    { image: f.Image1, title: f.Title1, text: f.Text1, body: f.Body1, link: f.Link1, news: [] as { image?: CcImageField; link?: CcLinkField }[] },
    { image: f.Image2, title: f.Title2, text: f.Text2, body: f.Body2, link: f.Link2, news: [{ image: f.NewsImage1, link: f.NewsLink1 }, { image: f.NewsImage2, link: f.NewsLink2 }] },
  ];
  return (
    <div className={`component two-column-cta cc-cards cc-cards-${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container cc-cards-grid">
        {cards.map((c, i) => (
          <div key={i} className="cc-card">
            <div className="cc-card-img">
              <CcImage field={c.image} width={680} height={290} />
            </div>
            <div className="cc-card-body">
              <h3 className="cc-card-title">
                <CcText field={c.title} />
              </h3>
              {(isEditing || c.text?.value) && (
                <p className="cc-card-text">
                  <CcText field={c.text} />
                </p>
              )}
              {(isEditing || c.body?.value) && <CcRichText field={c.body} className="cc-card-rich cc-cross-list" />}
              {c.news.filter((n) => isEditing || n.link?.value?.href).map((n, k) => (
                <div key={k} className="cc-news-row">
                  <span className="cc-news-thumb">
                    <CcImage field={n.image} width={62} height={62} />
                  </span>
                  <CcLink field={n.link ?? { value: {} }} className="cc-news-link" />
                </div>
              ))}
              {(isEditing || c.link?.value?.href) && (
                <div className={`cc-card-more ${look === 'feature' ? 'right' : ''}`}>
                  <CcLink field={c.link} className="cc-text-link" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Concentra = (props: TwoColumnCtaProps): JSX.Element => ConcentraCards(props, 'resource');
export const ConcentraResourceCards = (props: TwoColumnCtaProps): JSX.Element => ConcentraCards(props, 'resource');
export const ConcentraFeatureCards = (props: TwoColumnCtaProps): JSX.Element => ConcentraCards(props, 'feature');
