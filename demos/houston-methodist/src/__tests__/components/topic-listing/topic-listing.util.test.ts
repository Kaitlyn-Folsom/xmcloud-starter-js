import { getTopicListingBackgroundTheme } from '@/components/topic-listing/topic-listing.util';
import { TopicListingBackgroundTheme } from '@/enumerations/TopicListingBackgroundTheme.enum';

describe('getTopicListingBackgroundTheme', () => {
  it('returns transparent for plain string param', () => {
    expect(getTopicListingBackgroundTheme({ backgroundTheme: 'transparent' })).toBe(
      TopicListingBackgroundTheme.TRANSPARENT
    );
  });

  it('returns transparent for Sitecore Field-shaped param', () => {
    expect(
      getTopicListingBackgroundTheme({ backgroundTheme: { value: 'transparent' } })
    ).toBe(TopicListingBackgroundTheme.TRANSPARENT);
  });

  it('normalizes display name casing and spacing', () => {
    expect(getTopicListingBackgroundTheme({ backgroundTheme: 'Transparent' })).toBe(
      TopicListingBackgroundTheme.TRANSPARENT
    );
    expect(getTopicListingBackgroundTheme({ backgroundTheme: 'Shooting Star' })).toBe(
      TopicListingBackgroundTheme.SHOOTING_STAR
    );
  });

  it('extracts theme from Sitecore content path values', () => {
    expect(
      getTopicListingBackgroundTheme({
        backgroundTheme: '/sitecore/content/Enumerations/Topic Listing/Background Themes/transparent',
      })
    ).toBe(TopicListingBackgroundTheme.TRANSPARENT);
  });

  it('reads BackgroundTheme PascalCase param key', () => {
    expect(getTopicListingBackgroundTheme({ BackgroundTheme: 'light' })).toBe(
      TopicListingBackgroundTheme.LIGHT
    );
  });

  it('falls back to default for unknown values', () => {
    expect(getTopicListingBackgroundTheme({ backgroundTheme: 'not-a-theme' })).toBe(
      TopicListingBackgroundTheme.DEFAULT
    );
  });
});
