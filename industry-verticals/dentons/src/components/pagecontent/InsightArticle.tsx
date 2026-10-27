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
    <article className={`component insight-article variant-dentons ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="dentons-article">
        {(fields?.Title?.value || isEditing) && <Text tag="h1" field={fields?.Title} />}
        {(fields?.Image?.value?.src || isEditing) && fields?.Image && (
          <NextImage field={fields.Image} width={960} height={540} className="dentons-article-image" />
        )}
        {(fields?.Text?.value || isEditing) && <RichText className="dentons-article-body" field={fields?.Text} />}
      </div>
    </article>
  );
};

export const Default = Article;
export const Dentons = Article;
