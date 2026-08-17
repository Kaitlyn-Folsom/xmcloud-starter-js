import { setCachedPageParams } from '@sitecore-content-sdk/nextjs';
import { SearchProvider } from 'components/search/SearchProvider';
import { ScrollParallaxProvider } from 'components/non-sitecore/ScrollParallaxProvider';

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string; locale: string }>;
}) {
  const { site, locale } = await params;

  setCachedPageParams({ locale, site });

  return (
    <SearchProvider locale={locale}>
      <ScrollParallaxProvider>{children}</ScrollParallaxProvider>
    </SearchProvider>
  );
}

