import type React from 'react';
import { Text, AppPlaceholder } from '@sitecore-content-sdk/nextjs';
import { GlobalFooterProps } from '@/components/global-footer/global-footer.props';
import { Default as FooterCallout } from '@/components/footer-navigation-callout/FooterNavigationCallout.dev';
import { Default as Logo } from '@/components/logo/Logo.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { EditableImageButton } from '@/components/button-component/ButtonComponent';
import { cn } from '@/lib/utils';
import componentMap from '.sitecore/component-map';
import { getDatasource, getFieldValue } from '@/lib/component-props';

export const Default: React.FC<GlobalFooterProps> = (props) => {
  const { fields, rendering, page } = props;
  const isPageEditing = page.mode.isEditing;
  const datasource = getDatasource(fields);

  const {
    footerCopyright,
    footerLogo,
    footerPromoDescription,
    footerPromoLink,
    footerPromoTitle,
    footerSocialLinks,
  } = datasource ?? {};
  const footerCopyrightField = getFieldValue(footerCopyright);
  const footerLogoField = getFieldValue(footerLogo);
  const footerPromoTitleField = getFieldValue(footerPromoTitle);
  const footerPromoDescriptionField = getFieldValue(footerPromoDescription);
  const footerPromoLinkField = getFieldValue(footerPromoLink);

  if (fields) {
    return (
      <>
        <footer className="@container bg-dark text-dark-foreground">
          {/* Mission statement band */}
          {footerPromoDescriptionField && (
            <div className="border-dark-foreground/10 border-b">
              <div className="@xl:px-8 mx-auto max-w-screen-xl px-4 py-10 text-center">
                <Text
                  className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 @md:text-lg"
                  field={footerPromoDescriptionField}
                  encode={false}
                />
              </div>
            </div>
          )}

          <div className="@md:grid-cols-2 @lg:grid-cols-12 @lg:gap-8 @xl:px-8 mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-8 px-4 py-12">
            {/* Logo section */}
            <div className="@lg:col-span-2">
              <div className="max-w-[121px]">
                <Logo logo={footerLogoField} />
              </div>
            </div>
            {/* Main footer columns */}
            <div className="@md:grid-cols-3 @md:col-span-2 @lg:col-span-6 grid grid-cols-1 gap-8">
              <AppPlaceholder
                name="container-footer-column"
                rendering={rendering}
                page={page}
                componentMap={componentMap}
              />
            </div>
            {/* Callout section */}
            <div className="@md:col-span-2 @lg:col-span-4">
              <FooterCallout
                fields={{
                  title: footerPromoTitleField,
                  description: footerPromoDescriptionField,
                  linkOptional: footerPromoLinkField,
                }}
              />
            </div>
          </div>
          <div className="border-dark-foreground/10 border-t bg-[hsl(215,100%,16%)]">
            <div className="global-footer__bottom @md:flex-row @xl:px-8 mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-4 py-5">
              {/* Social links */}
              <div className="flex space-x-3">
                {footerSocialLinks?.results?.map((socialLink, index) => {
                  const socialLinkField = getFieldValue(socialLink?.link);

                  return socialLinkField ? (
                    <EditableImageButton
                      key={socialLinkField.value?.href || index}
                      buttonLink={socialLinkField}
                      className={cn('relative text-white/80 hover:bg-white/10 hover:text-white')}
                      variant="ghost"
                      size={isPageEditing ? 'default' : 'icon'}
                      isPageEditing={isPageEditing}
                      icon={getFieldValue(socialLink?.socialIcon)}
                      asIconLink={true}
                    />
                  ) : null;
                })}
              </div>
              {/* Copyright text */}
              <Text
                className="text-xs text-white/70 @md:text-sm"
                field={footerCopyrightField}
                encode={false}
              />
            </div>
          </div>
        </footer>
      </>
    );
  }
  return <NoDataFallback componentName="Global Footer" />;
};
