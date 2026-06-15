/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, LinkField, ImageField } from '@sitecore-content-sdk/nextjs';
import { EnumValues } from '@/enumerations/generic.enum';
import { ComponentProps } from '@/lib/component-props';
import { ColorScheme } from '@/enumerations/CtaBannerColorScheme.enum';

interface HeroParams {
  colorScheme?: EnumValues<typeof ColorScheme>;
  [key: string]: any;
}

type JsonField<T> = { jsonValue?: T };

interface HeroDatasource {
  titleRequired?: JsonField<Field<string>>;
  descriptionOptional?: JsonField<Field<string>>;
  linkOptional?: JsonField<LinkField>;
  heroVideoOptional1?: JsonField<LinkField>;
  heroImageOptional1?: JsonField<ImageField>;
  heroVideoOptional2?: JsonField<LinkField>;
  heroImageOptional2?: JsonField<ImageField>;
  heroVideoOptional3?: JsonField<LinkField>;
  heroImageOptional3?: JsonField<ImageField>;
  heroVideoOptional4?: JsonField<LinkField>;
  heroImageOptional4?: JsonField<ImageField>;
}

interface HeroFields {
  data?: {
    datasource?: HeroDatasource;
  };
  titleRequired?: Field<string>;
  descriptionOptional?: Field<string>;
  linkOptional?: LinkField;
  heroVideoOptional1?: LinkField;
  heroImageOptional1?: ImageField;
  heroVideoOptional2?: LinkField;
  heroImageOptional2?: ImageField;
  heroVideoOptional3?: LinkField;
  heroImageOptional3?: ImageField;
  heroVideoOptional4?: LinkField;
  heroImageOptional4?: ImageField;
}

export interface HeroProps extends ComponentProps {
  params: HeroParams;
  fields: HeroFields;
}

export type { HeroDatasource };
