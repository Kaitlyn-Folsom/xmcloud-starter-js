'use client';

import type React from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { EditableButton } from '@/components/button-component/ButtonComponent';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { HeroProps } from './hero.props';

type JsonField<T> = { jsonValue?: T };

type HeroAlign = 'left' | 'right';
type HeroLayoutMode = 'overlay' | 'split';

interface HeroLayoutProps extends HeroProps {
  layout?: HeroLayoutMode;
  align?: HeroAlign;
}

function resolveField<T>(flat?: T, nested?: JsonField<T>): T | undefined {
  return nested?.jsonValue ?? flat;
}

function useHeroFields(fields: HeroProps['fields'], isPageEditing: boolean) {
  const datasource = fields?.data?.datasource;

  const titleRequired = resolveField(fields?.titleRequired, datasource?.titleRequired);
  const descriptionOptional = resolveField(
    fields?.descriptionOptional,
    datasource?.descriptionOptional
  );
  const linkOptional = resolveField(fields?.linkOptional, datasource?.linkOptional);
  const featureOneImage = resolveField(fields?.heroImageOptional1, datasource?.heroImageOptional1);

  const hasBackgroundImage = Boolean(featureOneImage?.value?.src);

  return {
    titleRequired,
    descriptionOptional,
    linkOptional,
    featureOneImage,
    showBackground: hasBackgroundImage || isPageEditing,
  };
}

interface HeroContentPanelProps {
  titleRequired?: Field<string>;
  descriptionOptional?: Field<string>;
  linkOptional?: LinkField;
  isPageEditing: boolean;
  className?: string;
}

const HeroContentPanel: React.FC<HeroContentPanelProps> = ({
  titleRequired,
  descriptionOptional,
  linkOptional,
  isPageEditing,
  className,
}) => (
  <div className={cn('bg-[#ba508e] text-primary-foreground px-8 py-10 md:px-10 md:py-12', className)}>
    {(titleRequired?.value || isPageEditing) && (
      <Text
        tag="h1"
        field={titleRequired}
        className="font-heading text-2xl leading-tight font-normal text-white md:text-3xl lg:text-4xl"
      />
    )}

    {(descriptionOptional?.value || isPageEditing) && (
      <Text
        tag="p"
        field={descriptionOptional}
        className="mt-4 text-base leading-relaxed font-normal text-white md:text-lg"
      />
    )}

    {linkOptional && (
      <div className="mt-6">
        <EditableButton
          buttonLink={linkOptional}
          className="bg-background text-primary hover:bg-secondary font-semibold"
          isPageEditing={isPageEditing}
          contextTitle={titleRequired?.value}
        />
      </div>
    )}
  </div>
);

const HeroSplitLayout: React.FC<HeroLayoutProps> = ({ fields, params, page }) => {
  const isPageEditing = page.mode.isEditing;
  const { titleRequired, descriptionOptional, linkOptional, featureOneImage, showBackground } =
    useHeroFields(fields, isPageEditing);

  if (!fields) {
    return <NoDataFallback componentName="Hero" />;
  }

  return (
    <section className={cn('hero @container w-full', params?.styles)}>
      <div
        className="relative mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden md:min-h-[480px] md:flex-row "
        data-testid="hero-container"
        data-layout="split"
      >
        <HeroContentPanel
          titleRequired={titleRequired}
          descriptionOptional={descriptionOptional}
          linkOptional={linkOptional}
          isPageEditing={isPageEditing}
          className="flex flex-col text-left justify-center w-full items-left md:w-1/2 md:min-h-[480px]"
        />

        {showBackground && (
          <div
            className="relative w-full md:w-1/2 md:min-h-[480px]"
            data-testid="hero-background-image"
          >
            <ImageWrapper
              image={featureOneImage}
              className="aspect-[4/3] h-full w-full object-cover object-center md:absolute md:inset-0 md:aspect-auto"
              priority
              alt=""
            />
          </div>
        )}
      </div>
    </section>
  );
};

const HeroOverlayLayout: React.FC<HeroLayoutProps> = ({
  fields,
  params,
  page,
  align = 'left',
}) => {
  const isPageEditing = page.mode.isEditing;
  const isRightAligned = align === 'right';
  const { titleRequired, descriptionOptional, linkOptional, featureOneImage, showBackground } =
    useHeroFields(fields, isPageEditing);

  if (!fields) {
    return <NoDataFallback componentName="Hero" />;
  }

  return (
    <section className={cn('hero @container w-full', params?.styles)}>
      <div
        className="relative mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden md:block md:min-h-[480px] lg:min-h-[520px]"
        data-testid="hero-container"
        data-layout="overlay"
        data-align={align}
      >
        {showBackground && (
          <div
            className="relative w-full shrink-0 md:absolute md:inset-0"
            aria-hidden
            data-testid="hero-background-image"
          >
            <ImageWrapper
              image={featureOneImage}
              className="aspect-[4/3] w-full object-cover object-center md:absolute md:inset-0 md:aspect-auto md:h-full md:min-h-[480px] lg:min-h-[520px]"
              priority
              alt=""
            />
          </div>
        )}

        <div className="relative z-10 w-full md:absolute md:inset-0 md:flex md:items-center md:px-8 md:py-12">
          <div
            className={cn(
              'flex w-full items-center gap-6 lg:gap-10',
              isRightAligned ? 'md:justify-end' : 'md:justify-start'
            )}
          >
            <HeroContentPanel
              titleRequired={titleRequired}
              descriptionOptional={descriptionOptional}
              linkOptional={linkOptional}
              isPageEditing={isPageEditing}
              className="w-full max-w-none md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Default: React.FC<HeroProps> = (props) => (
  <HeroOverlayLayout {...props} align="left" />
);

export const DefaultInvert: React.FC<HeroProps> = (props) => (
  <HeroOverlayLayout {...props} align="right" />
);

export const ImageLeft: React.FC<HeroProps> = (props) => <HeroSplitLayout {...props} />;
