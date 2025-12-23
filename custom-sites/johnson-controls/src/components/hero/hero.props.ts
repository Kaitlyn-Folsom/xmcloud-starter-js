/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, LinkField, ImageField } from '@sitecore-content-sdk/nextjs';
import { EnumValues } from '@/enumerations/generic.enum';
import { ComponentProps } from '@/lib/component-props';
import { ColorScheme } from '@/enumerations/CtaBannerColorScheme.enum';

interface HeroParams {
  colorScheme?: EnumValues<typeof ColorScheme>;
  [key: string]: any;
}

interface HeroFields {
  badge?: Field<string>;
  title: Field<string>;
  image: ImageField;
  description?: Field<string>; // Used as subtitle
  bannerCTA?: LinkField; // Used as first CTA
  searchLink?: LinkField; // Second CTA
}

export interface HeroProps extends ComponentProps {
  params: HeroParams;
  fields: HeroFields;
}
