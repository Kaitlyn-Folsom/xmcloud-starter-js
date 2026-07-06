'use client';

import { useEffect, useState } from 'react';
import { Text, RichText, LinkField } from '@sitecore-content-sdk/nextjs';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { cn } from '@/lib/utils';
import { PageHeaderProps } from './page-header.props';
import { VideoBase as Video } from '@/components/video/Video';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { ButtonBase } from '@/components/button-component/ButtonComponent';
import { ButtonVariants } from '@/enumerations/ButtonStyle.enum';
import { cva } from 'class-variance-authority';
import { getDatasource, getFieldValue } from '@/lib/component-props';

const getEmptyLinkField = (): LinkField => ({
  value: { href: '', text: '' },
});

const pageHeaderPanelClasses = cva(
  'flex flex-col justify-center gap-6 px-6 py-10 @md:px-10 @lg:px-16 @lg:py-20',
  {
    variants: {
      colorScheme: {
        default: 'bg-primary text-primary-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
      },
    },
  },
);

export const Default: React.FC<PageHeaderProps> = ({ fields, params, page }) => {
  const datasource = getDatasource(fields);
  const { imageRequired, videoOptional, link1, logoText, children } =
    datasource || {};
  const { pageHeaderTitle, pageTitle, pageSubtitle } =
    fields?.data?.externalFields || {};

  const imageField = getFieldValue(imageRequired);
  const videoField = getFieldValue(videoOptional);
  const link1Field = getFieldValue(link1);
  const logoTextField = getFieldValue(logoText);
  const title = getFieldValue(pageHeaderTitle) ?? getFieldValue(pageTitle);
  const subtitle = getFieldValue(pageSubtitle);

  const { colorScheme = 'default', darkPlayIcon = '0' } = params;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isPageEditing = page.mode.isEditing;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (!fields) {
    return <NoDataFallback componentName="PageHeader" />;
  }

  return (
    <section className="@container overflow-hidden">
      <div className="@md:grid-cols-2 grid grid-cols-1 items-stretch">
        {/* Left: content panel */}
        <div className={cn(pageHeaderPanelClasses({ colorScheme }))}>
          <AnimatedSection
            reducedMotion={prefersReducedMotion}
            isPageEditing={isPageEditing}
          >
            <Text
              tag="h1"
              className="@md:text-4xl @lg:text-5xl font-heading text-white text-2xl font-bold leading-tight"
              field={title}
            />
          </AnimatedSection>
          {(subtitle?.value || isPageEditing) && (
            <AnimatedSection
              reducedMotion={prefersReducedMotion}
              isPageEditing={isPageEditing}
            >
              <RichText
                className="max-w-[504px] text-base font-medium leading-relaxed opacity-90"
                field={subtitle}
              />
            </AnimatedSection>
          )}
          {(link1Field?.value?.href || isPageEditing) && (
            <AnimatedSection
              reducedMotion={prefersReducedMotion}
              isPageEditing={isPageEditing}
            >
              <ButtonBase
                buttonLink={link1Field || getEmptyLinkField()}
                variant={ButtonVariants.ROUNDED_WHITE}
                isPageEditing={isPageEditing}
                className="w-fit"
              />
            </AnimatedSection>
          )}
          {children?.results && (
            <AnimatedSection
              reducedMotion={prefersReducedMotion}
              isPageEditing={isPageEditing}
            >
              <div className="@md:mt-6 mt-2 flex max-w-[504px] flex-col gap-6">
                <Text
                  tag="p"
                  className="letter-spacing-[-0.4%] line-height-[24px] text-base font-medium"
                  field={logoTextField}
                />
                <div className="flex flex-nowrap items-center justify-between gap-8">
                  {children.results.map((logo, index) => (
                    <div key={index}>
                      <ImageWrapper image={getFieldValue(logo.image)} />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
        {/* Right: media */}
        <AnimatedSection
          reducedMotion={prefersReducedMotion}
          isPageEditing={isPageEditing}
          className="relative min-h-[280px] @md:min-h-full"
        >
          {videoField?.value?.href ? (
            <Video
              fields={{
                video: videoField,
                image: imageField,
              }}
              params={{ darkPlayIcon: darkPlayIcon, useModal: '1' }}
              playButtonClassName="absolute [&_svg]:size-8 [&_svg]:bottom-7 [&_svg]:right-7 [&_svg]:absolute"
            />
          ) : (
            <ImageWrapper
              image={imageField}
              className="h-full w-full object-cover"
              wrapperClass="h-full w-full"
            />
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};
