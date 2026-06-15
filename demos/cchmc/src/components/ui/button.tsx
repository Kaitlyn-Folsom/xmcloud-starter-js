import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-semibold uppercase tracking-wide ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-foreground/20 bg-background text-foreground hover:bg-secondary hover:text-foreground',
        secondary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
        tertiary: 'bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover',
        ghost: 'hover:bg-secondary hover:text-foreground normal-case tracking-normal font-medium',
        link: 'text-primary underline-offset-4 hover:underline normal-case tracking-normal font-medium',
        topic:
          'bg-accent text-accent-foreground font-heading rounded-none px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-accent-hover',
        'rounded-white':
          'rounded-none bg-white text-foreground hover:bg-secondary transition-all duration-300 normal-case tracking-normal',
        magenta: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        green: 'bg-accent text-accent-foreground hover:bg-accent-hover',
        teal: 'bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover',
      },
      size: {
        default: 'min-h-11 px-6 py-2.5',
        sm: 'h-9 px-4 text-xs',
        lg: 'min-h-12 px-8 text-base',
        icon: 'h-10 w-10',
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
