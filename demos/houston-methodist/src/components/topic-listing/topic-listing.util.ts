import { TopicListingBackgroundTheme } from '@/enumerations/TopicListingBackgroundTheme.enum';
import { EnumValues } from '@/enumerations/generic.enum';

const topicListingThemes = Object.values(TopicListingBackgroundTheme);

function extractParamString(param: unknown): string | undefined {
  if (typeof param === 'string') {
    return param;
  }

  if (param && typeof param === 'object' && 'value' in param) {
    const { value } = param as { value: unknown };
    if (typeof value === 'string') {
      return value;
    }
  }

  return undefined;
}

function normalizeBackgroundThemeKey(raw: string): string {
  const trimmed = raw.trim();
  const segment = trimmed.includes('/')
    ? (trimmed.split('/').filter(Boolean).pop() ?? trimmed)
    : trimmed;

  return segment.toLowerCase().replace(/\s+/g, '-');
}

export function getTopicListingBackgroundTheme(
  params?: Record<string, unknown> | null
): EnumValues<typeof TopicListingBackgroundTheme> {
  const raw =
    extractParamString(params?.backgroundTheme) ??
    extractParamString(params?.BackgroundTheme);

  if (!raw) {
    return TopicListingBackgroundTheme.DEFAULT;
  }

  const normalized = normalizeBackgroundThemeKey(raw);

  if (topicListingThemes.includes(normalized as EnumValues<typeof TopicListingBackgroundTheme>)) {
    return normalized as EnumValues<typeof TopicListingBackgroundTheme>;
  }

  return TopicListingBackgroundTheme.DEFAULT;
}
