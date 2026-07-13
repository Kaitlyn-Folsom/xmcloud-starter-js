'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import { ButtonBase as Button } from '@/components/button-component/ButtonComponent';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { PromoAnimatedProps } from './promo-animated.props';
import { PromoAnimatedEmptyImageEditing } from './PromoAnimatedEmptyImageEditing';

export const PromoAnimatedDefault: React.FC<PromoAnimatedProps> = (props) => {
  const { fields, params, isPageEditing } = props;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (fields) {
    const { image, title, description, primaryLink, secondaryLink } = fields;

    const hasLinks = isPageEditing || primaryLink?.value?.href || secondaryLink?.value?.href;

    return (
      <section data-component="PromoAnimated" className="@container bg-background py-12 @md:py-16">
        <div
          data-class-change
          className={cn(
            'promo-animated__content-wrapper group grid grid-cols-1 gap-8 @md:grid-cols-2 @md:items-center @md:gap-8 @lg:gap-12 @xl:gap-16',
            { [props?.params?.styles]: props?.params?.styles }
          )}
        >
          <div className="promo-animated__image w-full">
            {image && (
              <AnimatedSection
                reducedMotion={prefersReducedMotion}
                isPageEditing={isPageEditing}
                className="w-full"
              >
                <div className="relative w-full overflow-hidden">
                  <ImageWrapper
                    image={image}
                    className="aspect-560/356 w-full object-cover"
                    wrapperClass="relative w-full overflow-hidden"
                    emptyFieldEditingComponent={PromoAnimatedEmptyImageEditing}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={true}
                  />
                </div>
              </AnimatedSection>
            )}
          </div>

          <div className="promo-animated__content min-w-0 @md:flex @md:flex-col @md:items-start @md:justify-center">
            {title && (
              <AnimatedSection reducedMotion={prefersReducedMotion} isPageEditing={isPageEditing}>
                <Text
                  tag="h2"
                  className="font-heading text-primary mt-6 max-w-none text-2xl font-bold leading-tight @md:mt-0 @md:text-3xl group-[.position-center]:mx-auto group-[.position-right]:ml-auto"
                  field={title}
                />
              </AnimatedSection>
            )}

            {description && (
              <AnimatedSection
                delay={300}
                reducedMotion={prefersReducedMotion}
                isPageEditing={isPageEditing}
              >
                <RichText
                  className="prose text-foreground mt-4 max-w-none text-base font-normal leading-relaxed group-[.position-center]:mx-auto group-[.position-right]:ml-auto"
                  field={description}
                />
              </AnimatedSection>
            )}

            {hasLinks && (
              <AnimatedSection
                delay={600}
                className="@md:mb-0 mb-6 mt-8 flex w-full flex-wrap gap-3 group-[.position-center]:justify-center group-[.position-right]:justify-end"
                reducedMotion={prefersReducedMotion}
                isPageEditing={isPageEditing}
              >
                {primaryLink && (
                  <Button
                    buttonLink={primaryLink}
                    isPageEditing={isPageEditing}
                    contextTitle={title?.value}
                    className="shadow-[0_4px_14px_rgba(0,87,150,0.3)] font-semibold"
                  />
                )}
                {secondaryLink && (
                  <Button
                    variant="secondary"
                    buttonLink={secondaryLink}
                    isPageEditing={isPageEditing}
                    contextTitle={title?.value}
                  />
                )}
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Promo Animated" />;
};
