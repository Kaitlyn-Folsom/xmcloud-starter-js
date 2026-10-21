'use client';

import { JSX } from 'react';
import {
  Field,
  RichTextField,
  Text,
  RichText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ArticleFields = {
  Title?: Field<string>;
  Date?: Field<string>;
  Type?: Field<string>;
  Body?: RichTextField;
  Authors?: RichTextField;
  Related?: RichTextField;
};

export type InsightArticleProps = ComponentProps & { fields: ArticleFields };

const InsightArticleEmpty = (): JSX.Element => (
  <div className="component insight-article">
    <div className="component-content">
      <span className="is-empty-hint">InsightArticle</span>
    </div>
  </div>
);

export const Default = ({ fields, params }: InsightArticleProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  if (!fields?.Title) return <InsightArticleEmpty />;
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href;

  return (
    <article
      className={`component insight-article ${params?.styles || ''}`}
      id={params?.RenderingIdentifier || undefined}
    >
      <div className="container">
        <h1>
          <Text field={fields.Title} />
        </h1>
        {(isPageEditing || fields.Date?.value) && <Text tag="p" field={fields.Date} />}
        {(isPageEditing || fields.Type?.value) && <Text tag="p" field={fields.Type} />}
        {(isPageEditing || fields.Body?.value) && <RichText field={fields.Body} />}
        <h2>Key contacts</h2>
        {(isPageEditing || fields.Authors?.value) && <RichText field={fields.Authors} />}
        {(isPageEditing || fields.Related?.value) && (
          <>
            <h2>Related</h2>
            <RichText field={fields.Related} />
          </>
        )}
        {shareUrl && (
          <p className="share">
            Share{' '}
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`}>LinkedIn</a>
            {' '}
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}>X</a>
          </p>
        )}
      </div>
    </article>
  );
};

export const Dentons = (props: InsightArticleProps): JSX.Element => <Default {...props} />;
