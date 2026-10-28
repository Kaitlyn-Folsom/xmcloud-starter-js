import { JSX } from 'react';
import { AppPlaceholder, DesignLibraryApp, Field, ImageField, Page, RichTextField } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'components/content-sdk/SitecoreStyles';
import componentMap from '.sitecore/component-map';
import { getSiteThemeClass } from 'lib/site-theme';

interface LayoutProps {
  page: Page;
}

type TaxonomyItem = {
  id?: string;
  name?: string;
  displayName?: string;
  fields?: { Title?: Field<string> };
};

export interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  Excerpt?: Field<string>;
  Content?: RichTextField;
  Thumbnail?: ImageField;
  PublicationDate?: Field<string>;
  Author?: Field<string>;
  'Content Type'?: TaxonomyItem | { value?: TaxonomyItem | string };
  Sector?: TaxonomyItem[] | { value?: TaxonomyItem[] | string };
  SchemaJson?: Field<string>;
}

const taxonomyItems = (field: unknown): TaxonomyItem[] => {
  if (!field || typeof field !== 'object') return [];
  if (Array.isArray(field)) return field as TaxonomyItem[];
  if ('value' in field) {
    const value = (field as { value?: unknown }).value;
    if (!value || typeof value === 'string') return [];
    return (Array.isArray(value) ? value : [value]) as TaxonomyItem[];
  }
  return [field as TaxonomyItem];
};

const taxonomyLabel = (item: TaxonomyItem): string => item.displayName || item.fields?.Title?.value || item.name || '';

export const taxonomyLabels = (field: unknown): string[] => taxonomyItems(field).map(taxonomyLabel).filter(Boolean);

export function schemaJsonLd(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    return JSON.stringify(JSON.parse(value)).replace(/</g, '\\u003c');
  } catch {
    return null;
  }
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';
  const siteThemeClass = getSiteThemeClass(page.siteName);
  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className={`${mainClassPageEditing} ${siteThemeClass}`}>
        {mode.isDesignLibrary ? (
          route && (
            <DesignLibraryApp
              page={page}
              rendering={route}
              componentMap={componentMap}
              loadServerImportMap={() => import('.sitecore/import-map.server')}
            />
          )
        ) : (
          <>
            <header>
              <div id="header">
                {route && (
                  <AppPlaceholder
                    page={page}
                    componentMap={componentMap}
                    name="headless-header"
                    rendering={route}
                  />
                )}
              </div>
            </header>
            <main>
              <div id="content">
                {route && (
                  <AppPlaceholder
                    page={page}
                    componentMap={componentMap}
                    name="headless-main"
                    rendering={route}
                  />
                )}
              </div>
            </main>
            <div id="footer">
              {route && (
                <AppPlaceholder
                  page={page}
                  componentMap={componentMap}
                  name="headless-footer"
                  rendering={route}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
