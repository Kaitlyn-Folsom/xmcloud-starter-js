import type React from 'react';
import Link from 'next/link';
import { EditableImageButton } from '@/components/button-component/ButtonComponent';
import { cn } from '@/lib/utils';
import type { FooterSocialLink } from '@/components/global-footer/global-footer.props';

const LinkMarker = () => (
  <span
    className="border-foreground/45 bg-foreground/6 inline-block size-[18px] shrink-0 rounded-[4px] border"
    aria-hidden
  />
);

const connectLinks = [
  { label: 'Patients & Family', href: '#' },
  { label: 'Research & Science', href: '#' },
];

const podcastLink = {
  label: "Kids' Health Uncomplicated Podcast",
  href: '#',
};

type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'linkedin'
  | 'youtube'
  | 'threads'
  | 'tiktok';

function resolveSocialPlatform(href: string, label: string): SocialPlatform | null {
  const key = `${href} ${label}`.toLowerCase();

  if (key.includes('facebook')) return 'facebook';
  if (key.includes('instagram')) return 'instagram';
  if (key.includes('linkedin')) return 'linkedin';
  if (key.includes('youtube')) return 'youtube';
  if (key.includes('threads')) return 'threads';
  if (key.includes('tiktok')) return 'tiktok';
  if (key.includes('twitter') || key.includes('x.com')) return 'x';

  return null;
}

const socialIconPaths: Record<SocialPlatform, React.ReactNode> = {
  facebook: (
    <path
      fill="currentColor"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  ),
  instagram: (
    <path
      fill="currentColor"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  ),
  x: (
    <path
      fill="currentColor"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  ),
  youtube: (
    <path
      fill="currentColor"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    />
  ),
  threads: (
    <path
      fill="currentColor"
      d="M12.186 24h-.007c-3.581-.024-6.334-1.536-8.373-4.776-.824-1.374-1.422-3.033-1.774-4.925-.352-1.892-.528-4.013-.528-6.365 0-2.352.176-4.473.528-6.365.352-1.892.95-3.551 1.774-4.925C5.852 1.536 8.605.024 12.179 0h.014c2.746.018 5.043.725 6.902 2.127 1.26 1.007 2.303 2.352 3.113 4.016.81-1.664 1.853-3.009 3.113-4.016 1.859-1.402 4.156-2.109 6.902-2.127h.014c3.574.024 6.327 1.536 8.373 4.776.824 1.374 1.422 3.033 1.774 4.925.352 1.892.528 4.013.528 6.365 0 2.352-.176 4.473-.528 6.365-.352 1.892-.95 3.551-1.774 4.925-2.046 3.24-4.799 4.752-8.373 4.776h-.007c-2.746-.018-5.043-.725-6.902-2.127-1.26-1.007-2.303-2.352-3.113-4.016-.81 1.664-1.853 3.009-3.113 4.016-1.859 1.402-4.156 2.109-6.902 2.127zM8.25 12.75a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 0 0-7.5 0z"
    />
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M12.525.02c1.31-.02 2.61-.01 3.919-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.07-2.97.82-.88.97-.74 2.49.33 3.27 1.1.87 2.82.63 3.72-.45.56-.66.88-1.51.91-2.37.05-1.52.03-3.04.03-4.55-.01-2.65-.01-5.3-.02-7.96z"
    />
  ),
};

function SocialFallbackIcon({ platform }: { platform: SocialPlatform }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden>
      {socialIconPaths[platform]}
    </svg>
  );
}

interface FooterConnectSectionProps {
  footerSocialLinks?: { results: FooterSocialLink[] };
  isPageEditing: boolean;
}

export const FooterConnectSection: React.FC<FooterConnectSectionProps> = ({
  footerSocialLinks,
  isPageEditing,
}) => (
  <section aria-labelledby="footer-connect-heading">
    <h2
      id="footer-connect-heading"
      className="text-foreground mb-4 text-base font-bold tracking-[0.05em] uppercase"
    >
      Connect With Us
    </h2>

    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {/* {footerSocialLinks?.results?.length ? (
          <div className="flex flex-wrap items-center gap-4">
            {footerSocialLinks.results.map((socialLink, index) => {
              const href = socialLink?.link?.jsonValue?.value?.href;
              const label =
                socialLink?.link?.jsonValue?.value?.title ||
                socialLink?.link?.jsonValue?.value?.text ||
                'Social link';
              const icon = socialLink?.socialIcon?.jsonValue;
              const hasCmsIcon = Boolean(icon?.value?.src);

              if (isPageEditing || hasCmsIcon) {
                return (
                  <EditableImageButton
                    key={href || index}
                    buttonLink={socialLink?.link?.jsonValue}
                    className={cn(
                      'text-foreground/75 hover:text-foreground relative h-6 w-6 min-w-6 p-0 hover:bg-transparent'
                    )}
                    iconClassName="h-6 w-6 object-contain"
                    variant="ghost"
                    size={isPageEditing ? 'default' : 'icon'}
                    isPageEditing={isPageEditing}
                    icon={icon}
                    asIconLink={true}
                  />
                );
              }

              if (!href) return null;

              const platform = resolveSocialPlatform(href, label);

              if (platform) {
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-label={label}
                    className="text-foreground/75 hover:text-foreground inline-flex transition-colors text-md"
                  >
                    <SocialFallbackIcon platform={platform} />
                  </Link>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  className="text-foreground/75 hover:text-foreground inline-flex transition-colors text-md"
                >
                  <LinkMarker />
                </Link>
              );
            })}
          </div>
        ) : null} */}

        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {connectLinks.map(({ label, href }) => (
            <>
            <Link
              key={label}
              href={href}
              className="text-foreground hover:text-primary inline-flex items-center gap-2.5 text-base font-normal transition-colors text-lg"
            >
              <LinkMarker />
              {label}
            </Link>
            <Link
            href={podcastLink.href}
            className="text-foreground hover:text-primary inline-flex items-center gap-2.5 text-base font-normal transition-colors text-lg"
          >
            <LinkMarker />
            {podcastLink.label}
          </Link>
            </>
            
          ))}
        </div>
      </div>

      {/* <Link
        href={podcastLink.href}
        className="text-foreground hover:text-primary inline-flex w-fit items-center gap-2.5 text-base font-normal transition-colors text-lg"
      >
        <LinkMarker />
        {podcastLink.label}
      </Link> */}
    </div>
  </section>
);
