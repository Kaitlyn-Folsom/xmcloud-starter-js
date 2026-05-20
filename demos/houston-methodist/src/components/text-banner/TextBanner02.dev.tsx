import { TextBannerProps } from './text-banner.props';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/flex/Flex.dev';
import { Link, Text } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { getDescriptiveLinkText } from '@/utils/link-text';

/* Text Banner 02 – Light blue wash, text centered */

export const Default: React.FC<TextBannerProps> = (props) => {
  const { fields, params, page } = props;

  const { heading, description, link, link2, image } = fields ?? {};
  const { excludeTopMargin } = params ?? {};
  const isPageEditing = page?.mode?.isEditing ?? false;

  const imageSrc = image?.value?.src;
  const hasBackgroundImage = Boolean(imageSrc);
  const backgroundImageStyle = hasBackgroundImage
    ? { '--bg-img': `url(${imageSrc})` }
    : {};

  if (fields) {
    return (
      <section
        className={cn(
          'hm-section-wash relative mt-4 overflow-hidden rounded p-5 text-primary',
          hasBackgroundImage ? 'bg-img-light bg-cover bg-center text-light-foreground' : '',
          {
            'mt-0': excludeTopMargin,
            [props?.params?.styles]: props?.params?.styles,
          },
        )}
        style={backgroundImageStyle as React.CSSProperties}
      >
        <div className="mx-auto flex max-w-lg flex-col items-center space-y-4 px-4 text-center md:px-6">
          <h2>
            <Text field={heading} />
          </h2>
          <p className="text-balance text-base font-medium">
            <Text field={description} />
          </p>
          <div className="flex flex-wrap gap-4">
            {link && (
              <Flex justify="end">
                <Button asChild size="sm">
                  <Link
                    field={
                      // Enhance link with descriptive text for SEO
                      !isPageEditing && link?.value?.text
                        ? {
                            ...link,
                            value: {
                              ...link.value,
                              text: getDescriptiveLinkText(link, heading?.value),
                            },
                          }
                        : link
                    }
                    editable={isPageEditing}
                  />
                </Button>
              </Flex>
            )}
            {link2 && (
              <Flex justify="end">
                <Button asChild variant="secondary" size="sm">
                  <Link
                    field={
                      // Enhance link with descriptive text for SEO
                      !isPageEditing && link2?.value?.text
                        ? {
                            ...link2,
                            value: {
                              ...link2.value,
                              text: getDescriptiveLinkText(link2, heading?.value),
                            },
                          }
                        : link2
                    }
                    editable={isPageEditing}
                  />
                </Button>
              </Flex>
            )}
          </div>
        </div>
      </section>
    );
  }
  return <NoDataFallback componentName="Text Banner: 02" />;
};
