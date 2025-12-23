'use client';

import { Text, Image, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Button } from '@/components/ui/button';
import { HeroProps } from './hero.props';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define heroVariants using class-variance-authority for styling
export const heroVariants = cva('hero relative w-full overflow-hidden', {
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

export const Default: React.FC<HeroProps> = ({ fields, params, page }) => {
  const {
    title,
    description, // Not displayed but stored in data
    bannerCTA, // Used as first CTA
    searchLink,
    image,
    badge
  } = fields || {};

  const isPageEditing = page.mode.isEditing;
  const { colorScheme } = params;

  if (fields) {
    return (
      <section className={cn(heroVariants({ colorScheme }), [params?.styles && params.styles])}>
        {/* Full-width background image with gradient overlay */}
        {(image?.value?.src || isPageEditing) && (
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <Image
                field={image}
                className="h-full w-full object-cover"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 112, .95) 0, rgba(21, 46, 169, 0) 100%)',
                }}
              />
            </div>
          </div>
        )}
        
        {/* Hero Content Section */}
        <div className="relative z-10 mx-auto w-full max-w-8xl px-4 py-12 md:py-16 lg:px-10 lg:py-24">
          <div className="max-w-7xl">
            {/* Eyebrow - Not displayed but stored in data */}
            {badge && (
              <Text
                field={badge}
                className="sr-only"
                tag="span"
              />
            )}

            {/* Title */}
            {(title?.value || isPageEditing) && (
              <Text
                tag="h1"
                field={title}
                className="font-heading font-normal text-4xl text-white max-w-[75%] md:text-5xl lg:text-6xl xl:text-7xl"
                style={{
                  lineHeight: '1.26786',
                  letterSpacing: '-0.56px',
                }}
              />
            )}

            {/* Subtitle */}
            {(description?.value || isPageEditing) && (
              <Text
                tag="h2"
                className="font-body text-white max-w-[60%]"
                style={{
                  fontSize: '2rem',
                  lineHeight: '1.5',
                  letterSpacing: '-0.32px',
                }}
                field={description}
              />
            )}

            {/* CTAs */}
            {(bannerCTA || searchLink || isPageEditing) && (
              <div className="flex flex-wrap gap-4 pt-6">
                {bannerCTA && (
                  <Button
                    variant="primary-open-blue"
                    asChild
                  >
                    {isPageEditing ? (
                      <SitecoreLink field={bannerCTA} editable={true} />
                    ) : (
                      <SitecoreLink field={bannerCTA} editable={false}>
                        {bannerCTA?.value?.text}
                      </SitecoreLink>
                    )}
                  </Button>
                )}
                {searchLink && (
                  <Button
                    variant="primary-green"
                    asChild
                  >
                    {isPageEditing ? (
                      <SitecoreLink field={searchLink} editable={true} />
                    ) : (
                      <SitecoreLink field={searchLink} editable={false}>
                        {searchLink?.value?.text}
                      </SitecoreLink>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Hero" />;
};

export const ImageRight: React.FC<HeroProps> = ({ fields, params, page }) => {
  const {
    title,
    description,
    bannerCTA,
    searchLink,
    image,
    badge
  } = fields || {};

  const isPageEditing = page.mode.isEditing;

  if (fields) {
    return (
      <section className="relative w-full overflow-hidden lg:min-h-[600px] flex items-center">
        {/* Full-width background image */}
        {(image?.value?.src || isPageEditing) && (
          <div className="absolute inset-0 z-0">
            <Image
              field={image}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Gradient overlay - covers ~60% from left, fully rounded, with opacity */}
        <div 
          className="absolute left-0 top-[-50%] bottom-[-20%] w-[90%] lg:w-[65%] z-10 rounded-r-[47%] lg:rounded-r-[48%]"
          style={{
            background: 'linear-gradient(95deg, rgba(0, 0, 112, 1) 0%, rgba(21, 46, 169, .95) 100%);',
          }}
        />
        
        {/* Content Container */}
        <div className="relative z-20 w-full px-4 py-12 md:py-16 lg:px-10 lg:py-24 max-w-8xl mx-auto">
          {/* Text Content Container */}
          <div className="max-w-2xl">
            <div className="relative">
              {/* Eyebrow/Badge with green underline */}
              {(badge?.value || isPageEditing) && (
                <div className="mb-4">
                  <Text
                    field={badge}
                    tag="span"
                    className="text-white text-sm md:text-base font-medium uppercase tracking-wide relative inline-block pb-2"
                    style={{
                      borderBottom: '2px solid #32c858',
                    }}
                  />
                </div>
              )}

              {/* Title */}
              {(title?.value || isPageEditing) && (
                <Text
                  tag="h1"
                  field={title}
                  className="font-heading font-normal text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6"
                  style={{
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em',
                  }}
                />
              )}

              {/* Description */}
              {(description?.value || isPageEditing) && (
                <Text
                  tag="p"
                  field={description}
                  className="font-body text-white text-lg md:w-[70%] lg:w-full md:text-xl lg:text-2xl mb-8"
                  style={{
                    lineHeight: '1.5',
                  }}
                />
              )}

              {/* CTA Button - White with black text */}
              {(bannerCTA || isPageEditing) && (
                <div className="pt-2">
                  {bannerCTA && (
                    <Button
                      variant="ghost"
                      asChild
                      className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-3 font-medium"
                    >
                      {isPageEditing ? (
                        <SitecoreLink field={bannerCTA} editable={true} />
                      ) : (
                        <SitecoreLink field={bannerCTA} editable={false}>
                          {bannerCTA?.value?.text || 'Learn more'}
                        </SitecoreLink>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Hero" />;
};