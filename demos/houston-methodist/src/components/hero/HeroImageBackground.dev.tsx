'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { EditableButton } from '@/components/button-component/ButtonComponent';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import type { HeroProps } from './hero.props';

type HeroImageBackgroundProps = HeroProps & {
  isPageEditing?: boolean;
};

export const HeroImageBackground: React.FC<HeroImageBackgroundProps> = (props) => {
  const { fields, params, page, isPageEditing: isPageEditingProp } = props;
  const {
    titleRequired,
    descriptionOptional,
    linkOptional,
    heroImageOptional1,
  } = fields || {};

  const isPageEditing = isPageEditingProp ?? page.mode.isEditing;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (!fields) {
    return <NoDataFallback componentName="Hero" />;
  }

  const hasBackgroundImage =
    !!heroImageOptional1?.value?.src || isPageEditing;

  return (
    <section
      data-component="Hero"
      className={cn(
        'hero @container relative min-h-[28rem] w-full overflow-hidden @md:min-h-[32rem] @lg:min-h-[36rem]',
        params?.styles
      )}
    >
      {hasBackgroundImage && (
        <ImageWrapper
          image={heroImageOptional1}
          wrapperClass="absolute inset-0 h-full w-full"
          className="h-full w-full object-cover object-center"
          priority
          loading="eager"
          fetchPriority="high"
          page={page}
        />
      )}

      {/* Left scrim for text readability over the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-transparent @md:via-secondary/55"
      />

      <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-screen-xl items-center px-4 py-16 @md:py-20 xl:px-8">
        <AnimatedSection
          direction="up"
          className="flex max-w-xl flex-col gap-6 @lg:max-w-[42rem]"
          isPageEditing={isPageEditing}
          reducedMotion={prefersReducedMotion}
        >
          {(titleRequired?.value || isPageEditing) && (
            <Text
              tag="h1"
              field={titleRequired}
              className="hm-hero-headline text-3xl font-bold leading-tight @md:text-4xl @lg:text-5xl"
            />
          )}

          {(descriptionOptional?.value || isPageEditing) && (
            <Text
              tag="p"
              field={descriptionOptional}
              className="font-body text-primary max-w-prose text-lg leading-relaxed @md:text-xl"
            />
          )}

          {linkOptional && (
            <div>
              <EditableButton
                buttonLink={linkOptional}
                variant="default"
                isPageEditing={isPageEditing}
                contextTitle={titleRequired?.value}
              />
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};
