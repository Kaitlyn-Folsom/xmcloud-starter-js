import { getRequestConfig, GetRequestConfigParams } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import client from 'src/lib/sitecore-client';

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // Since this function is executed during the Server Components render pass, you can call functions like cookies() and headers() to return configuration that is request-specific. https://next-intl.dev/docs/usage/configuration
  
  // set by the catch-all route setRequestLocale
  // to support SSG and multisite here we expect both site and locale in the format {site}_{locale}
  const requested = await requestLocale;
  const [parsedSite, parsedLocale] = requested?.split('_') || [];
  const locale = hasLocale(routing.locales, parsedLocale) ? parsedLocale : routing.defaultLocale;

  // Load local message files
  let localMessages: Record<string, any> = {};

  try {
    // Dynamically import the message file based on locale
    if (locale === 'en') {
      const enMessages = await import('../../messages/en.json');
      localMessages = enMessages.default || enMessages;
    } else if (locale === 'es') {
      const esMessages = await import('../../messages/es.json');
      localMessages = esMessages.default || esMessages;
    }
  } catch (error) {
    // Fallback to English if locale file doesn't exist
    if (locale !== 'en') {
      try {
        const enMessages = await import('../../messages/en.json');
        localMessages = enMessages.default || enMessages;
      } catch {
        // Ignore if English file also doesn't exist
        localMessages = {};
      }
    }
  }

  // Fetch messages from Sitecore
  let sitecoreMessages = {};
  try {
    sitecoreMessages = await client.getDictionary({
      locale,
      site: parsedSite,
    });
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
