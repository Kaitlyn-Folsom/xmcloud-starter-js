import { Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { TopicListingBackgroundTheme } from '@/enumerations/TopicListingBackgroundTheme.enum';
import { EnumValues } from '@/enumerations/generic.enum';

export interface TopicListingParams {
  backgroundTheme?: EnumValues<typeof TopicListingBackgroundTheme>;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface TopicListingFields {
  data: {
    datasource: {
      title: { jsonValue: Field<string> };
      children?: {
        results: TopicItemProps[];
      };
    };
  };
}

export interface TopicListingProps extends ComponentProps {
  params: TopicListingParams;
  fields: TopicListingFields;
}

export type TopicItemProps = {
  link?: {
    jsonValue?: LinkField;
  };
  backgroundTheme?: EnumValues<typeof TopicListingBackgroundTheme>;
  isPageEditing?: boolean;
};
