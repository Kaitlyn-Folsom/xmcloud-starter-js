'use client';

import type { FC } from 'react';
import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Facebook, Linkedin, Twitter, Link, Check, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Text, DateField, RichText, Placeholder } from '@sitecore-content-sdk/nextjs';

import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { Button } from '@/components/ui/button';
import { FloatingDock } from '@/components/floating-dock/floating-dock.dev';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useTranslations } from 'next-intl';
import { dictionaryKeys } from '@/variables/dictionary';
import { formatDateInUTC } from '@/utils/date-utils';
import { Default as Icon } from '@/components/icon/Icon';
import { StructuredData } from '@/components/structured-data/StructuredData';
import {
  generateArticleSchema,
  generatePersonSchema,
} from '@/lib/structured-data/schema';
import { ArticleHeaderDictionaryKeys } from '@/components/article-header/article-header.dictionary';
import type { ComponentRendering } from '@sitecore-content-sdk/nextjs';
import type { ArticleDetailsParams, ArticleDetailsProps } from './article-details.props';
import {
  getArticleDetailsRouteFields,
  hasArticleDetailsContent,
} from './article-details-route-fields';

const ARTICLE_PROMO_PLACEHOLDER = 'article-promo';

/** Resolves the placeholder key from layout data (static or dynamic). */
export const resolveArticlePromoPlaceholderName = (
  rendering: ComponentRendering | undefined,
  params: ArticleDetailsParams | undefined,
): string => {
  const placeholders = rendering?.placeholders;
  const dynamicId = params?.DynamicPlaceholderId;

  if (typeof dynamicId === 'string' && dynamicId.length > 0) {
    const explicitKey = `${ARTICLE_PROMO_PLACEHOLDER}-${dynamicId}`;
    if (placeholders?.[explicitKey]) {
      return explicitKey;
    }
  }

  if (placeholders?.[ARTICLE_PROMO_PLACEHOLDER]) {
    return ARTICLE_PROMO_PLACEHOLDER;
  }

  const matchedKey = placeholders
    ? Object.keys(placeholders).find((key) => key.startsWith(`${ARTICLE_PROMO_PLACEHOLDER}-`))
    : undefined;
  if (matchedKey) {
    return matchedKey;
  }

  return typeof dynamicId === 'string' && dynamicId.length > 0
    ? `${ARTICLE_PROMO_PLACEHOLDER}-${dynamicId}`
    : ARTICLE_PROMO_PLACEHOLDER;
};

const isArticlePromoPlaceholderEmpty = (
  rendering: ComponentRendering | undefined,
  placeholderName: string,
): boolean => {
  const renderings = rendering?.placeholders?.[placeholderName];
  return !Array.isArray(renderings) || renderings.length === 0;
};

const articleBodyRichTextClassName = cn(
  'article-details-body text-primary mx-auto max-w-4xl px-6 py-12',
  '[&_h1]:font-heading [&_h1]:mb-8 [&_h2]:font-heading [&_h2]:mb-6 [&_h3]:mb-5 [&_h4]:mb-4 [&_h5]:mb-3 [&_h6]:mb-3',
  '[&_p]:mb-4 [&_p:last-child]:mb-0',
  '[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-primary',
  '[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6',
  '[&_li]:mb-2 [&_li]:pl-1 [&_ul_ul]:mt-2 [&_ul_ul]:mb-0 [&_ul_ul]:list-[circle]',
  '[&_a]:text-primary [&_a]:underline',
);

export const Default: FC<ArticleDetailsProps> = ({ page, rendering, params }) => {
  const route = page.layout?.sitecore?.route;
  const { title, excerpt, content, featuredImage, readTime, displayDate, author } =
    getArticleDetailsRouteFields(page);

  const hasAuthor = Boolean(
    author?.fields?.personFirstName?.value || author?.fields?.personLastName?.value,
  );

  const isPageEditing = page.mode.isEditing;
  const articlePromoPlaceholderName = resolveArticlePromoPlaceholderName(rendering, params);
  const showArticlePromoPlaceholder =
    isPageEditing || !isArticlePromoPlaceholderEmpty(rendering, articlePromoPlaceholderName);

  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);
  const [forceCollapse] = useState(true);
  const copyNotificationRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const dictionary = {
    ARTICLE_HEADER_BACKTONEWS: t(ArticleHeaderDictionaryKeys.ARTICLE_HEADER_BACKTONEWS),
    ARTICLE_HEADER_AUTHOR_LABEL: t(ArticleHeaderDictionaryKeys.ARTICLE_HEADER_AUTHOR_LABEL),
  };

  if (route && (hasArticleDetailsContent({ title, excerpt, content, featuredImage, readTime, displayDate, author }) || isPageEditing)) {
    const handleShare = (platform: string) => {
      const url = encodeURIComponent(window.location.href);
      const documentTitle = encodeURIComponent(document.title);
      let shareUrl = '';

      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${documentTitle}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${documentTitle}&body=${url}`;
          window.location.href = shareUrl;
          return;
        case 'copy':
          navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
              toast({
                title: 'Link copied!',
                description: 'The link has been copied to your clipboard.',
                duration: 3000,
              });

              setCopySuccess(true);

              if (copyNotificationRef.current) {
                copyNotificationRef.current.textContent = 'Link copied to clipboard';
              }
            })
            .catch((err) => {
              console.error('Failed to copy: ', err);
              toast({
                title: 'Copy failed',
                description: 'Could not copy the link to clipboard.',
                variant: 'destructive',
              });
            });
          return;
      }

      window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    const links = [
      {
        title: 'Share on Facebook',
        icon: (
          <Facebook className="text-primary h-full w-full" aria-hidden="true" />
        ),
        href: '#',
        onClick: () => handleShare('facebook'),
        ariaLabel: 'Share on Facebook',
      },
      {
        title: 'Share on Twitter',
        icon: (
          <Twitter className="text-primary h-full w-full" aria-hidden="true" />
        ),
        href: '#',
        onClick: () => handleShare('twitter'),
        ariaLabel: 'Share on Twitter',
      },
      {
        title: 'Share on LinkedIn',
        icon: (
          <Linkedin className="text-primary h-full w-full" aria-hidden="true" />
        ),
        href: '#',
        onClick: () => handleShare('linkedin'),
        ariaLabel: 'Share on LinkedIn',
      },
      {
        title: 'Share via Email',
        icon: (
          <Mail className="text-primary h-full w-full" aria-hidden="true" />
        ),
        href: '#',
        onClick: () => handleShare('email'),
        ariaLabel: 'Share via Email',
      },
      {
        title: 'Copy Link',
        icon: copySuccess ? (
          <Check className="h-full w-full text-green-500 dark:text-green-400" aria-hidden="true" />
        ) : (
          <Link className="text-primary h-full w-full" aria-hidden="true" />
        ),
        href: '#',
        onClick: () => handleShare('copy'),
        ariaLabel: copySuccess ? 'Link copied' : 'Copy link',
      },
    ];

    const headline = title?.value ? String(title.value) : undefined;
    const description =
      excerpt?.value != null
        ? String(excerpt.value).replace(/<[^>]*>/g, '').trim()
        : headline;

    const articleSchema = headline
      ? generateArticleSchema({
          headline,
          description: description || headline,
          image: featuredImage?.value?.src ? [featuredImage.value.src] : undefined,
          datePublished: displayDate?.value
            ? new Date(String(displayDate.value)).toISOString()
            : undefined,
          dateModified: displayDate?.value
            ? new Date(String(displayDate.value)).toISOString()
            : undefined,
          author: author
            ? {
                name: `${author.fields?.personFirstName?.value || ''} ${
                  author.fields?.personLastName?.value || ''
                }`.trim(),
              }
            : undefined,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        })
      : null;

    const personSchema = author
      ? generatePersonSchema({
          name: `${author.fields?.personFirstName?.value || ''} ${
            author.fields?.personLastName?.value || ''
          }`.trim(),
          jobTitle: author.fields?.personJobTitle?.value,
          image: author.fields?.personProfileImage?.value?.src,
        })
      : null;

    const publishedDateISO = displayDate?.value
      ? new Date(String(displayDate.value)).toISOString()
      : undefined;

    const showFeaturedImage = featuredImage?.value?.src || isPageEditing;

    return (
      <>
        {articleSchema && <StructuredData id="article-schema" data={articleSchema} />}
        {personSchema && <StructuredData id="author-person-schema" data={personSchema} />}
        <header
          className={cn('@container article-details relative mb-[86px] overflow-hidden')}
        >
          <article itemScope={true} itemType="https://schema.org/Article">
            <div className="bg-secondary relative z-0 h-auto overflow-hidden">
              <div
                data-component="white-bar"
                className="@xs:h-[125px] @sm:h-[150px] @md:h-[140px] @lg:h-[90px] @xl:h-[180px] absolute bottom-0 h-[90px] w-full bg-white"
              />

              <div className="z-10 @md:pb-0 relative mx-auto flex h-full flex-col justify-between gap-12 p-0 pb-6 pt-[120px]">
                <div className="flex flex-col items-center gap-6">
                  <Button
                    className="text-primary hover:text-primary absolute left-0 top-[41px] mb-8 inline-flex items-center transition-colors"
                    variant="link"
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.back();
                    }}
                  >
                    <Icon iconName="arrow-left" className="ml-2" />
                    {!dictionary.ARTICLE_HEADER_BACKTONEWS && isPageEditing ? (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-2xl relative"
                        role="alert"
                      >
                        <span className="block sm:inline">
                          Dictionary Entry is Missing for{' '}
                          {dictionaryKeys.ARTICLE_HEADER_BACKTONEWS}
                        </span>
                      </div>
                    ) : (
                      dictionary.ARTICLE_HEADER_BACKTONEWS
                    )}
                  </Button>
                  {(title?.value || isPageEditing) && (
                    <Text
                      tag="h1"
                      className="@md:text-[62px] @md:mb-0 font-heading text-primary line-height-[69px] mx-auto max-w-4xl text-pretty px-6 text-center text-4xl font-normal tracking-tighter"
                      field={title}
                    />
                  )}
                  {(excerpt?.value || isPageEditing) && (
                    <RichText
                      tag="div"
                      className="text-muted-foreground mx-auto max-w-3xl px-6 text-center text-lg text-pretty subpixel-antialiased [&_p]:mb-0"
                      field={excerpt}
                    />
                  )}
                  {(readTime?.value || displayDate?.value || isPageEditing) && (
                    <div className="@md:flex-row @xl:px-8 text-muted-foreground flex flex-col items-center justify-center space-x-2 px-4 text-center text-sm subpixel-antialiased">
                      {(readTime?.value || isPageEditing) && (
                        <Text
                          tag="span"
                          field={readTime}
                          className="@md:inline-block block text-pretty"
                        />
                      )}
                      {((readTime?.value && displayDate?.value) || isPageEditing) && (
                        <span className="@md:inline-block hidden text-pretty">•</span>
                      )}
                      {displayDate?.value && (
                        <time
                          dateTime={publishedDateISO}
                          itemProp="datePublished"
                          className="@md:inline-block block text-pretty"
                        >
                          <DateField
                            tag="span"
                            field={displayDate}
                            render={(date) => formatDateInUTC(String(date))}
                          />
                        </time>
                      )}
                    </div>
                  )}
                </div>
                <div className="@lg:grid @lg:max-w-screen-3xl @lg:mx-auto @lg:w-full @lg:gap-8 @lg:grid-cols-12 mx-6 mb-auto grid grid-cols-2 items-start justify-between">
                  {hasAuthor && (
                    <div className="@lg:col-span-3 @lg:justify-end @lg:pt-4 @lg:h-[250px] @lg:items-start col-span-1 flex h-auto flex-wrap items-center justify-center gap-4 p-6 subpixel-antialiased">
                      <div className="grid gap-y-3">
                        <p className="text-muted-foreground flex min-h-10 flex-col justify-center text-sm">
                          {dictionary.ARTICLE_HEADER_AUTHOR_LABEL}
                        </p>
                        <Avatar>
                          <AvatarImage
                            src={author?.fields?.personProfileImage?.value?.src}
                            alt={`${author?.fields?.personFirstName?.value} ${author?.fields?.personLastName?.value}`}
                          />
                          <AvatarFallback>{`${author?.fields?.personFirstName?.value} ${author?.fields?.personLastName?.value}`}</AvatarFallback>
                        </Avatar>
                        <div className="relative">
                          <p className="text-primary text-pretty font-medium">
                            {author?.fields?.personFirstName?.value}{' '}
                            {author?.fields?.personLastName?.value}
                          </p>
                          {author?.fields?.personJobTitle && (
                            <Text
                              tag="p"
                              field={author.fields.personJobTitle}
                              className="text-muted-foreground text-pretty text-sm"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="@lg:hidden col-span-1 flex h-auto items-center justify-center gap-4 p-6">
                    <p className="@lg:mb-2 text-primary m-0 flex items-center justify-center text-pretty text-sm font-medium subpixel-antialiased">
                      Share
                    </p>
                    <FloatingDock items={links} forceCollapse={forceCollapse} />
                  </div>

                  {showFeaturedImage && (
                    <figure
                      className={cn(
                        '@lg:col-span-6 relative z-10 col-span-2 mx-auto flex aspect-video w-full max-w-[800px] justify-center overflow-hidden',
                        !hasAuthor && '@lg:col-start-4',
                      )}
                    >
                      <ImageWrapper
                        image={featuredImage}
                        alt={headline}
                        className="h-full w-full object-cover"
                        wrapperClass="w-full relative"
                        priority
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </figure>
                  )}

                  <div className="@lg:col-span-3 @lg:justify-start @lg:pt-4 @lg:h-[250px] @lg:items-start @lg:flex hidden h-auto items-center justify-center gap-4 p-6">
                    <p className="@lg:mt-2 text-primary m-0 mb-2 flex items-center justify-center text-pretty text-sm font-medium subpixel-antialiased">
                      Share
                    </p>
                    <FloatingDock items={links} forceCollapse={forceCollapse} />
                  </div>
                </div>
              </div>
            </div>

            {(content?.value || isPageEditing) && (
              <div className={articleBodyRichTextClassName} itemProp="articleBody">
                <RichText field={content} />
              </div>
            )}

            {showArticlePromoPlaceholder && (
              <div className="article-details-promo mx-auto max-w-4xl px-6 pb-12">
                <Placeholder
                  name={articlePromoPlaceholderName}
                  rendering={rendering}
                />
              </div>
            )}

            <div ref={copyNotificationRef} className="sr-only" aria-live="polite" />
          </article>
        </header>
        <Toaster />
      </>
    );
  }

  return <NoDataFallback componentName="ArticleDetails" />;
};
