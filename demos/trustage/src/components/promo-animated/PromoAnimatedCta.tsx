'use client';

import type React from 'react';
import { Link, LinkField } from '@sitecore-content-sdk/nextjs';
import { Default as Icon } from '@/components/icon/Icon';
import { IconName } from '@/enumerations/Icon.enum';
import { getDescriptiveLinkText } from '@/utils/link-text';

const linkIsValid = (link: LinkField) =>
  !!link?.value?.text &&
  (!!link?.value?.href || !!link?.value?.url) &&
  link?.value?.href !== 'http://';

interface PromoAnimatedCtaProps {
  buttonLink: LinkField;
  isPageEditing?: boolean;
  contextTitle?: string | null;
}

export const PromoAnimatedCta: React.FC<PromoAnimatedCtaProps> = ({
  buttonLink,
  isPageEditing,
  contextTitle,
}) => {
  if (!isPageEditing && !linkIsValid(buttonLink)) return null;

  const displayText = isPageEditing
    ? buttonLink?.value?.text
    : getDescriptiveLinkText(buttonLink, contextTitle);

  const enhancedButtonLink =
    !isPageEditing && displayText && displayText !== buttonLink?.value?.text
      ? {
          ...buttonLink,
          value: {
            ...buttonLink?.value,
            text: displayText,
          },
        }
      : buttonLink;

  if (isPageEditing) {
    return (
      <span className="inline-flex border border-border">
        <span
          aria-hidden="true"
          className="bg-accent flex items-center justify-center px-3.5 py-3 text-primary"
        >
          <Icon iconName={IconName.ARROW_RIGHT} className="h-4 w-4" isAriaHidden />
        </span>
        <span className="bg-background font-heading flex items-center px-5 py-3 text-sm font-semibold text-primary @md:text-base">
          <Link field={buttonLink} editable={true} />
        </span>
      </span>
    );
  }

  return (
    <Link
      field={enhancedButtonLink}
      editable={isPageEditing}
      className="group inline-flex items-stretch border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span
        aria-hidden="true"
        className="bg-accent flex items-center justify-center px-3.5 py-3 text-primary transition-colors group-hover:bg-accent/90"
      >
        <Icon iconName={IconName.ARROW_RIGHT} className="h-4 w-4" isAriaHidden />
      </span>
      <span className="bg-background font-heading flex items-center px-5 py-3 text-sm font-semibold text-primary transition-colors group-hover:bg-secondary @md:text-base">
        {displayText}
      </span>
    </Link>
  );
};
