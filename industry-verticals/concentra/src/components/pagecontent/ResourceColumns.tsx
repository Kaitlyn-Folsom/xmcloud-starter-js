'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  NextImage,
  DateField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type JsonValue<T> = { jsonValue: T };

interface ResourceItem {
  id: string;
  column?: JsonValue<Field<string>>;
  title?: JsonValue<Field<string>>;
  date?: JsonValue<Field<string>>;
  excerpt?: JsonValue<Field<string>>;
  image?: JsonValue<ImageField>;
  link?: JsonValue<LinkField>;
}

interface Datasource {
  label1?: JsonValue<Field<string>>;
  label2?: JsonValue<Field<string>>;
  moreLink1?: JsonValue<LinkField>;
  moreLink2?: JsonValue<LinkField>;
  children?: { results?: ResourceItem[] };
}

export type ResourceColumnsProps = ComponentProps & {
  fields: { data?: { datasource?: Datasource } };
};

const formatDate = (iso?: string): string => {
  if (!iso || iso.startsWith('0001')) return '';
  const m = /^(\d{4})(\d{2})(\d{2})|^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return '';
  const [y, mo, d] = m[1] ? [m[1], m[2], m[3]] : [m[4], m[5], m[6]];
  return `${mo}/${d}/${y}`;
};
// mm/dd/yyyy -> yyyy-mm-dd for <time dateTime>
const isoDate = (shown: string): string => {
  const [mo, d, y] = shown.split('/');
  return `${y}-${mo}-${d}`;
};

const Column = ({ label, items, more, isEditing }: { label?: Field<string>; items: ResourceItem[]; more?: LinkField; isEditing: boolean }): JSX.Element => {
  const [featured, ...rest] = items;
  return (
    <div className="rc-column">
      {isEditing || !more?.value?.href ? (
        <div className="rc-label">
          <Text field={label} />
        </div>
      ) : (
        <Link field={more} className="rc-label" editable={false}>
          <Text field={label} editable={false} />
        </Link>
      )}
      {featured && (
        <div className="rc-featured">
          {(isEditing || featured.image?.jsonValue?.value?.src) && (
            <div className="rc-featured-img">
              <NextImage field={featured.image?.jsonValue} width={640} height={280} />
            </div>
          )}
          <h3 className="rc-featured-title">
            <Text field={featured.title?.jsonValue} />
          </h3>
          {/* stretched link: the whole featured block opens the item; its name comes from the title */}
          {!isEditing && featured.link?.jsonValue?.value?.href && (
            <a
              className="rc-featured-hit"
              href={featured.link.jsonValue.value.href}
              aria-label={String(featured.title?.jsonValue?.value ?? '')}
              {...(featured.link.jsonValue.value.target ? { target: featured.link.jsonValue.value.target } : {})}
            />
          )}
          {isEditing ? (
            <DateField field={featured.date?.jsonValue ?? { value: '' }} className="rc-date" />
          ) : (
            formatDate(featured.date?.jsonValue?.value) && (
              <time className="rc-date" dateTime={isoDate(formatDate(featured.date?.jsonValue?.value))}>
                {formatDate(featured.date?.jsonValue?.value)}
              </time>
            )
          )}
          <p className="rc-excerpt">
            <Text field={featured.excerpt?.jsonValue} />
          </p>
        </div>
      )}
      <ul className="rc-list">
        {rest.map((it) => (
          <li key={it.id} className="rc-row">
            <span className="rc-thumb">
              <NextImage field={it.image?.jsonValue} width={58} height={58} />
            </span>
            <Link field={it.link?.jsonValue ?? { value: {} }} className="rc-row-link" editable={false}>
              <Text field={it.title?.jsonValue} />
            </Link>
          </li>
        ))}
      </ul>
      {(isEditing || more?.value?.href) && <Link field={more ?? { value: {} }} className="rc-more" />}
    </div>
  );
};

const render = (props: ResourceColumnsProps, look: string): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const ds = props.fields?.data?.datasource;
  if (!ds) {
    return (
      <div className="component resource-columns">
        <span className="is-empty-hint">Resource columns: choose a datasource</span>
      </div>
    );
  }
  const all = ds.children?.results ?? [];
  const col = (n: string) => all.filter((i) => String(i.column?.jsonValue?.value ?? '1').trim() === n);
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component resource-columns ${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container rc-grid">
        <Column label={ds.label1?.jsonValue} items={col('1')} more={ds.moreLink1?.jsonValue} isEditing={isEditing} />
        <Column label={ds.label2?.jsonValue} items={col('2')} more={ds.moreLink2?.jsonValue} isEditing={isEditing} />
      </div>
    </div>
  );
};

export const Default = (props: ResourceColumnsProps): JSX.Element => render(props, '');
export const Concentra = (props: ResourceColumnsProps): JSX.Element => render(props, 'cc-resource-columns');
