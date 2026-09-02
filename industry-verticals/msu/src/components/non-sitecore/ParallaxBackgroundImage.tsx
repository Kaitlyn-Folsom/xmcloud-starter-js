'use client';

import { JSX } from 'react';
import { ImageField, Image, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ParallaxBanner } from 'react-scroll-parallax';

export type ParallaxImageProps = {
  BackgroundImage?: ImageField;
};

export const ParallaxBackgroundImage = (props: ParallaxImageProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <div className="parallax-background-image">
      {isPageEditing ? (
        <Image field={props.BackgroundImage} className="background-image" />
      ) : (
        <ParallaxBanner
          layers={[
            {
              image: `${props.BackgroundImage?.value?.src ?? ''}`,
              speed: -15,
            },
          ]}
        />
      )}
      <div className="parallax-background-overlay" aria-hidden="true" />
    </div>
  );
};
