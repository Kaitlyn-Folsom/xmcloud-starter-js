import { Field, Page, ComponentRendering, PageMode } from '@sitecore-content-sdk/nextjs';
import {
  mockImageField,
  mockTitleField,
  mockReadTimeField,
  mockDisplayDateField,
  mockAuthor,
  mockAuthorWithoutImage,
  mockAuthorWithoutJobTitle,
} from '../article-header/ArticleHeader.mockProps';

const mockExcerptField: Field<string> = {
  value:
    '<p>Learn when active adults should see a doctor for knee pain and what to expect from evaluation and treatment.</p>',
};

const mockContentField: Field<string> = {
  value:
    '<h1>When to See a Doctor for Knee Pain</h1><p>Knee pain can be frustrating when you want to stay active.</p>',
};

const mockRouteFieldsFull = {
  pageHeaderTitle: mockTitleField,
  pageReadTime: mockReadTimeField,
  pageDisplayDate: mockDisplayDateField,
  pageAuthor: mockAuthor,
  FeaturedImage: mockImageField,
  ArticleExcerpt: mockExcerptField,
  ArticleContent: mockContentField,
};

const createMockPage = (routeFields: Record<string, unknown> | null): Page => ({
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
      route: routeFields
        ? {
            name: 'Test Article',
            fields: routeFields,
          }
        : null,
    },
  },
  locale: 'en',
});

export const mockParams = {
  styles: 'custom-article-details-style',
};

export const mockRendering: ComponentRendering = {
  componentName: 'ArticleDetails',
} as ComponentRendering;

export const defaultProps = {
  params: mockParams,
  rendering: mockRendering,
  page: createMockPage(mockRouteFieldsFull),
};

export const propsWithoutAuthor = {
  params: mockParams,
  rendering: mockRendering,
  page: createMockPage({
    pageHeaderTitle: mockTitleField,
    pageReadTime: mockReadTimeField,
    pageDisplayDate: mockDisplayDateField,
    FeaturedImage: mockImageField,
    ArticleExcerpt: mockExcerptField,
    ArticleContent: mockContentField,
  }),
};

export const propsWithoutFeaturedImage = {
  params: mockParams,
  rendering: mockRendering,
  page: createMockPage({
    pageHeaderTitle: mockTitleField,
    pageReadTime: mockReadTimeField,
    pageDisplayDate: mockDisplayDateField,
    pageAuthor: mockAuthor,
    ArticleExcerpt: mockExcerptField,
    ArticleContent: mockContentField,
  }),
};

export const propsMinimal = {
  params: mockParams,
  rendering: mockRendering,
  page: createMockPage({
    pageHeaderTitle: mockTitleField,
  }),
};

export const propsWithoutRoute = {
  params: mockParams,
  rendering: mockRendering,
  page: createMockPage(null),
};

export const propsWithAuthorNoImage = {
  params: mockParams,
  rendering: mockRendering,
  page: createMockPage({
    ...mockRouteFieldsFull,
    pageAuthor: mockAuthorWithoutImage,
  }),
};

export const propsWithAuthorNoJobTitle = {
  params: mockParams,
  rendering: mockRendering,
  page: createMockPage({
    ...mockRouteFieldsFull,
    pageAuthor: mockAuthorWithoutJobTitle,
  }),
};
