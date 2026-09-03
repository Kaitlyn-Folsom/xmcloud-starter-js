'use client';

import type { FormEvent, JSX } from 'react';
import { useState } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type WebinarFormProps = ComponentProps;

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  educationStatus: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  educationStatus: '',
};
const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const EDUCATION_STATUS_OPTIONS = [
  'College Graduate',
  'High School Graduate',
  'Enrolled in College',
  'Enrolled in High School',
];

const WEBINAR_CONTENT = {
  title: 'Exploring Careers in Veterinary Medicine',
  subtitle:
    'Discover the many paths into veterinary medicine and learn how students prepare for careers in animal health.',
  description:
    "Whether you're beginning your research or actively exploring veterinary programs, this virtual information session will introduce you to the field of veterinary medicine and the opportunities available through Michigan State University.",
  agendaHeading: "During this session you'll learn about:",
  agenda: [
    'Veterinary career pathways and specialties',
    'Preparing for veterinary school',
    'Academic opportunities available at MSU',
    'Hands-on learning, research, and animal-related experiences',
    'Resources available to students interested in veterinary medicine',
    'Questions and answers with MSU representatives',
  ],
  detailsHeading: 'Event Details',
  details: [
    { label: 'Format', value: 'Virtual Webinar' },
    { label: 'Duration', value: '45 Minutes + Live Q&A' },
  ],
  formHeading: 'Reserve Your Spot',
  educationStatusPlaceholder: 'Select your current education status',
  submitLabel: 'Register for Webinar',
  submittingLabel: 'Registering…',
  confirmationHeading: "You're registered",
  confirmationMessage:
    'Look for a confirmation email with your webinar link and a calendar invitation.',
};

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  const email = values.email.trim();

  if (!email) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.educationStatus) {
    errors.educationStatus = 'Current education status is required';
  }

  return errors;
};

const sendIdentityEvent = async (
  values: FormValues,
  pageName?: string,
  language?: string
): Promise<void> => {
  const { identity } = await import('@sitecore-content-sdk/events');
  const identifier = values.email.trim().toLowerCase();

  await identity({
    channel: 'WEB',
    currency: 'USD',
    language: language || 'en',
    page: pageName,
    email: identifier,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    identifiers: [
      {
        id: identifier,
        provider: 'email',
      },
    ],
    extensionData: {
      educationStatus: values.educationStatus,
      webinar: WEBINAR_CONTENT.title,
    },
  });
};

export const Default = (props: WebinarFormProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { page } = useSitecore() || {};
  const isPageEditing = Boolean(page?.mode?.isEditing);
  const route = page?.layout?.sitecore?.route;

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0 || isPageEditing) {
      return;
    }

    setIsSubmitting(true);

    await sendIdentityEvent(values, route?.name, route?.itemLanguage).catch((error) => {
      const status = (error as { status?: number })?.status;
      if (status !== 404 && status !== 0) {
        console.debug('Webinar registration IDENTITY event error:', error);
      }
    });

    setIsSubmitting(false);
    setIsRegistered(true);
  };

  return (
    <section className={`component webinar-form ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="row webinar-form-row">
          <div className="col-lg-7 webinar-form-details">
            <h2 className="webinar-form-title">{WEBINAR_CONTENT.title}</h2>
            <p className="webinar-form-subtitle">{WEBINAR_CONTENT.subtitle}</p>
            <p className="webinar-form-description">{WEBINAR_CONTENT.description}</p>

            <h3 className="webinar-form-heading">{WEBINAR_CONTENT.agendaHeading}</h3>
            <ul className="webinar-form-agenda">
              {WEBINAR_CONTENT.agenda.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="webinar-form-heading">{WEBINAR_CONTENT.detailsHeading}</h3>
            <dl className="webinar-form-event-details">
              {WEBINAR_CONTENT.details.map(({ label, value }) => (
                <div className="webinar-form-event-detail" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="col-lg-5 webinar-form-panel">
            <div className="webinar-form-card">
              <h3 className="webinar-form-card-title">{WEBINAR_CONTENT.formHeading}</h3>

              {isRegistered ? (
                <div className="webinar-form-confirmation" role="status">
                  <p className="webinar-form-confirmation-title">
                    {WEBINAR_CONTENT.confirmationHeading}
                  </p>
                  <p className="webinar-form-confirmation-message">
                    {WEBINAR_CONTENT.confirmationMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <label className="webinar-form-label" htmlFor="webinar-first-name">
                    First Name
                  </label>
                  <input
                    id="webinar-first-name"
                    className="webinar-form-input"
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    value={values.firstName}
                    onChange={(event) => updateValue('firstName', event.target.value)}
                  />
                  {errors.firstName && <p className="webinar-form-error">{errors.firstName}</p>}

                  <label className="webinar-form-label" htmlFor="webinar-last-name">
                    Last Name
                  </label>
                  <input
                    id="webinar-last-name"
                    className="webinar-form-input"
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    value={values.lastName}
                    onChange={(event) => updateValue('lastName', event.target.value)}
                  />
                  {errors.lastName && <p className="webinar-form-error">{errors.lastName}</p>}

                  <label className="webinar-form-label" htmlFor="webinar-email">
                    Email Address
                  </label>
                  <input
                    id="webinar-email"
                    className="webinar-form-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => updateValue('email', event.target.value)}
                  />
                  {errors.email && <p className="webinar-form-error">{errors.email}</p>}

                  <label className="webinar-form-label" htmlFor="webinar-education-status">
                    Current Education Status
                  </label>
                  <select
                    id="webinar-education-status"
                    className="webinar-form-input webinar-form-select"
                    name="educationStatus"
                    value={values.educationStatus}
                    onChange={(event) => updateValue('educationStatus', event.target.value)}
                  >
                    <option value="">{WEBINAR_CONTENT.educationStatusPlaceholder}</option>
                    {EDUCATION_STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.educationStatus && (
                    <p className="webinar-form-error">{errors.educationStatus}</p>
                  )}

                  <button
                    type="submit"
                    className="button button-main webinar-form-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? WEBINAR_CONTENT.submittingLabel : WEBINAR_CONTENT.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
