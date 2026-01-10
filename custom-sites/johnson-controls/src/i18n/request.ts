import { getRequestConfig, GetRequestConfigParams } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import client from 'src/lib/sitecore-client';
import enMessages from '../../messages/en.json';
import esESMessages from '../../messages/es-ES.json';

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // Since this function is executed during the Server Components render pass, you can call functions like cookies() and headers() to return configuration that is request-specific. https://next-intl.dev/docs/usage/configuration
  
  // set by the catch-all route setRequestLocale
  // to support SSG and multisite here we expect both site and locale in the format {site}_{locale}
  const requested = await requestLocale;
  const [parsedSite, parsedLocale] = requested?.split('_') || [];
  
  // Normalize 'es' to 'es-ES' for compatibility
  const normalizedLocale = parsedLocale === 'es' ? 'es-ES' : parsedLocale;
  const locale = hasLocale(routing.locales, normalizedLocale) ? normalizedLocale : routing.defaultLocale;

  // Load local message files - use static imports for build compatibility
  const localMessages: Record<string, unknown> =
    locale === 'es-ES' ? esESMessages : enMessages;

  // Fetch messages from Sitecore
  let sitecoreMessages: Record<string, unknown> = {};
  try {
    sitecoreMessages = (await client.getDictionary({
      locale,
      site: parsedSite,
    })) as Record<string, unknown>;
  } catch (error) {
    // If Sitecore dictionary fetch fails, continue with local messages only
    console.warn('Failed to fetch Sitecore dictionary:', error);
  }

  // Merge local messages with Sitecore messages (Sitecore takes precedence)
  const messages = {
    ...localMessages,
    ...sitecoreMessages,
  };

  return {
    locale,
    messages,
  };
});
