'use client';

import React, { useState, useId } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { MultiPromoTabsProps } from './multi-promo-tabs.props';
import { Default as PromoTab } from './MultiPromoTab.dev';

const sectionClassName =
  'multi-promo-tabs @container hm-section-wash @md:p-12 @md:my-16 border-y border-border my-8 w-full px-4 group-[.is-inset]:px-4 sm:group-[.is-inset]:px-0';

const titleClassName =
  'text-box-trim-both text-box-edge-asc-baseline text-primary font-heading @md:text-4xl @sm:text-3xl mb-8 max-w-[28ch] text-pretty text-2xl font-semibold leading-tight tracking-tight';

export const Default: React.FC<MultiPromoTabsProps> = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const { fields, page, isPageEditing } = props;

  const isEditMode = isPageEditing || page.mode.isEditing;

  const id = useId();

  if (fields) {
    const tabItems = fields.data?.datasource?.children?.results ?? [];
    const initialTabTitle = tabItems[0]?.title?.jsonValue?.value || 'Select an option';
    const droplistLabelText =
      fields.data?.datasource?.droplistLabel?.jsonValue?.value || 'Select a value';

    if (isEditMode) {
      return (
        <div className={sectionClassName}>
          <Text tag="h2" field={fields.data?.datasource?.title?.jsonValue} className={titleClassName} />

          {tabItems.map((item, index) => (
            <div
              key={index}
              className="border-border mb-12 border-b pb-12 last:mb-0 last:border-0 last:pb-0"
            >
              <div className="text-primary mb-4 text-xl font-semibold">
                <Text field={item.title?.jsonValue} />
              </div>
              <PromoTab {...item} isEditMode={isEditMode} />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={sectionClassName}>
        <Text tag="h2" field={fields.data?.datasource?.title?.jsonValue} className={titleClassName} />

        <div className="@md:hidden flex flex-col">
          <label htmlFor={id} className="text-primary font-body mb-2 block text-sm font-medium">
            {droplistLabelText}
          </label>
          <Select
            onValueChange={(value) => setActiveTab(Number(value))}
            defaultValue={activeTab.toString()}
          >
            <SelectTrigger id={id} className="border-input bg-background text-foreground w-full">
              <SelectValue placeholder={initialTabTitle} />
            </SelectTrigger>
            <SelectContent>
              {tabItems.map((item, index) => (
                <SelectItem key={index} value={index.toString()} className="capitalize">
                  {item.title?.jsonValue.value || `Tab ${index + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs
          value={activeTab.toString()}
          onValueChange={(value) => setActiveTab(Number(value))}
          className="w-full"
        >
          <TabsList className="@md:flex hidden justify-start gap-1 border-0 bg-transparent p-0">
            {tabItems.map((item, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="font-body data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-secondary text-primary rounded-default border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                {item.title?.jsonValue.value || `Tab ${index + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {tabItems.map((item, index) => (
              <TabsContent key={index} value={index.toString()}>
                <PromoTab {...item} isEditMode={isEditMode} />
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    );
  }

  return <NoDataFallback componentName="Tabbed Multi-Promo" />;
};
