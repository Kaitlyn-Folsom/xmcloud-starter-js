import type React from 'react';
import Link from 'next/link';
import { Text, AppPlaceholder, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { GlobalFooterProps } from '@/components/global-footer/global-footer.props';
import { Default as Logo } from '@/components/logo/Logo.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import componentMap from '.sitecore/component-map';
import { FooterDecorations } from './FooterDecorations';
import { FooterBackToTop } from './FooterBackToTop';
import { FooterAccreditation } from './FooterAccreditation';
import { FooterConnectSection } from './FooterConnectSection';

const FOOTER_ADDRESS = '3333 Burnet Avenue, Cincinnati, Ohio 45229-3026';

export const Default: React.FC<GlobalFooterProps> = (props) => {
  const { fields, rendering, page } = props;
  const isPageEditing = page.mode.isEditing;

  const {
    footerCopyright,
    footerLogo,
    footerPromoLink,
    footerSocialLinks,
  } = fields?.data?.datasource ?? {};

  if (fields) {
    return (
      <footer
        role="contentinfo"
        className="@container relative overflow-hidden border-t border-border bg-background text-base text-foreground"
      >
        <FooterDecorations />

        <div className="@xl:px-8 relative z-10 mx-auto max-w-screen-xl px-4 py-12">
          <div className="grid grid-cols-1 gap-10 @lg:grid-cols-12 @lg:gap-12">
            {/* Logo */}
            <div className="@lg:col-span-3 @lg:flex @lg:items-center">
              <div className="max-w-[220px]">
                <Logo logo={footerLogo?.jsonValue} />
              </div>
            </div>

            {/* Main footer content */}
            <div className="@lg:col-span-9">
              <FooterConnectSection
                footerSocialLinks={footerSocialLinks}
                isPageEditing={isPageEditing}
              />

              <div className="border-border my-8 border-t" />

              <div className="@md:grid-cols-3 grid grid-cols-1 gap-8">
                <AppPlaceholder
                  name="container-footer-column"
                  rendering={rendering}
                  page={page}
                  componentMap={componentMap}
                />
              </div>

              <div className="mt-8">
                  {isPageEditing ? (
                    footerPromoLink?.jsonValue && (
                      <SitecoreLink
                        field={footerPromoLink.jsonValue}
                        className="text-brand-purple hover:text-brand-purple/80 inline-flex items-center gap-1.5 text-lg font-semibold transition-colors"
                      />
                    )
                  ) : footerPromoLink?.jsonValue?.value?.href ? (
                    <Link
                      href={footerPromoLink.jsonValue.value.href}
                      className="text-brand-purple hover:text-brand-purple/80 inline-flex items-center gap-1.5 text-lg font-semibold transition-colors"
                    >
                      {footerPromoLink.jsonValue.value.text || 'Give Today'}
                      <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <Link
                      href="#"
                      className="text-brand-purple hover:text-brand-purple/80 inline-flex items-center gap-1.5 text-lg font-semibold transition-colors"
                    >
                      Give Today
                      <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
            </div>
          </div>

          <div className="border-border mt-12 border-t pt-8">
            <div className="global-footer__bottom flex flex-col items-start justify-between gap-6 @lg:flex-row @lg:items-end">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  {FOOTER_ADDRESS}
                </p>
                <Text
                  className="text-muted-foreground block text-xs font-medium tracking-wide uppercase"
                  field={footerCopyright?.jsonValue}
                  encode={false}
                />
              </div>

              <div className="flex w-full items-end justify-between gap-4 @lg:w-auto @lg:justify-end">
                <FooterAccreditation />
                <FooterBackToTop />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return <NoDataFallback componentName="Global Footer" />;
};
