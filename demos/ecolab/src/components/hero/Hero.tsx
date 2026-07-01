'use client';

import { useState, useEffect } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cva } from 'class-variance-authority';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { EditableButton } from '@/components/button-component/ButtonComponent';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { Button } from '@/components/ui/button';
import { Default as MediaSection } from '@/components/media-section/MediaSection.dev';
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

export const Default: React.FC<HeroProps> = ({ fields, params, page }) => {
  const datasource = getDatasource(fields);

  const {
    titleRequired,
    descriptionOptional,
    linkOptional,
    heroVideoOptional1,
    heroImageOptional1,
    heroVideoOptional2,
    heroImageOptional2,
    heroVideoOptional3,
    heroImageOptional3,
    heroVideoOptional4,
    heroImageOptional4,
  } = datasource || {};
  const titleField = getFieldValue(titleRequired);
  const descriptionField = getFieldValue(descriptionOptional);
  const linkField = getFieldValue(linkOptional);
  const heroVideoField1 = getFieldValue(heroVideoOptional1);
  const heroImageField1 = getFieldValue(heroImageOptional1);
  const heroVideoField2 = getFieldValue(heroVideoOptional2);
  const heroImageField2 = getFieldValue(heroImageOptional2);
  const heroVideoField3 = getFieldValue(heroVideoOptional3);
  const heroImageField3 = getFieldValue(heroImageOptional3);
  const heroVideoField4 = getFieldValue(heroVideoOptional4);
  const heroImageField4 = getFieldValue(heroImageOptional4);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isPageEditing = page.mode.isEditing;

  const { colorScheme = 'primary' } = params;
  const [isPlaying, setIsPlaying] = useState(true);

  const isDarkHero = colorScheme === 'primary' || colorScheme === 'dark';
  const primaryMedia = heroImageField1 || heroVideoField1;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    setIsPlaying(!mediaQuery.matches);
  }, []);

  if (datasource) {
    return (
      <section className={cn(heroVariants({ colorScheme }), [params?.styles && params.styles])}>
        <div className="@lg:grid-cols-2 grid min-h-[480px] @lg:min-h-[560px]">
          {/* Content panel — Ecolab split hero */}
          <div
            className={cn(
              'ecolab-dot-pattern flex flex-col justify-center px-6 py-16 @md:px-12 @lg:px-16 @xl:px-20',
              isDarkHero ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
            )}
          >
            <AnimatedSection direction="up" isPageEditing={isPageEditing}>
              {(titleField?.value || isPageEditing) && (
                <Text
                  tag="h1"
                  field={titleField}
                  className="font-heading mb-6 text-4xl font-bold leading-tight tracking-tight @md:text-5xl @lg:text-6xl"
                />
              )}
              {(descriptionField?.value || isPageEditing) && (
                <Text
                  tag="p"
                  className={cn(
                    'font-body mb-8 max-w-lg text-lg leading-relaxed @md:text-xl',
                    isDarkHero ? 'text-primary-foreground/90' : 'text-muted-foreground'
                  )}
                  field={descriptionField}
                />
              )}
              {linkField && (
                <div className="flex flex-wrap gap-4">
                  <EditableButton
                    buttonLink={linkField}
                    className={
                      isDarkHero
                        ? 'rounded-full bg-white text-primary hover:bg-gray-100'
                        : 'rounded-full'
                    }
                    isPageEditing={isPageEditing}
                    contextTitle={titleField?.value}
                  />
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Media panel */}
          <div className="bg-surface-muted relative min-h-[280px] @lg:min-h-full">
            {primaryMedia ? (
              <MediaSection
                video={heroVideoField1?.value?.href}
                image={heroImageField1}
                className="absolute inset-0 h-full w-full object-cover"
                pause={!isPlaying}
                reducedMotion={isPageEditing || prefersReducedMotion}
              />
            ) : (
              <div className="from-primary/20 to-accent/30 absolute inset-0 bg-gradient-to-br" />
            )}
          </div>
        </div>

        {/* Secondary media strip — industry carousel feel */}
        {(heroImageField2 || heroVideoField2 || heroImageField3 || heroVideoField3) && (
          <div className="bg-background border-border border-t py-8">
            <div className="mx-auto flex max-w-screen-xl items-center justify-center gap-4 overflow-x-auto px-4 @md:gap-6 @xl:px-8">
              {[heroImageField2, heroImageField3, heroImageField4].map((image, index) => {
                const videoField = [heroVideoField2, heroVideoField3, heroVideoField4][index];
                if (!image && !videoField?.value?.href) return null;
                return (
                  <div
                    key={index}
                    className="border-border relative aspect-[4/3] w-[200px] shrink-0 overflow-hidden rounded-md border @md:w-[280px]"
                  >
                    <MediaSection
                      video={videoField?.value?.href}
                      image={image}
                      className="h-full w-full object-cover"
                      pause={!isPlaying}
                      reducedMotion={isPageEditing || prefersReducedMotion}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!prefersReducedMotion && (heroVideoField1 || heroVideoField2) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying((previousState) => !previousState)}
            className="absolute bottom-4 right-4 bg-white/80 hover:bg-white"
            aria-label={isPlaying ? 'Pause Ambient Video' : 'Play Ambient'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        )}
      </section>
    );
  }

  return <NoDataFallback componentName="Hero" />;
};
