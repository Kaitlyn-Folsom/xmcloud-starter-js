'use client';

import React, { JSX, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
};

export const Default = (): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormValues) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    // Handle form submission here
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12" id="contact">
      <div className="mx-auto max-w-2xl">
        {/* Title */}
        <h2 className="mb-8 text-center text-2xl font-semibold leading-tight text-gray-900 md:text-3xl">
          Reach out to take the next step in advancing your operational efficiency
        </h2>

        {/* Progress Bar / Gradient Divider */}
        <div className="mb-8 h-1 w-full rounded-full bg-gradient-to-r from-[#152ea9] via-[#00adff] via-[#2ee9ff] to-[#32c858]" />

        {/* Thank You Message */}
        {isSubmitted ? (
          <div className="space-y-6 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#32c858]">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              Thank You!
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              We&apos;ve received your inquiry and will get back to you soon.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name and Last Name Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Input
                {...form.register('firstName', { required: 'First name is required' })}
                placeholder="First Name*"
                className="h-12 rounded-lg border-gray-300 px-4 text-base"
              />
              {form.formState.errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...form.register('lastName', { required: 'Last name is required' })}
                placeholder="Last Name*"
                className="h-12 rounded-lg border-gray-300 px-4 text-base"
              />
              {form.formState.errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Row */}
          <div>
            <Input
              {...form.register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="Email*"
              className="h-12 rounded-lg border-gray-300 px-4 text-base"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Country Select Row */}
          <div>
            <Controller
              control={form.control}
              name="country"
              rules={{ required: 'Country is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 rounded-lg border-gray-300 px-4 text-base">
                    <SelectValue placeholder="Please Select Your Country*" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.country && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.country.message}
              </p>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 text-sm leading-relaxed text-gray-700">
            <p>
              Please use this form to submit an inquiry. This form collects your name, email
              address and other personal information. Please read our{' '}
              <a
                href="/privacy"
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Notice
              </a>{' '}
              for information on how we protect and manage your personal data. By completing this
              form and submitting your information, you confirm that you have reviewed, understood
              and accepted our privacy terms as well as our cookie terms.
            </p>
          </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitted}
                className="h-12 rounded-lg bg-[#32c858] px-8 py-3 text-base font-medium text-white hover:bg-[#2db54d] disabled:opacity-50"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
