'use client';

import { AppPlaceholder, ComponentMap, ImageField, NextImage, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX, useState } from 'react';
import PreviewSearch from '../search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '../../_data/customizations';

export type HeaderProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

const SearchControl = (): JSX.Element => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (isSearchOpen) {
    return (
      <div className="header-search">
        <PreviewSearch
          rfkId={PREVIEW_WIDGET_ID}
          isOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
        <button
          type="button"
          className="header-search-close"
          aria-label="Close search"
          onClick={() => setIsSearchOpen(false)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="header-search-toggle"
      aria-label="Open search"
      onClick={() => setIsSearchOpen(true)}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
    </button>
  );
};

const GallagherHeader = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  const containerWidth = props.params?.ContainerWidth?.toLowerCase() || 'xl';

  return (
    <div className={`component header gallagher ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${containerWidth}-fluid`}>
        <div className="header-bar">
          <div className="header-logo">
            <AppPlaceholder
              name="header-left"
              rendering={props.rendering}
              page={page}
              componentMap={props.componentMap}
            />
          </div>
          <div className="header-nav">
            <AppPlaceholder
              name="header-right"
              rendering={props.rendering}
              page={page}
              componentMap={props.componentMap}
            />
            <div className="header-actions">
              <SearchControl />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = GallagherHeader;
export const Gallagher = GallagherHeader;

export const WithLogoImage = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();

  return (
    <div className={`component header ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <NextImage field={props.fields.LogoImage} width={200} height={50} />
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};
