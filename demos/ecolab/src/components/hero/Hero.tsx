'use client';

import { useState, useEffect } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { EditableButton } from '@/components/button-component/ButtonComponent';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { getDatasource, getFieldValue } from '@/lib/component-props';
import { HeroProps } from './hero.props';

export const heroVariants = cva('hero @container relative w-full overflow-hidden', {
  variants: {
    colorScheme: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-foreground',
      tertiary: 'bg-tertiary text-foreground',
      dark: 'bg-dark text-dark-foreground',
      light: 'bg-background text-foreground',
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
  },
});

type HeroSplitProps = HeroProps & {
  imagePosition: 'left' | 'right';
};

const HeroSplit: React.FC<HeroSplitProps> = ({ fields, params, page, imagePosition }) => {
  const datasource = getDatasource(fields);

  const { titleRequired, descriptionOptional, linkOptional, heroImageOptional1 } = datasource || {};
  const titleField = getFieldValue(titleRequired);
  const descriptionField = getFieldValue(descriptionOptional);
  const linkField = getFieldValue(linkOptional);
  const featuredImageField = getFieldValue(heroImageOptional1);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isPageEditing = page.mode.isEditing;

  const { colorScheme = 'primary' } = params;

  const isDarkHero = colorScheme === 'primary' || colorScheme === 'dark';
  const isImageLeft = imagePosition === 'left';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (!datasource) {
    return <NoDataFallback componentName="Hero" />;
  }

  const hasFeaturedImage = Boolean(featuredImageField?.value?.src) || isPageEditing;

  const contentPanel = (
    <div
      className={cn(
        'flex flex-col justify-center px-8 py-12 @md:px-12 @lg:px-16 @xl:px-20',
        isDarkHero ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
      )}
    >
      <AnimatedSection
        direction="up"
        reducedMotion={prefersReducedMotion}
        isPageEditing={isPageEditing}
      >
        {(titleField?.value || isPageEditing) && (
          <Text
            tag="h1"
            field={titleField}
            className="font-heading mb-6 text-3xl font-bold leading-tight tracking-tight @md:text-4xl @lg:text-[2.75rem]"
          />
        )}
        {(descriptionField?.value || isPageEditing) && (
          <Text
            tag="p"
            className={cn(
              'font-body max-w-none text-base leading-relaxed @md:text-lg',
              isDarkHero ? 'text-primary-foreground' : 'text-muted-foreground'
            )}
            field={descriptionField}
          />
        )}
        {linkField && (
          <div className="mt-8 flex flex-wrap gap-4">
            <EditableButton
              buttonLink={linkField}
              className={
                isDarkHero
                  ? 'rounded-full bg-white text-primary hover:bg-gray-100'
                  : 'rounded-full text-white'
              }
              isPageEditing={isPageEditing}
              contextTitle={titleField?.value}
            />
          </div>
        )}
      </AnimatedSection>
    </div>
  );

  const imagePanel = (
    <div className="bg-surface-muted relative min-h-[280px] @lg:min-h-full">
      {hasFeaturedImage && heroImageOptional1 ? (
        <ImageWrapper
          image={featuredImageField}
          className="absolute inset-0 h-full w-full object-cover"
          wrapperClass="absolute inset-0 h-full w-full"
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
      ) : (
        <div className="bg-surface-muted absolute inset-0" />
      )}
    </div>
  );

  return (
    <section className={cn(heroVariants({ colorScheme }), [params?.styles && params.styles])}>
      <div
        className={cn(
          'grid min-h-[400px] @lg:min-h-[480px]',
          isImageLeft ? '@lg:grid-cols-[3fr_2fr]' : '@lg:grid-cols-[2fr_3fr]'
        )}
      >
        {isImageLeft ? (
          <>
            {imagePanel}
            {contentPanel}
          </>
        ) : (
          <>
            {contentPanel}
            {imagePanel}
          </>
        )}
      </div>
    </section>
  );
};

export const Default: React.FC<HeroProps> = (props) => (
  <HeroSplit {...props} imagePosition="right" />
);

export const ImageLeft: React.FC<HeroProps> = (props) => (
  <HeroSplit {...props} imagePosition="left" />
);
