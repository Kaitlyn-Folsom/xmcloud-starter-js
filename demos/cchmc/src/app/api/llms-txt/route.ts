import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Serves the public llms.txt file for AI search engines and LLM consumption.
 * Follows the llms.txt specification: https://llmstxt.org/
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const baseUrl = new URL(request.url).origin;

  const content = `# Cincinnati Children's Hospital Medical Center

> Cincinnati Children's is a nationally ranked pediatric hospital offering specialty care, research, family resources, and health education for children and families.

The site helps patients and families find doctors, schedule appointments, explore services and specialties, and access health library content. Built with Next.js and Sitecore XM Cloud for modern, accessible healthcare experiences.

## Key pages

- [Home](${baseUrl}/): Hospital homepage and featured content
- [Articles](${baseUrl}/Articles): Health stories, tips, and news
- [Article page](${baseUrl}/Article-Page): Full article layout and reading experience
- [Landing page](${baseUrl}/Landing-Page): Full landing page layout and experience

## Optional

- [Sitemap](${baseUrl}/sitemap.xml): Full XML sitemap for search engines
- [LLM Sitemap](${baseUrl}/sitemap-llm.xml): LLM-optimized sitemap for AI crawlers
- [Robots](${baseUrl}/robots.txt): Crawler and bot access rules
- [AI metadata](${baseUrl}/.well-known/ai.txt): AI crawler and LLM metadata (ai.txt)
- [FAQ (JSON)](${baseUrl}/ai/faq.json): Frequently asked questions
- [Summary (JSON)](${baseUrl}/ai/summary.json): Site summary for AI consumption
- [Service (JSON)](${baseUrl}/ai/service.json): Service information for AI consumption
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
