'use client';

import { JSX, useState } from 'react';
import { Field, RichTextField, Text, RichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type JsonValue<T> = { jsonValue: T };

interface TabItem {
  id: string;
  tabLabel?: JsonValue<Field<string>>;
  title?: JsonValue<Field<string>>;
  body?: JsonValue<RichTextField>;
}

interface Datasource {
  heading?: JsonValue<Field<string>>;
  children?: { results?: TabItem[] };
}

export type ContentTabsProps = ComponentProps & {
  fields: { data?: { datasource?: Datasource } };
};

const render = (props: ContentTabsProps, look: string): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const [active, setActive] = useState(0);
  const ds = props.fields?.data?.datasource;
  if (!ds) {
    return (
      <div className="component content-tabs">
        <span className="is-empty-hint">Content tabs: choose a datasource</span>
      </div>
    );
  }
  const tabs = ds.children?.results ?? [];
  const current = tabs[Math.min(active, Math.max(0, tabs.length - 1))];
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component content-tabs ${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        {(isEditing || ds.heading?.jsonValue?.value) && (
          <h2 className="ct-heading">
            <Text field={ds.heading?.jsonValue} />
          </h2>
        )}
        <div className="ct-tabs" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`ct-tab ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <Text field={t.tabLabel?.jsonValue} />
            </button>
          ))}
        </div>
        {current && (
          <div className="ct-panel" role="tabpanel">
            {(isEditing || current.title?.jsonValue?.value) && (
              <h3 className="ct-title">
                <Text field={current.title?.jsonValue} />
              </h3>
            )}
            <RichText field={current.body?.jsonValue} className="ct-body cc-cross-list" />
          </div>
        )}
      </div>
    </div>
  );
};

export const Default = (props: ContentTabsProps): JSX.Element => render(props, '');
export const Concentra = (props: ContentTabsProps): JSX.Element => render(props, 'cc-tabs');
export const ConcentraPanel = (props: ContentTabsProps): JSX.Element => render(props, 'cc-tabs cc-tabs-panel');
