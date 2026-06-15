'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { PromoAnimatedProps } from './promo-animated.props';
import { resolvePromoAnimatedColorScheme } from './promo-animated.util';
import { PromoAnimatedEmptyImageEditing } from './PromoAnimatedEmptyImageEditing';
import { PromoAnimatedContent } from './PromoAnimatedContent.dev';

export const PromoAnimatedDefault: React.FC<PromoAnimatedProps> = (props) => {
  const { fields, params, isPageEditing } = props;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (fields) {
    const { image } = fields;
    const colorScheme = resolvePromoAnimatedColorScheme(params.colorScheme);
    console.log('colorScheme', colorScheme);

    return (
      <section data-component="PromoAnimated" className="@container">
        <div
          data-class-change
          className={cn(
            'promo-animated__content-wrapper @md:min-h-112 relative my-8 @md:my-12',
            { [props?.params?.styles]: props?.params?.styles }
          )}
        >
          {image && (
            <div className="promo-animated__image @md:absolute @md:inset-y-0 @md:right-0 @md:w-[68%] w-full">
              <div className="relative @md:min-h-112 h-full w-full">
                <ImageWrapper
                  image={image}
                  className="aspect-16/10 @md:absolute @md:inset-0 @md:aspect-auto h-full w-full object-cover"
                  wrapperClass="relative @md:absolute @md:inset-0 h-full w-full overflow-hidden"
                  emptyFieldEditingComponent={PromoAnimatedEmptyImageEditing}
                  sizes="(min-width: 768px) 68vw, 100vw"
                  priority={true}
                />
              </div>
            </div>
          )}

          <PromoAnimatedContent
            fields={fields}
            colorScheme={colorScheme}
            contentClassName="@md:absolute @md:left-0 @md:top-1/2 @md:max-w-[min(520px,45%)] @md:-translate-y-1/2 @md:-ml-8 @xl:-ml-12 mt-6 @md:mt-0"
            isPageEditing={isPageEditing}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Promo Animated" />;
};
