import { cva } from 'class-variance-authority';

export type PromoAnimatedColorScheme = 'primary' | 'secondary';

export const resolvePromoAnimatedColorScheme = (
  colorScheme?: string | null
): PromoAnimatedColorScheme => {
  return colorScheme === 'secondary' ? 'secondary' : 'primary';
};

export const promoAnimatedContentBoxParams = cva(
  [
    'promo-animated__content',
    'relative',
    'z-10',
    'flex',
    'flex-col',
    'justify-center',
    'p-8',
    '@md:p-12',
    'text-left',
  ],
  {
    variants: {
      colorScheme: {
        primary: 'bg-tertiary/95 text-tertiary-foreground',
        secondary: 'bg-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      colorScheme: 'primary',
    },
  }
);

export const promoAnimatedLinkParams = cva(
  ['inline-flex', 'items-center', 'gap-1.5', 'font-bold', 'text-lg', 'transition-opacity', 'hover:opacity-90'],
  {
    variants: {
      colorScheme: {
        primary: 'text-tertiary-foreground',
        secondary: 'text-primary-foreground',
      },
    },
    defaultVariants: {
      colorScheme: 'primary',
    },
  }
);
