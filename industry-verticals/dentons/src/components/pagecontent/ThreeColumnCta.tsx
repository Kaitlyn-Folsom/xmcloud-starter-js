'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  Text,
  LinkField,
  Link,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Eyebrow1?: Field<string>;
  Text1: Field<string>;
  SubText1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Eyebrow2?: Field<string>;
  Text2: Field<string>;
  SubText2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Eyebrow3?: Field<string>;
  Text3: Field<string>;
  SubText3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
}

export type ThreeColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    eyebrow,
    image,
    text,
    subText,
    link,
    delay,
  }: {
    eyebrow?: Field<string>;
    image: ImageField;
    text: Field<string>;
    subText: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);

    return (
      <div
        className={`col-sm-12 col-lg-4 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        } `}
        ref={domRef}
      >
        <div className="content-wrapper">
          <NextImage field={image} width={400} height={400} />
          {(isPageEditing || eyebrow?.value) && (
            <p className="card-kicker">
              <Text field={eyebrow} />
            </p>
          )}
          <h2>
            <Text field={text} />
          </h2>
          <p>
            <Text field={subText} />
          </p>
          {(isPageEditing || link?.value?.href) && (
            <Link field={link} className="button button-pill" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced three-column-cta ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row">
          <Column
            eyebrow={props.fields.Eyebrow1}
            image={props.fields.Image1}
            text={props.fields.Text1}
            subText={props.fields.SubText1}
            link={props.fields.Link1}
          />
          <Column
            eyebrow={props.fields.Eyebrow2}
            image={props.fields.Image2}
            text={props.fields.Text2}
            subText={props.fields.SubText2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            eyebrow={props.fields.Eyebrow3}
            image={props.fields.Image3}
            text={props.fields.Text3}
            subText={props.fields.SubText3}
            link={props.fields.Link3}
            delay={1000}
          />
        </div>
      </div>
    </div>
  );
};

export const WithIcons = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    eyebrow,
    image,
    text,
    subText,
    link,
    delay,
  }: {
    eyebrow?: Field<string>;
    image: ImageField;
    text: Field<string>;
    subText: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col-sm-12 col-lg-4 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        } `}
        ref={domRef}
      >
        <Link field={link} className="wrapper-link">
          <div className="content-wrapper">
            <div className="image-wrapper mb-5">
              <NextImage field={image} width={32} height={32} />
            </div>
            {(isPageEditing || eyebrow?.value) && (
              <p className="card-kicker">
                <Text field={eyebrow} />
              </p>
            )}
            <h2>
              <Text field={text} />
            </h2>
            <p>
              <Text field={subText} />
            </p>
            {(isPageEditing || link?.value?.href) && (
              <span className="button button-pill">{link?.value?.text || 'Read more'}</span>
            )}
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced three-column-cta with-icons ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row gx-0">
          <Column
            eyebrow={props.fields.Eyebrow1}
            image={props.fields.Image1}
            text={props.fields.Text1}
            subText={props.fields.SubText1}
            link={props.fields.Link1}
          />
          <Column
            eyebrow={props.fields.Eyebrow2}
            image={props.fields.Image2}
            text={props.fields.Text2}
            subText={props.fields.SubText2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            eyebrow={props.fields.Eyebrow3}
            image={props.fields.Image3}
            text={props.fields.Text3}
            subText={props.fields.SubText3}
            link={props.fields.Link3}
            delay={1000}
          />
        </div>
      </div>
    </div>
  );
};

export const WithIconsCompact = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    eyebrow,
    image,
    text,
    subText,
    link,
    delay,
  }: {
    eyebrow?: Field<string>;
    image: ImageField;
    text: Field<string>;
    subText: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col-sm-12 col-lg-4 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        } `}
        ref={domRef}
      >
        <Link field={link} className="wrapper-link">
          <div className="content-wrapper">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="image-wrapper">
                <NextImage field={image} width={32} height={32} />
              </div>
              <div>
                {(isPageEditing || eyebrow?.value) && (
                  <p className="card-kicker">
                    <Text field={eyebrow} />
                  </p>
                )}
                <h2 className="eyebrow-accent mb-0 mt-2">
                  <Text field={text} />
                </h2>
              </div>
            </div>
            <p>
              <Text field={subText} />
            </p>
            {(isPageEditing || link?.value?.href) && (
              <span className="button button-pill">{link?.value?.text || 'Read more'}</span>
            )}
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced three-column-cta with-icons with-icons-compact ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row gx-0">
          <Column
            eyebrow={props.fields.Eyebrow1}
            image={props.fields.Image1}
            text={props.fields.Text1}
            subText={props.fields.SubText1}
            link={props.fields.Link1}
          />
          <Column
            eyebrow={props.fields.Eyebrow2}
            image={props.fields.Image2}
            text={props.fields.Text2}
            subText={props.fields.SubText2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            eyebrow={props.fields.Eyebrow3}
            image={props.fields.Image3}
            text={props.fields.Text3}
            subText={props.fields.SubText3}
            link={props.fields.Link3}
            delay={1000}
          />
        </div>
      </div>
    </div>
  );
};

const DentonsCard = ({
  image,
  eyebrow,
  title,
  text,
  link,
  isPageEditing,
}: {
  image: ImageField;
  eyebrow?: Field<string>;
  title: Field<string>;
  text: Field<string>;
  link: LinkField;
  isPageEditing: boolean;
}) => (
  <div className="col-md-4">
    <article className="card">
      {(isPageEditing || image?.value?.src) && (
        <NextImage field={image} width={480} height={270} />
      )}
      {(isPageEditing || eyebrow?.value) && (
        <p className="card-kicker">
          <Text field={eyebrow} />
        </p>
      )}
      <h3>
        <Text field={title} />
      </h3>
      {(isPageEditing || text?.value) && (
        <p className="card-summary">
          <Text field={text} />
        </p>
      )}
      {(isPageEditing || link?.value?.href) && (
        <Link field={link} className="button button-pill" />
      )}
    </article>
  </div>
);

const dentonsRow = (props: ThreeColumnCtaProps, variantClass: string): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  return (
    <div
      className={`component three-column-cta ${variantClass} ${props.params?.styles || ''}`}
      id={props.params.RenderingIdentifier || undefined}
    >
      <div className="container">
        <div className="row g-4">
          <DentonsCard image={props.fields.Image1} eyebrow={props.fields.Eyebrow1} title={props.fields.Text1} text={props.fields.SubText1} link={props.fields.Link1} isPageEditing={isPageEditing} />
          <DentonsCard image={props.fields.Image2} eyebrow={props.fields.Eyebrow2} title={props.fields.Text2} text={props.fields.SubText2} link={props.fields.Link2} isPageEditing={isPageEditing} />
          <DentonsCard image={props.fields.Image3} eyebrow={props.fields.Eyebrow3} title={props.fields.Text3} text={props.fields.SubText3} link={props.fields.Link3} isPageEditing={isPageEditing} />
        </div>
      </div>
    </div>
  );
};

/* Dentons variant: image, eyebrow, heading, text, purple pill */
export const Dentons = (props: ThreeColumnCtaProps): JSX.Element =>
  dentonsRow(props, 'variant-dentons');

/* DentonsCardRow: the second homepage card row */
export const DentonsCardRow = (props: ThreeColumnCtaProps): JSX.Element =>
  dentonsRow(props, 'variant-dentons-card-row');

/* DentonsNews: news cards with a purple pill */
export const DentonsNews = (props: ThreeColumnCtaProps): JSX.Element =>
  dentonsRow(props, 'variant-dentons-news');

/* DentonsNewsRow: the second news row */
export const DentonsNewsRow = (props: ThreeColumnCtaProps): JSX.Element =>
  dentonsRow(props, 'variant-dentons-news-row');
