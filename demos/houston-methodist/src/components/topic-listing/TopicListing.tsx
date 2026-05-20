import { Meteors } from '@/components/magicui/meteors';
import type React from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cva } from 'class-variance-authority';
import { TopicListingProps } from './topic-listing.props';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { TopicItem } from './TopicItem.dev';
import { TopicListingBackgroundTheme } from '@/enumerations/TopicListingBackgroundTheme.enum';
import { getTopicListingBackgroundTheme } from './topic-listing.util';
import { cn } from '@/lib/utils';

const topicListingSectionClasses = cva(
  '@container relative overflow-hidden py-24 md:pb-[128px] md:pt-28',
  {
    variants: {
      backgroundTheme: {
        [TopicListingBackgroundTheme.DEFAULT]: 'bg-primary text-primary-foreground',
        [TopicListingBackgroundTheme.PRIMARY]: 'bg-primary text-primary-foreground',
        [TopicListingBackgroundTheme.SECONDARY]: 'bg-secondary text-primary',
        [TopicListingBackgroundTheme.LIGHT]: 'hm-section-wash text-primary',
        [TopicListingBackgroundTheme.SHOOTING_STAR]: 'bg-primary text-primary-foreground',
        [TopicListingBackgroundTheme.TRANSPARENT]: 'bg-transparent text-foreground',
      },
    },
    defaultVariants: {
      backgroundTheme: TopicListingBackgroundTheme.DEFAULT,
    },
  }
);

const topicListingTitleClasses = cva(
  'font-heading @sm:text-5xl @md:text-5xl text-4xl font-semibold leading-tight tracking-normal',
  {
    variants: {
      backgroundTheme: {
        [TopicListingBackgroundTheme.DEFAULT]: 'text-white',
        [TopicListingBackgroundTheme.PRIMARY]: 'text-white',
        [TopicListingBackgroundTheme.SECONDARY]: 'text-primary',
        [TopicListingBackgroundTheme.LIGHT]: 'text-primary',
        [TopicListingBackgroundTheme.SHOOTING_STAR]: 'text-white',
        [TopicListingBackgroundTheme.TRANSPARENT]: 'text-foreground',
      },
    },
    defaultVariants: {
      backgroundTheme: TopicListingBackgroundTheme.DEFAULT,
    },
  }
);

export const Default: React.FC<TopicListingProps> = (props) => {
  const { fields, params, rendering, page } = props;
  const { title, children } = fields?.data?.datasource ?? {};

  const mergedParams = {
    ...(rendering?.params as Record<string, unknown> | undefined),
    ...(params as Record<string, unknown> | undefined),
  };
  const backgroundTheme = getTopicListingBackgroundTheme(mergedParams);
  const showMeteors = backgroundTheme === TopicListingBackgroundTheme.SHOOTING_STAR;

  if (fields) {
    return (
      <div
        data-component="TopicListing"
        data-background-theme={backgroundTheme}
        className={cn(
          { [mergedParams.styles as string]: mergedParams.styles },
          topicListingSectionClasses({ backgroundTheme })
        )}
        data-class-change
      >
        {showMeteors && (
          <div
            className="absolute inset-0 z-10"
            style={
              {
                '--meteor-color': '255, 255, 255',
                '--meteor-opacity': '0.6',
              } as React.CSSProperties
            }
          >
            <Meteors
              number={40}
              minDelay={0.2}
              maxDelay={1.5}
              minDuration={18}
              maxDuration={38}
              angle={310}
              size="3"
            />
          </div>
        )}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 text-center md:gap-24">
            <div className="flex max-w-4xl flex-col items-center gap-4">
              {title && (
                <Text
                  tag="h2"
                  field={title?.jsonValue}
                  className={topicListingTitleClasses({ backgroundTheme })}
                />
              )}
            </div>
            {children?.results && (
              <div className="flex flex-wrap items-center justify-center gap-6">
                {children.results.map((topic, index) => (
                  <TopicItem
                    key={index}
                    {...topic}
                    backgroundTheme={backgroundTheme}
                    isPageEditing={page?.mode?.isEditing}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <NoDataFallback componentName="Topic Listing" />;
};
