'use client';

import { cn } from '@/lib/utils';
import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import { ButtonBase as Button } from '@/components/button-component/ButtonComponent';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { PromoAnimatedProps } from './promo-animated.props';
import { EnumValues } from '@/enumerations/generic.enum';
import { ColorSchemeLimited as ColorScheme } from '@/enumerations/ColorSchemeLimited.enum';
import { ButtonVariants } from '@/enumerations/ButtonStyle.enum';
import { PromoAnimatedEmptyImageEditing } from './PromoAnimatedEmptyImageEditing';
import { imageBgExtensionRenderingParams as imageBgOptions } from './promo-animated.util';

export const PromoAnimatedDefault: React.FC<PromoAnimatedProps> = (props) => {
  const { fields, params, isPageEditing } = props;

  if (fields) {
    const { image, title, description, primaryLink, secondaryLink } = fields;

    const colorScheme = params.colorScheme as EnumValues<typeof ColorScheme>;
    const hasLinks = isPageEditing || primaryLink?.value?.href || secondaryLink?.value?.href;
    const showTitleStack = Boolean(title?.value || isPageEditing);

    return (
      <section data-component="PromoAnimated" className="@container bg-background px-4 py-10 md:py-14">
        <div
          data-class-change
          className={cn(
            'promo-animated__content-wrapper group grid grid-cols-1 gap-8 @md:grid-cols-2 @md:items-center @md:gap-10 @xl:gap-12',
            { [props?.params?.styles]: props?.params?.styles }
          )}
        >
          <div className="promo-animated__image @md:flex @md:w-full @md:justify-end">
            {image && (
              <div
                className={cn(
                  'promo-animated__media-frame border-border relative mx-auto w-full max-w-[520px] overflow-hidden rounded-none border bg-secondary shadow-sm',
                  'group-[.position-center]:mx-auto group-[.position-right]:ml-auto @md:mx-0'
                )}
              >
                <div className={imageBgOptions({ colorScheme, className: 'right-1/2' })} />
                <div className="relative aspect-4/3 w-full">
                  <ImageWrapper
                    image={image}
                    className="h-full w-full object-cover"
                    wrapperClass="relative h-full w-full overflow-hidden"
                    emptyFieldEditingComponent={PromoAnimatedEmptyImageEditing}
                    sizes="(min-width: 768px) 520px, 100vw"
                    priority={true}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="promo-animated__content @md:flex @md:flex-col @md:justify-center @md:items-start min-w-0">
            {showTitleStack && (
              <div>
                {title && (
                  <Text
                    tag="h2"
                    className="font-heading text-primary @md:text-4xl group-[.position-center]:mx-auto group-[.position-right]:ml-auto mt-0 max-w-[40ch] text-3xl font-bold leading-tight"
                    field={title}
                  />
                )}
                <hr className="border-border mt-4 max-w-full border-t" />
              </div>
            )}

            {description && (
              <RichText
                className="prose prose-neutral mt-6 max-w-[51.5ch] text-base leading-relaxed text-muted-foreground group-[.position-center]:mx-auto group-[.position-right]:ml-auto"
                field={description}
              />
            )}

            {hasLinks && (
              <div className="@md:mb-0 mb-6 mt-10 flex w-full flex-wrap gap-3 group-[.position-right]:justify-end group-[.position-center]:justify-center">
                {primaryLink && (
                  <Button
                    variant={ButtonVariants.OUTLINE}
                    className="rounded-md px-8 font-semibold"
                    buttonLink={primaryLink}
                    isPageEditing={isPageEditing}
                    contextTitle={title?.value}
                  ></Button>
                )}
                {secondaryLink && (
                  <Button
                    variant={ButtonVariants.SECONDARY}
                    className="rounded-md px-8 font-semibold"
                    buttonLink={secondaryLink}
                    isPageEditing={isPageEditing}
                    contextTitle={title?.value}
                  ></Button>
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
