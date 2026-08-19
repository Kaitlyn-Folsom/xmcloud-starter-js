'use client';

import type { JSX, ReactNode } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';

type LinkFieldValue = {
  href?: string;
  url?: string;
  target?: string;
};

type JsonLinkField = LinkField & { jsonValue?: { value?: LinkFieldValue } };

const getLinkValue = (link?: LinkField): LinkFieldValue => {
  if (!link) {
    return {};
  }

  const withJson = link as JsonLinkField;
  return (link.value ?? withJson.jsonValue?.value ?? {}) as LinkFieldValue;
};

const getLinkHref = (link?: LinkField): string => {
  const value = getLinkValue(link);
  return (value.href || value.url || '').trim();
};

const CardLink = ({
  link,
  isPageEditing,
  children,
}: {
  link: LinkField;
  isPageEditing: boolean;
  children: ReactNode;
}): JSX.Element => {
  if (isPageEditing) {
    return <Link field={link}>{children}</Link>;
  }

  const href = getLinkHref(link);
  const target = getLinkValue(link).target;

  if (!href) {
    return <>{children}</>;
  }

  return (
    <a
      href={href}
      target={target || undefined}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className="wrapper-link"
    >
      {children}
    </a>
  );
};

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
        <CardLink link={link} isPageEditing={isPageEditing}>
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
        </CardLink>
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

export const Pseg = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Shortcut = ({
    image,
    title,
    link,
  }: {
    image: ImageField;
    title: Field<string>;
    link: LinkField;
  }) => (
    <div className="pseg-shortcut">
      <CardLink link={link} isPageEditing={isPageEditing}>
        <div className="content-wrapper">
          <NextImage field={image} width={48} height={48} />
          <h2>
            <Text field={title} />
          </h2>
        </div>
      </CardLink>
    </div>
  );

  return (
    <div
      className={`component four-column-cta pseg-shortcuts ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className={`pseg-shortcuts-row${isPageEditing ? ' is-editing' : ''}`}>
        <Shortcut image={props.fields.Image1} title={props.fields.Title1} link={props.fields.Link1} />
        <Shortcut image={props.fields.Image2} title={props.fields.Title2} link={props.fields.Link2} />
        <Shortcut image={props.fields.Image3} title={props.fields.Title3} link={props.fields.Link3} />
        <Shortcut image={props.fields.Image4} title={props.fields.Title4} link={props.fields.Link4} />
      </div>
    </div>
  );
};
