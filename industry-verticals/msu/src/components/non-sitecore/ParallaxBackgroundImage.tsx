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
  const imageSrc = props.BackgroundImage?.value?.src ?? '';

  return (
    <>
      {isPageEditing ? (
        <Image field={props.BackgroundImage} className="background-image" />
      ) : (
        <ParallaxBanner
          layers={[
            {
              image: imageSrc,
              speed: -15,
            },
          ]}
          className="parallax-background-image"
        />
      )}
      <div className="parallax-background-overlay" aria-hidden="true" />
    </>
  );
};
