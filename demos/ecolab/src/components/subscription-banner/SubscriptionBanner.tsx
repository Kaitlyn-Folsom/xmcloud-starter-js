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
    // Handle form submission
    console.log(data);
    setIsSubmitted(true);
    // Reset the form to clear the input, then set the thank you message
    form.reset({ email: dictionary.EMAIL_SUCCESS_MESSAGE || 'Thank you' });
  };

  return (
    <section className="bg-surface-muted mx-auto w-full px-4 py-16 @md:py-20">
      <div className="@container mx-auto max-w-5xl">
        {titleRequired && (
          <Text
            tag="h2"
            field={titleRequired}
            className="text-primary font-heading mb-4 text-center text-3xl font-bold leading-tight @md:text-4xl"
          />
        )}
        {descriptionOptional && (
          <Text
            tag="p"
            field={descriptionOptional}
            className="font-body text-muted-foreground mb-10 text-center text-lg"
          />
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex max-w-lg flex-col items-stretch justify-center gap-4 @md:flex-row"
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
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={dictionary.EMAIL_PLACEHOLDER || 'Enter your email address'}
                      className="border-input w-full flex-1 rounded-md px-4 py-3"
                      disabled={isSubmitted}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive mt-2 text-sm" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-full px-8 py-2.5 @md:w-auto w-full"
              disabled={isSubmitted}
            >
              {dictionary.CTALABEL || 'Subscribe'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
