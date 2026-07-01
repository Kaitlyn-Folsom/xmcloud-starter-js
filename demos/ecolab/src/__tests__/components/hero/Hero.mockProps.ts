import { Field, LinkField, ImageField, Page, PageMode, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { HeroProps } from '@/components/hero/hero.props';
import { EnumValues } from '@/enumerations/generic.enum';
import { ColorScheme } from '@/enumerations/CtaBannerColorScheme.enum';

export const mockPageData = {
  page: {
    mode: {
      isEditing: false,
      isPreview: false,
      isNormal: true,
      name: 'normal' as PageMode['name'],
      designLibrary: { isVariantGeneration: false },
      isDesignLibrary: false,
    },
    layout: {
      sitecore: {
        context: {},
        route: null,
      },
    },
    locale: 'en',
  } as Page,
};

export const mockPageDataEditing = {
  page: {
    mode: {
      isEditing: true,
      isPreview: false,
      isNormal: false,
      name: 'edit' as PageMode['name'],
      designLibrary: { isVariantGeneration: false },
      isDesignLibrary: false,
    },
    layout: {
      sitecore: {
        context: {},
        route: null,
      },
    },
    locale: 'en',
  } as Page,
};

export const mockTitleField: Field<string> = {
  value: 'Welcome to Our Platform',
};

export const mockDescriptionField: Field<string> = {
  value: 'Discover amazing features and transform your experience with our innovative solutions.',
};

export const mockLinkField: LinkField = {
  value: {
    href: '/get-started',
    text: 'Get Started',
    title: 'Get Started Today',
    target: '',
    linktype: 'internal',
  },
};

export const mockFeaturedImageField: ImageField = {
  value: {
    src: '/images/hero-image-1.jpg',
    alt: 'Hero featured image',
    width: 1200,
    height: 800,
  },
};

export const mockFields = {
  titleRequired: mockTitleField,
  descriptionOptional: mockDescriptionField,
  linkOptional: mockLinkField,
  heroImageOptional1: mockFeaturedImageField,
};

export const mockFieldsWithoutDescription = {
  titleRequired: mockTitleField,
  linkOptional: mockLinkField,
  heroImageOptional1: mockFeaturedImageField,
};

export const mockFieldsWithoutLink = {
  titleRequired: mockTitleField,
  descriptionOptional: mockDescriptionField,
  heroImageOptional1: mockFeaturedImageField,
};

export const mockFieldsWithOnlyTitle = {
  titleRequired: mockTitleField,
};

export const mockFieldsWithoutFeaturedImage = {
  titleRequired: mockTitleField,
  descriptionOptional: mockDescriptionField,
  linkOptional: mockLinkField,
};

export const mockParamsLight = {
  colorScheme: 'light' as EnumValues<typeof ColorScheme>,
  styles: 'custom-hero-style',
  RenderingIdentifier: 'hero-rendering-id',
};

export const mockParamsPrimary = {
  colorScheme: 'primary' as EnumValues<typeof ColorScheme>,
  RenderingIdentifier: 'hero-rendering-id',
};

export const mockParamsSecondary = {
  colorScheme: 'secondary' as EnumValues<typeof ColorScheme>,
  RenderingIdentifier: 'hero-rendering-id',
};

export const mockParamsTertiary = {
  colorScheme: 'tertiary' as EnumValues<typeof ColorScheme>,
  RenderingIdentifier: 'hero-rendering-id',
};

export const mockParamsDark = {
  colorScheme: 'dark' as EnumValues<typeof ColorScheme>,
  RenderingIdentifier: 'hero-rendering-id',
};

export const mockParamsWithoutColorScheme = {
  RenderingIdentifier: 'hero-rendering-id',
};

const mockRendering: ComponentRendering = {
  componentName: 'Hero',
};

export const defaultProps: HeroProps = {
  params: mockParamsLight,
  fields: mockFields,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithPrimaryScheme: HeroProps = {
  params: mockParamsPrimary,
  fields: mockFields,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithSecondaryScheme: HeroProps = {
  params: mockParamsSecondary,
  fields: mockFields,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithTertiaryScheme: HeroProps = {
  params: mockParamsTertiary,
  fields: mockFields,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithDarkScheme: HeroProps = {
  params: mockParamsDark,
  fields: mockFields,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithoutDescription: HeroProps = {
  params: mockParamsLight,
  fields: mockFieldsWithoutDescription,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithoutLink: HeroProps = {
  params: mockParamsLight,
  fields: mockFieldsWithoutLink,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithOnlyTitle: HeroProps = {
  params: mockParamsLight,
  fields: mockFieldsWithOnlyTitle,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithoutFeaturedImage: HeroProps = {
  params: mockParamsLight,
  fields: mockFieldsWithoutFeaturedImage,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithoutColorScheme: HeroProps = {
  params: mockParamsWithoutColorScheme,
  fields: mockFields,
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsWithoutFields: HeroProps = {
  params: mockParamsLight,
  fields: null as unknown as HeroProps['fields'],
  rendering: mockRendering,
  page: mockPageData.page,
};

export const propsEditing: HeroProps = {
  params: mockParamsLight,
  fields: mockFields,
  rendering: mockRendering,
  page: mockPageDataEditing.page,
};
