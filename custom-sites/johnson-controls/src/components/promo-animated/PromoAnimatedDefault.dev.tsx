'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import { ButtonBase as Button } from '@/components/button-component/ButtonComponent';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { PromoAnimatedProps } from './promo-animated.props';

export const PromoAnimatedDefault: React.FC<PromoAnimatedProps> = (props) => {
  const { fields, params, isPageEditing } = props;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (fields) {
    const { image, title, description, primaryLink } = fields;

    const hasLinks = isPageEditing || primaryLink?.value?.href;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          .promo-animated__image-gradient-right::before {
            content: '';
            position: absolute;
            z-index: 1;
            background-image: url('/images/linear-gradient-ribbon.svg');
            background-size: cover;
            background-repeat: no-repeat;
            right: 0;
            top: 0;
            bottom: 0;
            width: 12px;
          }
        ` }} />
        <section data-component="PromoAnimated" className="@container">
          <div
            data-class-change
            className={cn(
              'promo-animated__content-wrapper @md:grid-cols-2 group grid grid-cols-1 mt-12 mb-12',
              { [props?.params?.styles]: props?.params?.styles }
            )}
          >
            {/* Image Section - Left Side */}
            <div className="promo-animated__image promo-animated__image-gradient-right relative w-full @md:h-full min-h-[400px] @md:min-h-[600px]">
            {image && (
              <div className="absolute inset-0">
                <ImageWrapper
                  image={image}
                  className="h-full w-full object-cover"
                  wrapperClass="relative h-full w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={true}
                />
              </div>
            )}
          </div>

          {/* Content Section - Right Side */}
          <div className="promo-animated__content bg-white @md:flex @md:flex-col @md:justify-center @md:px-12 @lg:px-16 px-6 py-12 min-w-0">
            {title && (
              <AnimatedSection reducedMotion={prefersReducedMotion} isPageEditing={isPageEditing}>
                <Text
                  tag="h2"
                  className="font-heading @sm:text-4xl mb-6 text-3xl font-semibold leading-tight tracking-tight text-black"
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
                  className="text-body prose @md:text-lg mb-8 text-base leading-relaxed text-gray-700"
                  field={description}
                />
              </AnimatedSection>
            )}

            {hasLinks && (
              <AnimatedSection
                delay={600}
                className="flex w-full flex-wrap gap-2"
                reducedMotion={prefersReducedMotion}
                isPageEditing={isPageEditing}
              >
                {primaryLink && (
                  <Button
                    variant="outline"
                    buttonLink={primaryLink}
                    isPageEditing={isPageEditing}
                    className="rounded-full border-2 border-[#00adff] text-[#152ea9] hover:border-[#152ea9] hover:bg-white hover:text-[#152ea9]"
                  />
                )}
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
      </>
    );
  }

  return <NoDataFallback componentName="Promo Animated" />;
};
