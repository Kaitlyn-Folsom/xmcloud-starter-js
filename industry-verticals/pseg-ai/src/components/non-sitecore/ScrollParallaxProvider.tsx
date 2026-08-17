'use client';

import { JSX } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

export const ScrollParallaxProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <ParallaxProvider>{children}</ParallaxProvider>;
