import { headers } from 'next/headers';
import client from 'src/lib/sitecore-client';
import { RouteFields, schemaJsonLd } from 'src/Layout';
import './globals.scss';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const rewrite = requestHeaders.get('x-sc-rewrite');
  const locale = requestHeaders.get('x-sc-locale');
  let schemaLd: string | null = null;
  if (rewrite && locale) {
    const [, site, requestLocale, ...path] = rewrite.split('/');
    if (site && requestLocale === locale) {
      try {
        const page = await client.getPage(path, { site, locale });
        schemaLd = schemaJsonLd((page?.layout.sitecore.route?.fields as RouteFields | undefined)?.SchemaJson?.value);
      } catch {
        schemaLd = null;
      }
    }
  }

  return (
    <html lang="en">
      {schemaLd && (
        <head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaLd }} />
        </head>
      )}
      <body>{children}</body>
    </html>
  );
}