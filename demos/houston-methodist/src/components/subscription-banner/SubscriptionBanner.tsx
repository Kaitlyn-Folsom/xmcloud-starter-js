'use client';

import type React from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { SubscriptionBannerProps } from './subscription-banner.props';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { dictionaryKeys } from '@/variables/dictionary';

type FormValues = {
  email: string;
};

export const Default: React.FC<SubscriptionBannerProps> = ({ fields }) => {
  const { titleRequired, descriptionOptional } = fields || {};
  const t = useTranslations();
  const dictionary = {
    CTALABEL: t(dictionaryKeys.SUBSCRIPTIONBANNER_BUTTON_LABEL),
    EMAIL_PLACEHOLDER: t(dictionaryKeys.SUBSCRIPTIONBANNER_EMAIL_FIELD_PLACEHOLDER),
    EMAIL_SUCCESS_MESSAGE: t(dictionaryKeys.SUBSCRIPTIONBANNER_SUCCESS_MESSAGE),
    EMAIL_ERROR_MESSAGE: t(dictionaryKeys.SUBSCRIPTIONBANNER_EMAIL_FORMAT_ERROR),
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    setIsSubmitted(true);
    form.reset({ email: dictionary.EMAIL_SUCCESS_MESSAGE || 'Thank you' });
  };

  return (
    <section className="bg-primary text-primary-foreground mx-auto w-full px-4 py-12 @md:py-14">
      <div className="@container @xl:px-8 mx-auto max-w-screen-xl">
        <div className="@md:flex @md:items-center @md:justify-between @md:gap-8">
          <div className="@md:max-w-md">
            {titleRequired && (
              <Text
                tag="h2"
                field={titleRequired}
                className="font-heading mb-2 text-2xl font-semibold @md:text-3xl"
              />
            )}
            {descriptionOptional && (
              <Text
                tag="p"
                field={descriptionOptional}
                className="font-body text-primary-foreground/90 text-sm @md:text-base"
              />
            )}
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="@md:flex-row mt-6 flex w-full flex-col items-stretch gap-3 @md:mt-0 @md:max-w-lg @md:flex-1 @md:justify-end"
            >
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: dictionary.EMAIL_ERROR_MESSAGE || 'Email format is invalid',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={dictionary.EMAIL_PLACEHOLDER || 'Enter your email address'}
                        className="border-white/30 bg-white text-foreground h-11 w-full rounded-default px-4 placeholder:text-muted-foreground"
                        disabled={isSubmitted}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive-foreground mt-2 text-sm" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="default"
                className="h-11 shrink-0 px-8"
                disabled={isSubmitted}
              >
                {dictionary.CTALABEL || 'Subscribe'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
