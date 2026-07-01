import { ButtonBase } from '@/components/button-component/ButtonComponent';
import { TopicItemProps } from './topic-listing.props';
import { ButtonVariants } from '@/enumerations/ButtonStyle.enum';
import { IconName } from '@/enumerations/Icon.enum';
import { getFieldValue } from '@/lib/component-props';
import type { LinkField } from '@sitecore-content-sdk/nextjs';

const topicIcon = { value: IconName.ARROW_RIGHT };

export const TopicItem: React.FC<TopicItemProps> = ({ link, isPageEditing = false }) => {
  const linkField = getFieldValue(link);

  // Create an empty link for editing mode
  const emptyLink: LinkField = { value: { href: '#', text: 'Add link' } };

  const topicItemProps = {
    buttonLink: linkField ?? emptyLink,
    variant: ButtonVariants.TOPIC,
    icon: topicIcon,
    iconClassName: 'h-4 w-4 md:h-5 md:w-5 shrink-0 transition-colors',
    className: 'w-full',
  };

  // In editing mode, we render regardless of link value
  if (isPageEditing) {
    return <ButtonBase {...topicItemProps} isPageEditing={true} />;
  }

  // In normal viewing mode, only render if we have valid link data
  if (!linkField?.value?.href) {
    return null;
  }

  return <ButtonBase {...topicItemProps} buttonLink={linkField} isPageEditing={false} />;
};
