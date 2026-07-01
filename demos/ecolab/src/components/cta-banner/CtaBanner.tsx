import { cva } from 'class-variance-authority';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Text, Link } from '@sitecore-content-sdk/nextjs';
import { getDescriptiveLinkText } from '@/utils/link-text';
import { CtaBannerProps } from './cta-banner.props';

const ctaBannerVariants = cva('w-full mx-auto px-6 py-16 @md:py-20', {
  variants: {
    colorScheme: {
      default: 'bg-surface-muted',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-accent text-accent-foreground',
    },
  },
});

const ctaTitleVariants = cva(
  'mb-4 text-pretty text-3xl font-bold leading-tight tracking-tight @md:text-4xl @lg:text-5xl',
  {
    variants: {
      colorScheme: {
        default: 'text-primary',
        primary: 'text-primary-foreground',
        secondary: 'text-accent-foreground',
      },
    },
  }
);

const ctaButtonVariants = cva('text-sm font-heading font-medium rounded-full', {
  variants: {
    colorScheme: {
      default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
      primary: 'bg-white text-primary hover:bg-gray-100',
      secondary: 'bg-white text-accent hover:bg-gray-100',
    },
  },
});

export const Default: React.FC<CtaBannerProps> = (props) => {
  const isPageEditing = props.page.mode.isEditing;
  const { fields, params } = props;

  if (fields) {
    const { titleRequired, descriptionOptional, linkOptional } = fields || {};
    const colorScheme = params.colorScheme ?? 'secondary';

    return (
      <section className={ctaBannerVariants({ colorScheme })}>
        <div className="mx-auto w-full max-w-4xl @md:text-left text-center">
          <AnimatedSection direction="up" isPageEditing={isPageEditing}>
            <Text tag="h2" className={ctaTitleVariants({ colorScheme })} field={titleRequired} />
            <Text
              tag="p"
              className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed @md:mx-0 @md:text-left"
              field={descriptionOptional}
            />

            {linkOptional && (
              <Button className={ctaButtonVariants({ colorScheme })} asChild>
                <Link
                  field={
                    !isPageEditing && linkOptional?.value?.text
                      ? {
                          ...linkOptional,
                          value: {
                            ...linkOptional.value,
                            text: getDescriptiveLinkText(linkOptional, titleRequired?.value),
                          },
                        }
                      : linkOptional
                  }
                  editable={isPageEditing}
                />
              </Button>
            )}
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="CTA Banner" />;
};
