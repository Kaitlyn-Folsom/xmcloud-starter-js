import './globals.css';

import { StructuredData } from '@/components/structured-data/StructuredData';
import { SITE_BRAND_NAME } from '@/lib/site-brand';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data/schema';
import type { JsonLdValue } from '@/lib/structured-data/jsonld';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  // Site-wide schemas: Organization + WebSite (injected once per page)
  const organizationSchema = generateOrganizationSchema({
    name: SITE_BRAND_NAME,
    url: baseUrl || undefined,
  });

  const webSiteSchema = baseUrl
    ? generateWebSiteSchema({
      name: SITE_BRAND_NAME,
      url: baseUrl,
    })
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://edge-platform.sitecorecloud.io" />
        <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <StructuredData id="organization-schema" data={organizationSchema as JsonLdValue} />
        {webSiteSchema && <StructuredData id="website-schema" data={webSiteSchema as JsonLdValue} />}
        {children}
      </body>
    </html>
  );
}
