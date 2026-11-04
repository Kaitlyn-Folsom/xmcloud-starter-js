'use client';

import { JSX, useState } from 'react';
import { Field, LinkField, RichTextField, Text, RichText, Link, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type JsonValue<T> = { jsonValue: T };

interface OptionItem {
  id: string;
  option?: JsonValue<RichTextField>;
  link?: JsonValue<LinkField>;
}

interface Datasource {
  heading?: JsonValue<Field<string>>;
  prompt?: JsonValue<Field<string>>;
  children?: { results?: OptionItem[] };
}

export type ExpertConnectProps = ComponentProps & {
  fields: { data?: { datasource?: Datasource } };
};

const STEPS = [1, 2, 3, 4];

const render = (props: ExpertConnectProps, look: string): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const [step, setStep] = useState(1);
  const ds = props.fields?.data?.datasource;
  if (!ds) {
    return (
      <div className="component expert-connect">
        <span className="is-empty-hint">Expert connect: choose a datasource</span>
      </div>
    );
  }
  const options = ds.children?.results ?? [];
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component expert-connect ${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container ec-row">
        <div className="ec-left">
          {/* the stepper is a radio group (keyboard reachable); choosing an option below moves it on */}
          <div className="ec-steps" role="radiogroup" aria-label="Step">
            {/* "Step" and the numbers are drawn by CSS: the radio group and each radio carry the accessible names */}
            {STEPS.map((n) => (
              <label key={n} data-n={n} className={`ec-step ${n === step ? 'active' : ''} ${n < step ? 'done' : ''}`}>
                <input
                  type="radio"
                  name={`ec-step-${id || 'x'}`}
                  value={n}
                  checked={n === step}
                  disabled={n > step}
                  onChange={() => setStep(n)}
                  aria-label={`Step ${n}`}
                />
              </label>
            ))}
          </div>
          <h2 className="ec-heading">
            <Text field={ds.heading?.jsonValue} />
          </h2>
          {isEditing ? (
            <p className="ec-prompt">
              <Text field={ds.prompt?.jsonValue} />
            </p>
          ) : (
            (ds.prompt?.jsonValue?.value || '') && (
              <a className="ec-prompt" href={`#${id || 'ec'}-options`}>
                {ds.prompt?.jsonValue?.value}
              </a>
            )
          )}
        </div>
        <div className="ec-options" id={`${id || 'ec'}-options`}>
          {options.map((o) =>
            isEditing ? (
              <div key={o.id} className="ec-option">
                <RichText field={o.option?.jsonValue} />
                <Link field={o.link?.jsonValue ?? { value: {} }} className="ec-option-link-edit" />
              </div>
            ) : (
              <Link
                key={o.id}
                field={o.link?.jsonValue ?? { value: { href: '#' } }}
                className="ec-option"
                onClick={() => setStep((s) => Math.min(4, s + 1))}
              >
                <RichText field={o.option?.jsonValue} tag="span" />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ExpertConnectProps): JSX.Element => render(props, '');
export const Concentra = (props: ExpertConnectProps): JSX.Element => render(props, 'cc-expert-connect');
