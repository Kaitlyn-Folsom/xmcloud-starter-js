'use client';

import { JSX, useMemo, useState } from 'react';
import { Field, LinkField, Text, Link, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type JsonField<T> = { jsonValue?: T };

type Insight = {
  id: string;
  title?: JsonField<Field<string>>;
  date?: JsonField<Field<string>>;
  type?: JsonField<Field<string>>;
  summary?: JsonField<Field<string>>;
  link?: JsonField<LinkField>;
};

type InsightFields = {
  data?: {
    datasource?: {
      title?: JsonField<Field<string>>;
      children?: { results?: Insight[] };
    };
  };
};

export type InsightResultsProps = ComponentProps & { fields: InsightFields };

const textOf = (field?: JsonField<Field<string>>) => field?.jsonValue?.value || '';

const InsightResultsEmpty = (): JSX.Element => (
  <div className="component insight-results">
    <div className="component-content">
      <span className="is-empty-hint">InsightResults</span>
    </div>
  </div>
);

export const Default = ({ fields, params }: InsightResultsProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const datasource = fields?.data?.datasource;
  const items = datasource?.children?.results || [];
  const [type, setType] = useState('');
  const [sort, setSort] = useState('newest');
  const hubs = items.filter((item) => textOf(item.type) === 'Hub');
  const types = useMemo(
    () => [...new Set(items.map((item) => textOf(item.type)).filter((item) => item && item !== 'Hub'))].sort(),
    [items]
  );

  if (!datasource) return <InsightResultsEmpty />;

  const results = items
    .filter((item) => textOf(item.type) !== 'Hub')
    .filter((item) => !type || textOf(item.type) === type)
    .slice()
    .sort((a, b) => {
      const left = textOf(a.date);
      const right = textOf(b.date);
      return sort === 'oldest' ? left.localeCompare(right) : right.localeCompare(left);
    });

  return (
    <div
      className={`component insight-results ${params?.styles || ''}`}
      id={params?.RenderingIdentifier || undefined}
    >
      <div className="container">
        <h2>Trending</h2>
        <div className="row g-3 hubs">
          {hubs.map((item) => {
            const link = item.link?.jsonValue;
            return (
              <div className="col-md-4" key={item.id}>
                {link && <Link field={link} />}
              </div>
            );
          })}
        </div>
        <form className="result-filters" onSubmit={(event) => event.preventDefault()}>
          <label>
            Content type
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="">All</option>
              {types.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>
        </form>
        <p>{isPageEditing ? '' : `${results.length} results`}</p>
        <div className="results">
          {results.map((item) => {
            const link = item.link?.jsonValue;
            return (
              <article key={item.id}>
                <h3>{link && <Link field={link} />}</h3>
                {(isPageEditing || textOf(item.date)) && <Text tag="p" field={item.date?.jsonValue} />}
                {(isPageEditing || textOf(item.type)) && <Text tag="p" field={item.type?.jsonValue} />}
                {(isPageEditing || textOf(item.summary)) && <Text tag="p" field={item.summary?.jsonValue} />}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Dentons = (props: InsightResultsProps): JSX.Element => <Default {...props} />;
