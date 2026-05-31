'use client';

import { cn } from '@/lib/utils';
import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import { ButtonBase as Button } from '@/components/button-component/ButtonComponent';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { PromoAnimatedProps } from './promo-animated.props';
import { ButtonVariants } from '@/enumerations/ButtonStyle.enum';
import { PromoAnimatedEmptyImageEditing } from './PromoAnimatedEmptyImageEditing';
import { PromoAnimatedCta } from './PromoAnimatedCta';

export const PromoAnimatedDefault: React.FC<PromoAnimatedProps> = (props) => {
  const { fields, params, isPageEditing } = props;

  if (fields) {
    const { image, title, description, primaryLink, secondaryLink } = fields;

    const hasLinks = isPageEditing || primaryLink?.value?.href || secondaryLink?.value?.href;
    const showTitle = Boolean(title?.value || isPageEditing);

    return (
      <section
        data-component="PromoAnimated"
        className="@container bg-background px-4 py-12 @md:py-16 @xl:px-8"
      >
        <div
          data-class-change
          className={cn(
            'promo-animated__content-wrapper group mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-8 @md:grid-cols-2 @md:items-center @md:gap-8 @lg:grid-cols-[5fr_3fr] @lg:gap-10',
            { [props?.params?.styles]: props?.params?.styles }
          )}
        >
          <div className="promo-animated__image @md:flex @md:w-full @md:justify-end">
            {image && (
              <div
                className={cn(
                  'promo-animated__media-frame relative w-full overflow-hidden',
                  'group-[.position-center]:mx-auto group-[.position-right]:ml-auto @md:mx-0'
                )}
              >
                <div className="relative aspect-[1/1] w-full">
                  <ImageWrapper
                    image={image}
                    className="h-full w-full object-cover"
                    wrapperClass="relative h-full w-full overflow-hidden"
                    emptyFieldEditingComponent={PromoAnimatedEmptyImageEditing}
                    sizes="(min-width: 1024px) 37.5vw, (min-width: 768px) 50vw, 100vw"
                    priority={true}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="promo-animated__content @md:flex @md:w-full @md:flex-col @md:justify-center @md:items-start min-w-0">
            {showTitle && title && (
              <Text
                tag="h2"
                className="font-heading text-primary group-[.position-center]:mx-auto group-[.position-right]:ml-auto mt-0 w-full max-w-[36ch] text-3xl font-bold leading-tight @md:text-[2.5rem] @md:leading-[1.15] @lg:max-w-none"
                field={title}
              />
            )}

            {description && (
              <RichText
                className="prose prose-neutral mt-5 w-full max-w-[52ch] text-base leading-[1.7] text-foreground group-[.position-center]:mx-auto group-[.position-right]:ml-auto @md:mt-6 @md:text-lg @lg:max-w-none"
                field={description}
              />
            )}

            {hasLinks && (
              <div className="@md:mb-0 mb-6 mt-8 flex w-full flex-wrap items-center gap-4 group-[.position-right]:justify-end group-[.position-center]:justify-center @md:mt-8">
                {primaryLink && (
                  <PromoAnimatedCta
                    buttonLink={primaryLink}
                    isPageEditing={isPageEditing}
                    contextTitle={title?.value}
                  />
                )}
                {secondaryLink && (
                  <Button
                    variant={ButtonVariants.OUTLINE}
                    className="rounded-none border border-border bg-background px-5 py-3 font-heading text-sm font-semibold hover:bg-secondary @md:text-base"
                    buttonLink={secondaryLink}
                    isPageEditing={isPageEditing}
                    contextTitle={title?.value}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Promo Animated" />;
};
