'use client';

import type { FormEvent, JSX } from 'react';
import { useState } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type MyAccountLoginProps = ComponentProps;

type FormValues = {
  username: string;
  password: string;
};

const ACCOUNT_BASE_URL = 'https://nj.myaccount.pseg.com';

const PsegLogo = (): JSX.Element => (
  <div className="pseg-login-logo" aria-label="PSE&G">
    <span className="pseg-mark" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.02 38.79" role="img">
        <title>PSE&G</title>
        <path
          fill="#f0532a"
          d="M0 19.39C0 8.68 8.74 0 19.51 0s19.51 8.68 19.51 19.39-8.74 19.39-19.51 19.39S0 30.1 0 19.39"
        />
        <polygon
          fill="#fff"
          points="18.98 13.9 16.03 1.95 16.4 9.17 12.66 2.97 16.9 14.53 9.57 4.61 12.7 11.15 6.86 6.82 15.23 15.89 4.64 9.52 10.04 14.36 2.98 12.59 14.21 17.79 1.97 15.92 8.82 18.34 1.62 19.39 14 19.93 1.97 22.86 9.23 22.49 2.98 26.2 14.63 21.99 4.64 29.27 11.21 26.16 6.87 31.96 16 23.64 9.58 34.16 14.45 28.81 12.67 35.81 17.91 24.66 16.02 36.82 18.38 30.02 19.52 37.17 19.52 24.9 23 36.83 22.63 29.61 26.36 35.81 22.13 24.26 29.45 34.17 26.32 27.64 32.16 31.96 23.8 22.89 34.38 29.27 28.98 24.43 36.04 26.2 24.82 21 37.06 22.87 30.2 20.45 37.4 19.4 25.05 18.86 37.06 15.94 29.8 16.3 36.04 12.6 24.42 16.79 34.41 9.53 27.82 12.62 32.17 6.83 23.04 15.13 29.46 4.62 24.59 9.98 26.37 2.97 21.12 14.12 23.01 1.96 20.57 8.77 19.52 1.62 18.98 13.9"
        />
      </svg>
    </span>
    <span className="pseg-word">
      PSE<span className="pseg-amp">&amp;</span>G
    </span>
  </div>
);

const sendIdentityEvent = async (username: string, pageName?: string, language?: string) => {
  const { identity } = await import('@sitecore-content-sdk/events');
  const identifier = username.toLowerCase();
  const isEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(identifier);

  await identity({
    channel: 'WEB',
    currency: 'USD',
    language: language || 'en',
    page: pageName,
    ...(isEmail ? { email: identifier } : {}),
    identifiers: [
      {
        id: identifier,
        provider: isEmail ? 'email' : 'username',
      },
    ],
  });
};

export const Default = (props: MyAccountLoginProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const [values, setValues] = useState<FormValues>({ username: '', password: '' });
  const [usernameError, setUsernameError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { page } = useSitecore() || {};
  const isEditing = Boolean(page?.mode?.isEditing);
  const isPreview = Boolean(page?.mode?.isPreview);
  const isNormal = Boolean(page?.mode?.isNormal);
  const route = page?.layout?.sitecore?.route;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = values.username.trim();
    // Demo login: any password is accepted and never sent with the identity event.
    void values.password;

    if (!username) {
      setUsernameError('Username is required');
      return;
    }

    setUsernameError('');

    const shouldSendIdentityEvent =
      process.env.NODE_ENV !== 'development' && isNormal && !isEditing && !isPreview;

    if (shouldSendIdentityEvent) {
      await sendIdentityEvent(username, route?.name, route?.itemLanguage).catch((error) => {
        const status = (error as { status?: number })?.status;
        if (status !== 404 && status !== 0) {
          console.debug('My Account IDENTITY event error:', error);
        }
      });
    }

    setIsSubmitted(true);
  };

  const showSuccess = isSubmitted && !isEditing;

  return (
    <section className={`component my-account-login ${sxaStyles}`} id={id ? id : undefined}>
      <div className="my-account-login-card">
        <div className="my-account-login-header">
          <PsegLogo />
        </div>

        {showSuccess ? (
          <p className="my-account-login-success">
            You are signed in. Continue to My Account to manage your service.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h1 className="my-account-login-title">Login</h1>

            <label className="my-account-login-label" htmlFor="my-account-username">
              Username
            </label>
            <input
              id="my-account-username"
              className="my-account-login-input"
              type="text"
              name="username"
              autoComplete="username"
              value={values.username}
              onChange={(event) =>
                setValues((current) => ({ ...current, username: event.target.value }))
              }
            />
            {usernameError && <p className="my-account-login-error">{usernameError}</p>}

            <label className="my-account-login-label" htmlFor="my-account-password">
              Password
            </label>
            <input
              id="my-account-password"
              className="my-account-login-input"
              type="password"
              name="password"
              autoComplete="current-password"
              value={values.password}
              onChange={(event) =>
                setValues((current) => ({ ...current, password: event.target.value }))
              }
            />

            <button type="submit" className="button button-main my-account-login-submit">
              Login
            </button>

            <ul className="my-account-login-links">
              <li>
                <a href={`${ACCOUNT_BASE_URL}/user/unlock`}>Unlock account?</a>
              </li>
              <li>
                <a href={`${ACCOUNT_BASE_URL}/user/forgot-username`}>Forgot username?</a>
              </li>
              <li>
                <a href="/">Back to PSE&amp;G</a>
              </li>
            </ul>
          </form>
        )}

        <div className="my-account-login-register">
          Don&apos;t have an account?{' '}
          <a href={`${ACCOUNT_BASE_URL}/user/registration`}>Register</a>
        </div>
      </div>
    </section>
  );
};
