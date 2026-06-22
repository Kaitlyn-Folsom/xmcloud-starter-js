'use client';

import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { identity } from '@sitecore-content-sdk/events';
import config from 'sitecore.config';
import { ComponentProps } from '@/lib/component-props';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type MyChartFormProps = ComponentProps;

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

export const Default: React.FC<MyChartFormProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { page } = useSitecore();
  const { isEditing, isPreview } = page.mode;
  const { route } = page.layout.sitecore;

  const form = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormValues) => {
    const shouldSendIdentityEvent =
      process.env.NODE_ENV !== 'development' && !isEditing && !isPreview;

    if (shouldSendIdentityEvent) {
      const email = data.email.toLowerCase();
      const language = route?.itemLanguage || config.defaultLanguage;

      await identity({
        channel: 'WEB',
        currency: 'USD',
        language,
        page: route?.name,
        email,
        firstName: data.firstName,
        lastName: data.lastName,
        identifiers: [
          {
            id: email,
            provider: 'email',
          },
        ],
      }).catch((error) => {
        if (error?.status !== 404 && error?.status !== 0) {
          console.debug('MyChart IDENTITY event error:', error);
        }
      });
    }

    setIsSubmitted(true);
  };

  return (
    <section className="component mychart-form bg-secondary w-full px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-heading text-foreground mb-8 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Create your MyChart Account
        </h1>

        <div className="bg-background border-border border p-6 md:p-8">
          {isSubmitted ? (
            <p className="text-foreground text-lg">An email was sent to the address provided. Please confirm your email address to complete your account setup.</p>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  rules={{ required: 'First name is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="given-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  rules={{ required: 'Last name is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="family-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="magenta" className="w-full md:w-auto">
                  Submit
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </section>
  );
};
