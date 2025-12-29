'use client';

import { useState, useEffect, useRef } from 'react';
import { RichText, Text } from '@sitecore-content-sdk/nextjs';
import { debounce } from 'radash';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { MultiPromoItemProps, MultiPromoProps } from './multi-promo.props';
import { Default as MultiPromoItem } from './MultiPromoItem.dev';

export const Default: React.FC<MultiPromoProps> = (props) => {
  const { fields, params, page } = props;
  const { numColumns } = params ?? {};
  const { children } = fields?.data?.datasource ?? {};
  const { title, description } = fields?.data?.datasource || {};
  const [api, setApi] = useState<CarouselApi>();
  const [announcement, setAnnouncement] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPageEditing = page.mode.isEditing;
  // General slide handling
  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      const newIndex = api.selectedScrollSnap();

      // Announce slide change
      setAnnouncement(`Slide ${newIndex + 1} of ${children?.results.length}`);
    });

    // Add mousewheel event listener and keyboard event listener
    const debouncedHandleWheel = debounce({ delay: 100 }, (event: WheelEvent) => {
      if (event.deltaX > 0) {
        api.scrollNext();
      } else if (event.deltaX < 0) {
        api.scrollPrev();
      }
    });

    const debouncedHandleKeyDown = debounce({ delay: 100 }, (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        api?.scrollPrev();
      } else if (event.key === 'ArrowRight') {
        api?.scrollNext();
      }
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent default scrolling behavior
        debouncedHandleKeyDown(event);
      }
    };

    const rootNode = api.rootNode();
    rootNode.addEventListener('keydown', handleKeyDown);
    rootNode.addEventListener('wheel', debouncedHandleWheel);

    return () => {
      rootNode.removeEventListener('keydown', handleKeyDown);
      debouncedHandleKeyDown.cancel();
      rootNode.removeEventListener('wheel', debouncedHandleWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  if (fields) {
    const hasPagesPositionStyles: boolean = props?.params?.styles
      ? props?.params?.styles.includes('position-')
      : false;

    return (
      <div
        data-component="MultiPromo"
        data-class-change
        className={cn(
          'mx-auto max-w-8xl group-[.container--full-bleed]:px-4 xl:group-[.container--full-bleed]:px-8 mt-12 mb-12',
          {
            'position-left': !hasPagesPositionStyles,
            [props?.params?.styles]: props?.params?.styles,
          }
        )}
      >
        {/* Headline Section with Light Grey Background */}
        {title && (
          <div className="bg-gray-100 px-6 py-8 md:px-12 md:py-12 bg-gradient-to-b from-[#f2f2f2] to-[#ffffff]">
            <Text
              tag="h2"
              field={title?.jsonValue}
              className="font-heading text-gray-700 text-3xl font-normal leading-tight tracking-tight md:text-4xl lg:text-5xl"
            />
          </div>
        )}

        {/* Two Column Grid Layout */}
        {children && children.results && children.results.length > 0 && (
          <div className="grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 md:px-12">
            {children.results.map((item: MultiPromoItemProps, index: number) => (
              <MultiPromoItem key={index} isPageEditing={isPageEditing} {...item} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return <NoDataFallback componentName="Multi Promo" />;
};
