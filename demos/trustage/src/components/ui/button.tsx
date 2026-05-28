import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        /* TruStage yellow primary CTA */
        default: 'bg-accent text-accent-foreground shadow-sm hover:bg-accent/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border-2 border-primary bg-background text-primary hover:bg-secondary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
        tertiary: 'bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover',
        ghost: 'text-primary hover:bg-secondary',
        link: 'text-primary underline-offset-4 hover:underline',
        topic:
          'bg-accent font-heading rounded-none px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90',
        'rounded-white':
          'rounded-none border-2 border-primary bg-white text-primary shadow-sm transition-all duration-200 hover:bg-secondary',
      },
      size: {
        default: 'px-6 py-2.5',
        sm: 'h-9 rounded-none px-4 text-sm',
        lg: 'h-12 rounded-none px-8 text-base',
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
