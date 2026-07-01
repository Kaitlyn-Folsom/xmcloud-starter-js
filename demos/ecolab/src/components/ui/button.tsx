import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
        tertiary: 'bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover',
        ghost: 'text-foreground hover:bg-secondary hover:text-primary',
        link: 'text-primary underline-offset-4 hover:text-primary-hover hover:underline',
        topic:
          'h-auto w-full justify-between gap-4 rounded-sm border-0 border-t-4 border-t-primary bg-white px-5 py-4 md:py-5 text-left font-heading text-md font-bold text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors hover:bg-white hover:text-primary whitespace-normal [&_svg]:text-foreground [&_svg]:transition-colors hover:[&_svg]:text-primary',
        'rounded-white':
          'rounded-full bg-white text-primary hover:bg-gray-100 transition-all duration-300',
      },
      size: {
        default: 'px-6 py-2.5',
        sm: 'h-9 rounded-full px-4 text-xs',
        lg: 'h-12 rounded-full px-8 text-base',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
