'use client';

import { useEffect, useState } from 'react';
import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { cn } from '@/lib/utils';
import { PageHeaderProps } from './page-header.props';
import { VideoBase as Video } from '@/components/video/Video';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { cva } from 'class-variance-authority';

const pageHeaderComponentClasses = cva('@container my-10 px-4 @xl:px-8', {
  variants: {
    colorScheme: {
      default: 'bg-transparent',
      light: 'hm-section-wash py-10 @md:py-12',
      dark: 'bg-dark py-10 text-dark-foreground @md:py-12',
    },
  },
  defaultVariants: {
    colorScheme: 'default',
  },
});

const pageHeaderTitleClasses = cva(
  'font-heading @md:text-4xl text-pretty text-3xl font-bold leading-tight tracking-tight',
  {
    variants: {
      colorScheme: {
        default: 'text-primary',
        light: 'text-primary',
        dark: 'text-dark-foreground',
      },
    },
    defaultVariants: {
      colorScheme: 'default',
    },
  }
);

const pageHeaderSubtitleClasses = cva(
  'line-height[26px] max-w-[547px] text-lg font-medium tracking-tight',
  {
    variants: {
      colorScheme: {
        default: 'text-foreground',
        light: 'text-foreground',
        dark: 'text-dark-foreground [&_a]:text-dark-foreground',
      },
    },
    defaultVariants: {
      colorScheme: 'default',
    },
  }
);

export const Default: React.FC<PageHeaderProps> = ({
  fields,
  params,
  page,
}) => {
  const { imageRequired, videoOptional, logoText, children } =
    fields?.data?.datasource || {};
  const { pageHeaderTitle, pageTitle, pageSubtitle } =
    fields?.data?.externalFields || {};

  const title = pageHeaderTitle?.jsonValue ?? pageTitle?.jsonValue;
  const subtitle = pageSubtitle?.jsonValue;

  const { colorScheme = 'default', darkPlayIcon = '0' } = params;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isPageEditing = page.mode.isEditing;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (fields) {
    const containerClasses = cn(pageHeaderComponentClasses({ colorScheme }));

    return (
      <section className={containerClasses}>
        <div className="@md:grid-cols-2 @lg:gap-12 mx-auto grid w-full max-w-screen-xl grid-cols-1 items-center gap-8">
          {/* Left: title, subtitle, optional logos */}
          <div className="flex flex-col justify-center gap-6">
            <AnimatedSection
              reducedMotion={prefersReducedMotion}
              isPageEditing={isPageEditing}
            >
              <Text
                tag="h1"
                className={pageHeaderTitleClasses({ colorScheme })}
                field={title}
              />
            </AnimatedSection>
            {(subtitle?.value || isPageEditing) && (
              <AnimatedSection
                reducedMotion={prefersReducedMotion}
                isPageEditing={isPageEditing}
              >
                <RichText
                  className={pageHeaderSubtitleClasses({ colorScheme })}
                  field={subtitle}
                />
              </AnimatedSection>
            )}
            {children?.results && (
              <AnimatedSection
                reducedMotion={prefersReducedMotion}
                isPageEditing={isPageEditing}
              >
                <div className="@md:mt-4 mt-4 flex max-w-[504px] flex-col gap-6">
                  <Text
                    tag="p"
                    className="letter-spacing-[-0.4%] line-height-[24px] text-base font-medium"
                    field={logoText?.jsonValue}
                  />
                  <div className="flex flex-nowrap items-center justify-between gap-8">
                    {children.results.map((logo, index) => (
                      <div key={index}>
                        <ImageWrapper image={logo.image?.jsonValue} />
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
          {/* Right: image or video */}
          <div>
            <AnimatedSection
              reducedMotion={prefersReducedMotion}
              isPageEditing={isPageEditing}
            >
              <div className="@md:rounded-[22px] relative overflow-hidden rounded-xl">
                {videoOptional?.jsonValue?.value?.href ? (
                  <Video
                    fields={{
                      video: videoOptional?.jsonValue,
                      image: imageRequired?.jsonValue,
                    }}
                    params={{ darkPlayIcon: darkPlayIcon, useModal: '1' }}
                    playButtonClassName="absolute [&_svg]:size-8  [&_svg]:bottom-7 [&_svg]:right-7 [&_svg]:absolute"
                  />
                ) : (
                  <ImageWrapper image={imageRequired?.jsonValue} />
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    );
  }
  return <NoDataFallback componentName="PageHeader" />;
};
