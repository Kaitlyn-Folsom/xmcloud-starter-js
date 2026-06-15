'use client';

import { FC, useId } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  FooterNavigationColumnProps,
  FooterNavigationLink,
} from '@/components/global-footer/global-footer.props';
import { Button } from '@/components/ui/button';
import { Link, Text } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { useMatchMedia } from '@/hooks/use-match-media';

export const Default: FC<FooterNavigationColumnProps> = (props) => {
  const { fields, page } = props;
  const { items, header } = fields.data?.datasource ?? {};
  const isPageEditing = page.mode.isEditing;

  const accordionId = useId();
  const isMobile = useMatchMedia('(max-width: 767px)');

  if (fields) {
    return (
      <nav aria-labelledby={accordionId}>
        {isMobile ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`item-${header?.jsonValue?.value}`} className="border-border">
              <AccordionTrigger
                className="text-foreground py-3.5 text-base font-bold tracking-wide uppercase hover:no-underline"
                id={accordionId}
              >
                <Text field={header?.jsonValue} />
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pb-2">
                  {items?.results?.map((item: FooterNavigationLink, index) => (
                    <li key={`footerlinks-${index}-accordion-item`}>
                      <Button
                        variant="link"
                        asChild
                        className="text-foreground hover:text-primary h-auto p-0 text-base font-normal"
                      >
                        <Link field={item.link?.jsonValue} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <>
            {(isPageEditing || header?.jsonValue?.value) && (
              <h3
                id={accordionId}
                className="text-foreground mb-5 text-base font-bold tracking-wide uppercase"
              >
                <Text field={header?.jsonValue} tag="span" />
              </h3>
            )}
            <ul className="space-y-3">
              {items?.results?.map((item: FooterNavigationLink, index) => (
                <li key={`footerlinks-${index}`}>
                  <Button
                    variant="link"
                    asChild
                    className="text-foreground hover:text-primary h-auto p-0 text-base font-normal"
                  >
                    <Link field={item.link?.jsonValue} />
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    );
  }

  return <NoDataFallback componentName="Footer Navigation Column" />;
};
