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
export const heroVariants = cva('hero @container py-24 relative w-full overflow-hidden', {
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
          'hero @container relative w-full overflow-hidden py-24',
          !hasFeature1Media && heroVariants({ colorScheme }),
          hasFeature1Media && 'min-h-[70vh]',
          params?.styles && params.styles
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          {hasFeature1Media ? (
            <>
              <MediaSection
                video={heroVideoOptional1?.value?.href}
                image={heroImageOptional1}
                className="absolute inset-0 min-h-full min-w-full rounded-none object-cover object-center @lg:rounded-none"
                pause={!isPlaying}
                reducedMotion={isPageEditing || prefersReducedMotion}
              />
              <div className="absolute inset-0 bg-black/30" aria-hidden />
            </>
          ) : null}
        </div>

        <div
          className={cn(
            'relative z-10 mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 text-center xl:px-8',
            hasFeature1Media && heroForegroundVariants({ colorScheme })
          )}
        >
          <AnimatedSection
            direction="up"
            className="flex w-full flex-col items-center gap-3 text-center"
            isPageEditing={isPageEditing}
          >
            {(titleRequired?.value || isPageEditing) && (
              <Text
                tag="h1"
                field={titleRequired}
                className="font-heading @lg:text-7xl @lg:leading-[90px] basis-1/2 text-5xl font-normal leading-[60px] text-accent"
                style={{fontFamily: 'serif'}}
              />
            )}
            <div className="@lg:gap-10 flex max-w-3xl basis-1/2 flex-col items-center gap-8">
              {(descriptionOptional?.value || isPageEditing) && (
                <Text
                  tag="p"
                  className={cn(
                    'font-body line-height-[26px] text-medium font-base @md:text-xl text-lg text-white'
                  )}
                  field={descriptionOptional}
                />
              )}
              {linkOptional && (
                <div>
                  <EditableButton
                    buttonLink={linkOptional}
                    className={
                      colorScheme === 'primary'
                        ? 'bg-accent font-bold text-accent-foreground rounded-full hover:bg-accent/90'
                        : 'rounded-full font-bold'
                    }
                    isPageEditing={isPageEditing}
                    contextTitle={titleRequired?.value}
                  />
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {!prefersReducedMotion && (
          <Button
            variant="link"
            size="icon"
            onClick={() => setIsPlaying((previousState) => !previousState)}
            className="absolute bottom-2 right-2 z-20"
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
      <section className={cn(heroVariants({ colorScheme }), params?.styles)}>
        <div className="grid gap-20">
          {/* Hero content */}
          <div className="mx-auto w-full max-w-screen-xl px-10 xl:px-8">
            <AnimatedSection
              direction="up"
              className="@lg:flex-row @lg:items-center @lg:gap-10 flex flex-col items-stretch gap-3"
              isPageEditing={isPageEditing}
            >
              {(titleRequired?.value || isPageEditing) && (
                <Text
                  tag="h1"
                  field={titleRequired}
                  className="font-heading @lg:text-8xl @lg:leading-[90px] basis-1/2 text-5xl font-normal leading-[60px]"
                />
              )}
              <div className="@lg:gap-10 flex basis-1/2  flex-col gap-8 ">
                {(descriptionOptional?.value || isPageEditing) && (
                  <Text
                    tag="p"
                    className={cn(
                      'font-body line-height-[26px] text-medium font-base @md:text-xl text-lg text-white',
                    )}
                    field={descriptionOptional}
                  />
                )}
                {linkOptional && (
                  <div>
                    <EditableButton
                      buttonLink={linkOptional}
                      className={
                        colorScheme === 'primary'
                          ? 'bg-accent font-semibold text-accent-foreground rounded-full hover:bg-accent/90'
                          : 'rounded-full'
                      }
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
            <div className="@lg:gap-8 @lg:min-w-[120%] mx-auto flex min-w-[110%]  items-start gap-4 px-4">
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional1?.value?.href}
                  image={heroImageOptional1}
                  className="aspect-280/356 relative"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional2?.value?.href}
                  image={heroImageOptional2}
                  className="aspect-280/196 relative"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional3?.value?.href}
                  image={heroImageOptional3}
                  className="aspect-280/356 relative"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional4?.value?.href}
                  image={heroImageOptional4}
                  className="aspect-280/356 relative"
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
            variant="link"
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
