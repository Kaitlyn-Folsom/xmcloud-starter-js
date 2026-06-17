// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as VideoPlayerdev from 'src/components/video/VideoPlayer.dev';
import * as VideoModaldev from 'src/components/video/VideoModal.dev';
import * as Video from 'src/components/video/Video';
import * as VerticalImageAccordion from 'src/components/vertical-image-accordion/VerticalImageAccordion';
import * as themeproviderdev from 'src/components/theme-provider/theme-provider.dev';
import * as TestimonialCarousel from 'src/components/testimonial-carousel/TestimonialCarousel';
import * as Title from 'src/components/sxa/Title';
import * as NavigationMenuToggleclient from 'src/components/sxa/NavigationMenuToggle.client';
import * as NavigationListclient from 'src/components/sxa/NavigationList.client';
import * as Image from 'src/components/sxa/Image';
import * as ContentBlock from 'src/components/sxa/ContentBlock';
import * as SubscriptionBanner from 'src/components/subscription-banner/SubscriptionBanner';
import * as SecondaryNavigation from 'src/components/secondary-navigation/SecondaryNavigation';
import * as SearchExperienceLoadMore from 'src/components/search-experience/SearchExperience.LoadMore';
import * as SearchExperience from 'src/components/search-experience/SearchExperience';
import * as useSearchField from 'src/components/search-experience/search-components/useSearchField';
import * as useRouter from 'src/components/search-experience/search-components/useRouter';
import * as useParams from 'src/components/search-experience/search-components/useParams';
import * as useEvent from 'src/components/search-experience/search-components/useEvent';
import * as useDebounce from 'src/components/search-experience/search-components/useDebounce';
import * as SearchSkeletonItem from 'src/components/search-experience/search-components/SearchSkeletonItem';
import * as SearchPagination from 'src/components/search-experience/search-components/SearchPagination';
import * as SearchItemCommon from 'src/components/search-experience/search-components/SearchItemCommon';
import * as SearchInput from 'src/components/search-experience/search-components/SearchInput';
import * as SearchError from 'src/components/search-experience/search-components/SearchError';
import * as SearchEmptyResults from 'src/components/search-experience/search-components/SearchEmptyResults';
import * as index from 'src/components/search-experience/search-components/SearchItem/index';
import * as SearchItemTitle from 'src/components/search-experience/search-components/SearchItem/SearchItemTitle';
import * as SearchItemTags from 'src/components/search-experience/search-components/SearchItem/SearchItemTags';
import * as SearchItemSummary from 'src/components/search-experience/search-components/SearchItem/SearchItemSummary';
import * as SearchItemSubTitle from 'src/components/search-experience/search-components/SearchItem/SearchItemSubTitle';
import * as SearchItemLink from 'src/components/search-experience/search-components/SearchItem/SearchItemLink';
import * as SearchItemImage from 'src/components/search-experience/search-components/SearchItem/SearchItemImage';
import * as SearchItemCategory from 'src/components/search-experience/search-components/SearchItem/SearchItemCategory';
import * as PromoAnimatedImageRightdev from 'src/components/promo-animated/PromoAnimatedImageRight.dev';
import * as PromoAnimatedDefaultdev from 'src/components/promo-animated/PromoAnimatedDefault.dev';
import * as PromoAnimatedContentdev from 'src/components/promo-animated/PromoAnimatedContent.dev';
import * as PromoAnimated from 'src/components/promo-animated/PromoAnimated';
import * as portaldev from 'src/components/portal/portal.dev';
import * as PageHeader from 'src/components/page-header/PageHeader';
import * as MyChartForm from 'src/components/mychart-form/MyChartForm';
import * as MultiPromoTabs from 'src/components/multi-promo-tabs/MultiPromoTabs';
import * as MultiPromo from 'src/components/multi-promo/MultiPromo';
import * as modetoggledev from 'src/components/mode-toggle/mode-toggle.dev';
import * as MediaSectiondev from 'src/components/media-section/MediaSection.dev';
import * as meteors from 'src/components/magicui/meteors';
import * as LogoTabs from 'src/components/logo-tabs/LogoTabs';
import * as nextImageSrcdev from 'src/components/image/nextImageSrc.dev';
import * as imageoptimizationcontext from 'src/components/image/image-optimization.context';
import * as ImageWrapperclient from 'src/components/image/ImageWrapper.client';
import * as Icon from 'src/components/icon/Icon';
import * as Hero from 'src/components/hero/Hero';
import * as HeaderSearchShelf from 'src/components/global-header/HeaderSearchShelf';
import * as GlobalHeader from 'src/components/global-header/GlobalHeader';
import * as FooterNavigationColumn from 'src/components/global-footer/FooterNavigationColumn';
import * as FooterBackToTop from 'src/components/global-footer/FooterBackToTop';
import * as floatingdockdev from 'src/components/floating-dock/floating-dock.dev';
import * as ArticleListing from 'src/components/article-listing/ArticleListing';
import * as ArticleHeader from 'src/components/article-header/ArticleHeader';
import * as ArticleDetails from 'src/components/article-details/ArticleDetails';
import * as AnimatedSectiondev from 'src/components/animated-section/AnimatedSection.dev';
import * as AlertBannerdev from 'src/components/alert-banner/AlertBanner.dev';
import * as AccordionBlock from 'src/components/accordion-block/AccordionBlock';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['VideoPlayer', { ...VideoPlayerdev }],
  ['VideoModal', { ...VideoModaldev }],
  ['Video', { ...Video }],
  ['VerticalImageAccordion', { ...VerticalImageAccordion }],
  ['theme-provider', { ...themeproviderdev }],
  ['TestimonialCarousel', { ...TestimonialCarousel }],
  ['Title', { ...Title }],
  ['NavigationMenuToggle', { ...NavigationMenuToggleclient }],
  ['NavigationList', { ...NavigationListclient }],
  ['Image', { ...Image }],
  ['ContentBlock', { ...ContentBlock }],
  ['SubscriptionBanner', { ...SubscriptionBanner }],
  ['SecondaryNavigation', { ...SecondaryNavigation }],
  ['SearchExperience', { ...SearchExperienceLoadMore, ...SearchExperience }],
  ['useSearchField', { ...useSearchField }],
  ['useRouter', { ...useRouter }],
  ['useParams', { ...useParams }],
  ['useEvent', { ...useEvent }],
  ['useDebounce', { ...useDebounce }],
  ['SearchSkeletonItem', { ...SearchSkeletonItem }],
  ['SearchPagination', { ...SearchPagination }],
  ['SearchItemCommon', { ...SearchItemCommon }],
  ['SearchInput', { ...SearchInput }],
  ['SearchError', { ...SearchError }],
  ['SearchEmptyResults', { ...SearchEmptyResults }],
  ['index', { ...index }],
  ['SearchItemTitle', { ...SearchItemTitle }],
  ['SearchItemTags', { ...SearchItemTags }],
  ['SearchItemSummary', { ...SearchItemSummary }],
  ['SearchItemSubTitle', { ...SearchItemSubTitle }],
  ['SearchItemLink', { ...SearchItemLink }],
  ['SearchItemImage', { ...SearchItemImage }],
  ['SearchItemCategory', { ...SearchItemCategory }],
  ['PromoAnimatedImageRight', { ...PromoAnimatedImageRightdev }],
  ['PromoAnimatedDefault', { ...PromoAnimatedDefaultdev }],
  ['PromoAnimatedContent', { ...PromoAnimatedContentdev }],
  ['PromoAnimated', { ...PromoAnimated }],
  ['portal', { ...portaldev }],
  ['PageHeader', { ...PageHeader }],
  ['MyChartForm', { ...MyChartForm }],
  ['MultiPromoTabs', { ...MultiPromoTabs }],
  ['MultiPromo', { ...MultiPromo }],
  ['mode-toggle', { ...modetoggledev }],
  ['MediaSection', { ...MediaSectiondev }],
  ['meteors', { ...meteors }],
  ['LogoTabs', { ...LogoTabs }],
  ['nextImageSrc', { ...nextImageSrcdev }],
  ['image-optimization', { ...imageoptimizationcontext }],
  ['ImageWrapper', { ...ImageWrapperclient }],
  ['Icon', { ...Icon }],
  ['Hero', { ...Hero }],
  ['HeaderSearchShelf', { ...HeaderSearchShelf }],
  ['GlobalHeader', { ...GlobalHeader }],
  ['FooterNavigationColumn', { ...FooterNavigationColumn }],
  ['FooterBackToTop', { ...FooterBackToTop }],
  ['floating-dock', { ...floatingdockdev }],
  ['ArticleListing', { ...ArticleListing }],
  ['ArticleHeader', { ...ArticleHeader }],
  ['ArticleDetails', { ...ArticleDetails }],
  ['AnimatedSection', { ...AnimatedSectiondev }],
  ['AlertBanner', { ...AlertBannerdev }],
  ['AccordionBlock', { ...AccordionBlock }],
]);

export default componentMap;
