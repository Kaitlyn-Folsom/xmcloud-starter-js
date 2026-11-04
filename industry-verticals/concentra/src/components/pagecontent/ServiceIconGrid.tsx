'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type JsonValue<T> = { jsonValue: T };

interface ServiceItem {
  id: string;
  icon?: JsonValue<ImageField>;
  label?: JsonValue<Field<string>>;
  link?: JsonValue<LinkField>;
}

interface Datasource {
  heading?: JsonValue<Field<string>>;
  text?: JsonValue<Field<string>>;
  link1?: JsonValue<LinkField>;
  link2?: JsonValue<LinkField>;
  children?: { results?: ServiceItem[] };
}

export type ServiceIconGridProps = ComponentProps & {
  fields: { data?: { datasource?: Datasource } };
};

const EmptyState = (): JSX.Element => (
  <div className="component service-icon-grid">
    <span className="is-empty-hint">Service icon grid: choose a datasource</span>
  </div>
);

const render = (props: ServiceIconGridProps, look: string): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const ds = props.fields?.data?.datasource;
  if (!ds) return <EmptyState />;
  const items = ds.children?.results ?? [];
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component service-icon-grid ${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        {(isEditing || ds.heading?.jsonValue?.value) && (
          <h2 className="sig-heading">
            <Text field={ds.heading?.jsonValue} />
          </h2>
        )}
        {(isEditing || ds.text?.jsonValue?.value) && (
          <p className="sig-text">
            <Text field={ds.text?.jsonValue} />
          </p>
        )}
        <ul className="sig-items">
          {items.map((item) => (
            <li key={item.id} className="sig-item">
              <Link field={item.link?.jsonValue ?? { value: {} }} className="sig-link" editable={false}>
                <span className="sig-ring">
                  <NextImage field={item.icon?.jsonValue} width={62} height={62} className="sig-icon" />
                </span>
                <span className="sig-label">
                  <Text field={item.label?.jsonValue} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="sig-buttons">
          {(isEditing || ds.link1?.jsonValue?.value?.href) && <Link field={ds.link1?.jsonValue ?? { value: {} }} className="cc-button-block" />}
          {(isEditing || ds.link2?.jsonValue?.value?.href) && <Link field={ds.link2?.jsonValue ?? { value: {} }} className="cc-button-block" />}
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ServiceIconGridProps): JSX.Element => render(props, '');
export const Concentra = (props: ServiceIconGridProps): JSX.Element => render(props, 'cc-navy-band');
