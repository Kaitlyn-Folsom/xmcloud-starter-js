import { TextBannerProps } from './text-banner.props';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Flex, FlexItem } from '@/components/flex/Flex.dev';
import { Link, Text } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { getDescriptiveLinkText } from '@/utils/link-text';

export const Default: React.FC<TextBannerProps> = (props) => {
  const { fields, params, page } = props;

  const { heading, description, link } = fields ?? {};
  const { excludeTopMargin } = params ?? {};
  const isPageEditing = page?.mode?.isEditing ?? false;
  if (fields) {
    return (
      <section
        className={cn(
          'p-5',
          'mt-4',
          'bg-gray-100',
          {
            'mt-0': excludeTopMargin,
            [props?.params?.styles]: props?.params?.styles,
          }
        )}
      >
        <Flex
          direction="col"
          align="center"
          justify="center"
          as="div"
          gap="3"
          className="px-4 py-6 text-center"
        >
          <FlexItem basis="full">
            <h3>
              <Text field={heading} />
            </h3>
          </FlexItem>
          <FlexItem basis="full">
            <p className="text-black">
              <Text field={description} />
            </p>
          </FlexItem>
          <FlexItem basis="full">
            {link && (
              <Button asChild>
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
            )}
          </FlexItem>
        </Flex>
      </section>
    );
  }
  return <NoDataFallback componentName="Text Banner" />;
};
