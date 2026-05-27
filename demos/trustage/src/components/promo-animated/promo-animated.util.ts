import { cva } from 'class-variance-authority';

// Background extending to left/right behind image (full-bleed strip)
export const imageBgExtensionRenderingParams = cva(
  ['promo-animated__image-bg-extension', 'absolute', 'bottom-0', 'top-0', 'w-[100vw]'],
  {
    variants: {
      colorScheme: {
        primary: 'bg-primary',
        secondary: 'bg-accent',
      },
    },
    defaultVariants: {
      colorScheme: 'primary',
    },
  }
);
