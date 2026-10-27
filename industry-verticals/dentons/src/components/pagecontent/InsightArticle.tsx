'use client';

import { JSX } from 'react';
import { Field, ImageField, LinkField, NextImage, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';

interface InsightArticleFields {
  Title?: Field<string>;
  Text?: Field<string>;
  Image?: ImageField;
  Lawyer?: LinkField;
}

export type InsightArticleProps = {
  params: { [key: string]: string };
  fields?: InsightArticleFields;
};

const Article = (props: InsightArticleProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields;
  const id = props.params?.RenderingIdentifier;

  return (
    <article className={`component insight-article ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        {(fields?.Title?.value || isEditing) && <Text tag="h1" field={fields?.Title} />}
        {(fields?.Image?.value?.src || isEditing) && fields?.Image && <NextImage field={fields.Image} />}
        {(fields?.Text?.value || isEditing) && <RichText field={fields?.Text} />}
      </div>
    </article>
  );
};

export const Default = Article;
export const Dentons = Article;
