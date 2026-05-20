import type { Field, ImageField, Page } from '@sitecore-content-sdk/nextjs';
import type { ArticleDetailsAuthorReference } from './article-details.props';

type JsonWrapped<T> = { jsonValue?: Field<T> };

const isSitecoreField = <T>(value: unknown): value is Field<T> =>
  typeof value === 'object' && value != null && 'value' in value;

const asField = <T>(
  field: JsonWrapped<T> | Field<T> | null | undefined,
): Field<T> | undefined => {
  if (field == null) {
    return undefined;
  }
  if (typeof field === 'object' && 'jsonValue' in field && field.jsonValue != null) {
    return field.jsonValue;
  }
  if (isSitecoreField<T>(field)) {
    return field;
  }
  return undefined;
};

type AuthorJsonWrapped = {
  jsonValue?: ArticleDetailsAuthorReference | Field<ArticleDetailsAuthorReference>;
};

const asAuthor = (field: unknown): ArticleDetailsAuthorReference | undefined => {
  if (field == null || typeof field !== 'object') {
    return undefined;
  }
  if ('jsonValue' in field) {
    const jsonValue = (field as AuthorJsonWrapped).jsonValue;
    if (jsonValue == null) {
      return undefined;
    }
    if (isSitecoreField<ArticleDetailsAuthorReference>(jsonValue)) {
      return jsonValue.value;
    }
    return jsonValue;
  }
  if ('fields' in field) {
    return field as ArticleDetailsAuthorReference;
  }
  const wrapped = field as Field<ArticleDetailsAuthorReference>;
  if (wrapped.value && typeof wrapped.value === 'object') {
    return wrapped.value;
  }
  return undefined;
};

const pickField = <T>(
  routeFields: Record<string, unknown>,
  ...keys: string[]
): Field<T> | undefined => {
  for (const key of keys) {
    const field = asField<T>(routeFields[key] as JsonWrapped<T> | Field<T>);
    if (field) {
      return field;
    }
  }
  return undefined;
};

export type ArticleDetailsResolvedFields = {
  title?: Field<string>;
  excerpt?: Field<string>;
  content?: Field<string>;
  featuredImage?: ImageField;
  readTime?: Field<string>;
  displayDate?: Field<string>;
  author?: ArticleDetailsAuthorReference;
};

export function getArticleDetailsRouteFields(page: Page): ArticleDetailsResolvedFields {
  const routeFields = (page.layout?.sitecore?.route?.fields ?? {}) as Record<string, unknown>;

  return {
    title: pickField<string>(routeFields, 'ArticleTitle', 'pageHeaderTitle'),
    excerpt: pickField<string>(routeFields, 'ArticleExcerpt'),
    content: pickField<string>(routeFields, 'ArticleContent'),
    featuredImage: pickField<NonNullable<ImageField['value']>>(routeFields, 'FeaturedImage'),
    readTime: pickField<string>(routeFields, 'ArticleReadTime', 'pageReadTime'),
    displayDate: pickField<string>(routeFields, 'ArticleDisplayDate', 'pageDisplayDate'),
    author: asAuthor(routeFields.ArticleAuthor ?? routeFields.taxAuthor ?? routeFields.pageAuthor),
  };
}

export function hasArticleDetailsContent(resolved: ArticleDetailsResolvedFields): boolean {
  return Boolean(
    resolved.title?.value ||
      resolved.excerpt?.value ||
      resolved.content?.value ||
      resolved.featuredImage?.value?.src ||
      resolved.readTime?.value ||
      resolved.displayDate?.value ||
      resolved.author,
  );
}
