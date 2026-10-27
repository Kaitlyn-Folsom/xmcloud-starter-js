'use client';

import { JSX } from 'react';
import {
  ComponentRendering,
  DateField,
  Field,
  ImageField,
  NextImage,
  Placeholder,
  RichText,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

type AuthorValue = {
  id?: string;
  url?: string;
  name?: string;
  displayName?: string;
  fields?: {
    Name?: Field<string>;
    Title?: Field<string>;
    NavigationTitle?: Field<string>;
    Role?: Field<string>;
    Photo?: ImageField;
  };
};

interface ArticleFields {
  Title?: Field<string>;
  Excerpt?: Field<string>;
  Content?: RichTextField;
  Thumbnail?: ImageField;
  PublicationDate?: Field<string>;
  Author?: Field<AuthorValue | string> | AuthorValue;
}

export type InsightArticleProps = {
  params: { [key: string]: string };
  fields?: ArticleFields;
  rendering?: ComponentRendering;
};

const authorValue = (field?: ArticleFields['Author']): AuthorValue | undefined => {
  if (!field) return undefined;
  if ('value' in field) {
    const value = field.value;
    if (!value || typeof value === 'string') return undefined;
    return value;
  }
  return field;
};

const authorName = (author?: AuthorValue): string =>
  author?.fields?.Name?.value || author?.fields?.Title?.value || author?.fields?.NavigationTitle?.value || author?.displayName || author?.name || '';

const parseDate = (value?: string | Date | null): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const compact = /^(\d{4})(\d{2})(\d{2})T/.exec(value);
  const date = compact ? new Date(Date.UTC(Number(compact[1]), Number(compact[2]) - 1, Number(compact[3]))) : new Date(value);
  return Number.isNaN(date.getTime()) || date.getUTCFullYear() <= 1 ? null : date;
};

const formattedDate = (value?: string | Date | null): string => {
  const date = parseDate(value);
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
};

const Article = (props: InsightArticleProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields;
  const id = props.params?.RenderingIdentifier;
  const author = authorValue(fields?.Author);
  const name = authorName(author);
  const role = author?.fields?.Role?.value || '';
  const photo = author?.fields?.Photo;
  const dateValue = fields?.PublicationDate?.value || '';
  const hasDate = Boolean(dateValue) && !dateValue.startsWith('0001-01-01');

  return (
    <article className={`component insight-article variant-dentons ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="dentons-article">
        {(hasDate || isEditing) && fields?.PublicationDate && (
          <DateField
            tag="p"
            className="dentons-article-date"
            field={fields.PublicationDate}
            render={(date) => formattedDate(date) || formattedDate(dateValue)}
          />
        )}
        {(fields?.Title?.value || isEditing) && <Text tag="h1" field={fields?.Title} />}
        {(fields?.Excerpt?.value || isEditing) && <Text tag="p" className="dentons-article-excerpt" field={fields?.Excerpt} />}
        {(name || role || photo?.value?.src) && (
          <div className="dentons-article-author">
            {photo?.value?.src && (
              <NextImage field={photo} width={151} height={181} className="dentons-article-author-photo" />
            )}
            <div>
              {name &&
                (author?.url ? (
                  <a className="dentons-article-author-name" href={author.url}>
                    {name}
                  </a>
                ) : (
                  <p className="dentons-article-author-name">{name}</p>
                ))}
              {role && <p className="dentons-article-author-role">{role}</p>}
            </div>
          </div>
        )}
        {(fields?.Thumbnail?.value?.src || isEditing) && fields?.Thumbnail && (
          <NextImage field={fields.Thumbnail} width={960} height={540} className="dentons-article-image" />
        )}
        {(fields?.Content?.value || isEditing) && <RichText className="dentons-article-body" field={fields?.Content} />}
        {props.rendering && <Placeholder name="article-body" rendering={props.rendering} />}
      </div>
    </article>
  );
};

export const Default = Article;
export const Dentons = Article;
