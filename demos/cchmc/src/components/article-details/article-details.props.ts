import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export type ArticleDetailsAuthorReference = {
  id: string;
  name: string;
  url?: string;
  displayName?: string;
  fields?: {
    personProfileImage?: ImageField;
    personFirstName?: Field<string>;
    personLastName?: Field<string>;
    personJobTitle?: Field<string>;
    personBio?: Field<string>;
    personLinkedIn?: LinkField;
  };
};

/** Fields on the Article Page route item (`page.layout.sitecore.route.fields`). */
export interface ArticleDetailsRouteFields {
  ArticleTitle?: Field<string>;
  ArticleExcerpt?: Field<string>;
  ArticleContent?: Field<string>;
  FeaturedImage?: ImageField;
  ArticleAuthor?: ArticleDetailsAuthorReference | Field<ArticleDetailsAuthorReference>;
  ArticleReadTime?: Field<string>;
  ArticleDisplayDate?: Field<string>;
  pageHeaderTitle?: Field<string>;
  pageReadTime?: Field<string>;
  pageDisplayDate?: Field<string>;
  pageAuthor?: ArticleDetailsAuthorReference | Field<ArticleDetailsAuthorReference>;
  taxAuthor?: ArticleDetailsAuthorReference | Field<ArticleDetailsAuthorReference>;
}

export interface ArticleDetailsParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/** No datasource — content comes from `page.layout.sitecore.route.fields`. */
export interface ArticleDetailsProps extends ComponentProps {
  params: ArticleDetailsParams;
}