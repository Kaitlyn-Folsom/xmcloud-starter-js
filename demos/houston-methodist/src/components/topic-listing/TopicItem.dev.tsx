import { ButtonBase } from '@/components/button-component/ButtonComponent';
import { TopicItemProps } from './topic-listing.props';
import { ButtonVariants } from '@/enumerations/ButtonStyle.enum';
import { TopicListingBackgroundTheme } from '@/enumerations/TopicListingBackgroundTheme.enum';
import type { LinkField } from '@sitecore-content-sdk/nextjs';

function resolveTopicButtonVariant(backgroundTheme?: TopicItemProps['backgroundTheme']) {
  return backgroundTheme === TopicListingBackgroundTheme.TRANSPARENT
    ? ButtonVariants.SECONDARY
    : ButtonVariants.TOPIC;
}

export const TopicItem: React.FC<TopicItemProps> = ({
  link,
  backgroundTheme,
  isPageEditing = false,
}) => {
  const buttonVariant = resolveTopicButtonVariant(backgroundTheme);
  const emptyLink: LinkField = { value: { href: '#', text: 'Add link' } };

  if (isPageEditing) {
    return (
      <ButtonBase
        buttonLink={link?.jsonValue ?? emptyLink}
        variant={buttonVariant}
        isPageEditing={true}
      />
    );
  }

  if (!link?.jsonValue?.value?.href) {
    return null;
  }

  return (
    <ButtonBase
      buttonLink={link.jsonValue}
      variant={buttonVariant}
      isPageEditing={false}
    />
  );
};
