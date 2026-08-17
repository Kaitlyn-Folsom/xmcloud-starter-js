'use client';

import { useEffect, JSX } from 'react';
import { getSiteThemeClass } from 'lib/site-theme';

export function SiteTheme({ siteName }: { siteName: string | undefined }): JSX.Element | null {
  useEffect(() => {
    const themeClasses = getSiteThemeClass(siteName).split(' ');

    document.body.classList.add(...themeClasses);

    return () => {
      document.body.classList.remove(...themeClasses);
    };
  }, [siteName]);

  return null;
}
