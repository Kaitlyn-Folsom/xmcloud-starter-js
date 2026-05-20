import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_a]:no-underline',
  {
    variants: {
      variant: {
        default:
          'bg-accent text-white hover:bg-accent/90 shadow-none [&_a]:text-white hover:[&_a]:text-white [&_svg]:text-white',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 [&_a]:text-white hover:[&_a]:text-white [&_svg]:text-white',
        outline:
          'border border-primary bg-background text-primary hover:bg-secondary',
        secondary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        tertiary: 'bg-secondary text-primary hover:bg-secondary-hover border border-border',
        ghost: 'text-primary hover:bg-secondary hover:text-primary',
        link: 'text-primary underline-offset-4 hover:underline font-normal',
        topic:
          'bg-secondary text-primary hover:bg-secondary-hover font-body px-4 py-2 text-sm font-semibold transition-colors',
        'rounded-white': 'bg-white text-primary hover:bg-secondary transition-all duration-200',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
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
