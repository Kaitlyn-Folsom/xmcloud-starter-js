import { getArticleDetailsRouteFields, hasArticleDetailsContent } from '@/components/article-details/article-details-route-fields';
import { defaultProps } from './ArticleDetails.mockProps';

describe('getArticleDetailsRouteFields', () => {
  it('reads fields from page.layout.sitecore.route.fields', () => {
    const resolved = getArticleDetailsRouteFields(defaultProps.page);

    expect(resolved.title?.value).toBe('The Future of Web Development');
    expect(resolved.readTime?.value).toBe('5 min read');
    expect(resolved.featuredImage?.value?.src).toBe('/test-article-hero.jpg');
    expect(hasArticleDetailsContent(resolved)).toBe(true);
  });
});
