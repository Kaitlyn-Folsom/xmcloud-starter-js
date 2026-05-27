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
import { HeroProps } from './hero.props';

// Define heroVariants using class-variance-authority for styling
export const heroVariants = cva('hero @container relative w-full overflow-hidden', {
  variants: {
    colorScheme: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-primary',
      tertiary: 'bg-tertiary text-primary',
      dark: 'bg-dark text-primary',
      light: 'bg-light text-primary',
    },
  },
  defaultVariants: {
    colorScheme: 'light',
  },
});

/** Text colors aligned with heroVariants when the section background is covered by media */
const heroForegroundVariants = cva('', {
  variants: {
    colorScheme: {
      primary: 'text-primary-foreground',
      secondary: 'text-primary',
      tertiary: 'text-primary',
      dark: 'text-primary',
      light: 'text-primary',
    },
  },
  defaultVariants: {
    colorScheme: 'light',
  },
});

function useHeroAmbientMediaState() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    setIsPlaying(!mediaQuery.matches);
  }, []);

  return { prefersReducedMotion, isPlaying, setIsPlaying };
}

export const Default: React.FC<HeroProps> = ({ fields, params, page }) => {
  const {
    titleRequired,
    descriptionOptional,
    linkOptional,
    heroVideoOptional1,
    heroImageOptional1,
  } = fields || {};

  const { prefersReducedMotion, isPlaying, setIsPlaying } = useHeroAmbientMediaState();
  const isPageEditing = page.mode.isEditing;

  const { colorScheme } = params;

  const hasFeature1Media = Boolean(
    heroVideoOptional1?.value?.href || heroImageOptional1?.value?.src
  );

  if (fields) {
    return (
      <section
        className={cn(
          'hero @container relative w-full overflow-hidden',
          !hasFeature1Media && heroVariants({ colorScheme }),
          hasFeature1Media && 'bg-background py-8 @md:py-12',
          params?.styles && params.styles
        )}
      >
        {hasFeature1Media ? (
          /* TruStage asymmetric hero: image left, yellow content panel right */
          <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-stretch gap-0 px-4 @lg:grid-cols-12 @xl:px-8">
            <div className="@lg:col-span-7 relative min-h-[280px] @md:min-h-[400px] @lg:min-h-[480px]">
              <MediaSection
                video={heroVideoOptional1?.value?.href}
                image={heroImageOptional1}
                className="absolute inset-0 h-full w-full rounded-none object-cover object-center"
                pause={!isPlaying}
                reducedMotion={isPageEditing || prefersReducedMotion}
              />
            </div>
            <div className="@lg:col-span-5 @lg:-ml-16 @lg:z-10 flex flex-col justify-center">
              <AnimatedSection
                direction="up"
                className="bg-accent text-accent-foreground flex flex-col gap-6 p-8 @md:p-10 @lg:p-12"
                isPageEditing={isPageEditing}
              >
                {(titleRequired?.value || isPageEditing) && (
                  <Text
                    tag="h1"
                    field={titleRequired}
                    className="font-heading text-primary text-3xl font-bold leading-tight @md:text-4xl @lg:text-5xl"
                  />
                )}
                {(descriptionOptional?.value || isPageEditing) && (
                  <Text
                    tag="p"
                    className="font-body text-primary text-base leading-relaxed @md:text-lg"
                    field={descriptionOptional}
                  />
                )}
                {linkOptional && (
                  <div>
                    <EditableButton
                      buttonLink={linkOptional}
                      className="rounded-md border-2 border-primary bg-white font-semibold text-primary hover:bg-secondary"
                      isPageEditing={isPageEditing}
                      contextTitle={titleRequired?.value}
                    />
                  </div>
                )}
              </AnimatedSection>
            </div>
          </div>
        ) : (
          /* Text-only hero fallback */
          <div
            className={cn(
              'relative z-10 mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 py-16 text-center @md:py-24 xl:px-8',
              heroForegroundVariants({ colorScheme })
            )}
          >
            <AnimatedSection
              direction="up"
              className="flex w-full flex-col items-center gap-6 text-center"
              isPageEditing={isPageEditing}
            >
              {(titleRequired?.value || isPageEditing) && (
                <Text
                  tag="h1"
                  field={titleRequired}
                  className="font-heading text-primary text-4xl font-bold leading-tight @md:text-5xl @lg:text-6xl"
                />
              )}
              <div className="flex max-w-3xl flex-col items-center gap-8">
                {(descriptionOptional?.value || isPageEditing) && (
                  <Text
                    tag="p"
                    className="font-body text-muted-foreground text-lg leading-relaxed @md:text-xl"
                    field={descriptionOptional}
                  />
                )}
                {linkOptional && (
                  <div>
                    <EditableButton
                      buttonLink={linkOptional}
                      className="font-semibold"
                      isPageEditing={isPageEditing}
                      contextTitle={titleRequired?.value}
                    />
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        )}

        {hasFeature1Media && !prefersReducedMotion && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying((previousState) => !previousState)}
            className="text-primary absolute bottom-4 right-4 z-20 bg-white/80 hover:bg-white"
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

export const MultiImage: React.FC<HeroProps> = ({ fields, params, page }) => {
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
  } = fields || {};

  const { prefersReducedMotion, isPlaying, setIsPlaying } = useHeroAmbientMediaState();
  const isPageEditing = page.mode.isEditing;

  const { colorScheme } = params;

  if (fields) {
    return (
      <section className={cn(heroVariants({ colorScheme }), 'bg-background py-12 @md:py-16', params?.styles)}>
        <div className="grid gap-16">
          {/* Hero content */}
          <div className="mx-auto w-full max-w-screen-xl px-4 @xl:px-8">
            <AnimatedSection
              direction="up"
              className="@lg:flex-row @lg:items-end @lg:gap-12 flex flex-col items-stretch gap-6"
              isPageEditing={isPageEditing}
            >
              {(titleRequired?.value || isPageEditing) && (
                <Text
                  tag="h1"
                  field={titleRequired}
                  className="font-heading text-primary @lg:basis-1/2 text-4xl font-bold leading-tight @md:text-5xl @lg:text-6xl"
                />
              )}
              <div className="@lg:gap-8 flex @lg:basis-1/2 flex-col gap-6">
                {(descriptionOptional?.value || isPageEditing) && (
                  <Text
                    tag="p"
                    className="font-body text-muted-foreground text-lg leading-relaxed @md:text-xl"
                    field={descriptionOptional}
                  />
                )}
                {linkOptional && (
                  <div>
                    <EditableButton
                      buttonLink={linkOptional}
                      className="font-semibold"
                      isPageEditing={isPageEditing}
                      contextTitle={titleRequired?.value}
                    />
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
          {/* Hero image/video sections */}
          <div className="relative flex items-center justify-center overflow-x-hidden">
            <div className="@lg:gap-6 mx-auto flex min-w-[110%] items-start gap-4 px-4 @lg:min-w-[120%]">
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional1?.value?.href}
                  image={heroImageOptional1}
                  className="aspect-280/356 relative rounded-none"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional2?.value?.href}
                  image={heroImageOptional2}
                  className="aspect-280/196 relative rounded-none"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional3?.value?.href}
                  image={heroImageOptional3}
                  className="aspect-280/356 relative rounded-none"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional4?.value?.href}
                  image={heroImageOptional4}
                  className="aspect-280/356 relative rounded-none"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Play/Pause button - A11y */}
        {!prefersReducedMotion && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying((previousState) => !previousState)}
            className="absolute bottom-2 right-2"
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
