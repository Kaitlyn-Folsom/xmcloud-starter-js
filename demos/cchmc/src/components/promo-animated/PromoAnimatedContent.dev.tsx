'use client';

import type React from 'react';
import { Link, RichText, Text } from '@sitecore-content-sdk/nextjs';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import {
  promoAnimatedContentBoxParams,
  promoAnimatedLinkParams,
  type PromoAnimatedColorScheme,
} from './promo-animated.util';
import type { PromoAnimatedProps } from './promo-animated.props';

type PromoAnimatedContentProps = {
  fields: NonNullable<PromoAnimatedProps['fields']>;
  colorScheme: PromoAnimatedColorScheme;
  contentClassName?: string;
  isPageEditing?: boolean;
  prefersReducedMotion: boolean;
};

export const PromoAnimatedContent: React.FC<PromoAnimatedContentProps> = ({
  fields,
  colorScheme,
  contentClassName,
  isPageEditing,
  prefersReducedMotion,
}) => {
  const { title, description, primaryLink, secondaryLink } = fields;
  const hasPrimaryLink = isPageEditing || primaryLink?.value?.href;
  const hasSecondaryLink = isPageEditing || secondaryLink?.value?.href;

  return (
    <div className={`${promoAnimatedContentBoxParams({ colorScheme, className: contentClassName })} bg-primary/80`}>
      {title && (
        <AnimatedSection reducedMotion={prefersReducedMotion} isPageEditing={isPageEditing}>
          <Text
            tag="h2"
            className="font-heading text-3xl font-bold leading-tight @md:text-4xl @lg:text-[2.5rem] @lg:leading-[1.15] text-white"
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
            className="prose prose-invert mt-5 max-w-none text-lg leading-relaxed [&_p]:text-inherit [&_p]:leading-relaxed"
            field={description}
          />
        </AnimatedSection>
      )}

      {(hasPrimaryLink || hasSecondaryLink) && (
        <AnimatedSection
          delay={600}
          className="mt-8 flex flex-col gap-4"
          reducedMotion={prefersReducedMotion}
          isPageEditing={isPageEditing}
        >
          {hasPrimaryLink && primaryLink && (
            <span className={promoAnimatedLinkParams({ colorScheme })}>
              <Link field={primaryLink} />
              {!isPageEditing && primaryLink?.value?.href && <span aria-hidden>→</span>}
            </span>
          )}
          {hasSecondaryLink && secondaryLink && (
            <span className={promoAnimatedLinkParams({ colorScheme })}>
              <Link field={secondaryLink} />
              {!isPageEditing && secondaryLink?.value?.href && <span aria-hidden>→</span>}
            </span>
          )}
        </AnimatedSection>
      )}
    </div>
  );
};
