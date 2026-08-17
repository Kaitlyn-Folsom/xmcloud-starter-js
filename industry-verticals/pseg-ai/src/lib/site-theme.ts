// PSE&G brand tokens are layered on top of the financial theme so that the
// financial component styles keep applying underneath.
const PSEG_THEME_CLASS = 'site-financial site-pseg';

const SITE_THEME_CLASS_MAP: Record<string, string> = {
  Financial: PSEG_THEME_CLASS,
  ProsperaFinancial: PSEG_THEME_CLASS,
  Services: 'site-services',
};

const DEFAULT_SITE_THEME_CLASS = PSEG_THEME_CLASS;

export function getSiteThemeClass(siteName: string | undefined): string {
  if (!siteName) {
    return DEFAULT_SITE_THEME_CLASS;
  }

  return SITE_THEME_CLASS_MAP[siteName] ?? DEFAULT_SITE_THEME_CLASS;
}
