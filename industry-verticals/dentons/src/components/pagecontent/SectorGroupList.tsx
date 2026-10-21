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

type JsonField<T> = { jsonValue?: T };

type SectorLink = {
  id: string;
  group?: JsonField<Field<string>>;
  image?: JsonField<ImageField>;
  label?: JsonField<Field<string>>;
  link?: JsonField<LinkField>;
};

type SectorFields = {
  data?: {
    datasource?: {
      title?: JsonField<Field<string>>;
      children?: { results?: SectorLink[] };
    };
  };
};

export type SectorGroupListProps = ComponentProps & { fields: SectorFields };

const SectorGroupListEmpty = (): JSX.Element => (
  <div className="component sector-group-list">
    <div className="component-content">
      <span className="is-empty-hint">SectorGroupList</span>
    </div>
  </div>
);

export const Default = ({ fields, params }: SectorGroupListProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const datasource = fields?.data?.datasource;
  const items = datasource?.children?.results || [];
  if (!datasource) return <SectorGroupListEmpty />;

  const groups: { name: string; image?: ImageField; links: SectorLink[] }[] = [];
  items.forEach((item) => {
    const name = item.group?.jsonValue?.value || '';
    let group = groups.find((entry) => entry.name === name);
    if (!group) {
      group = { name, image: item.image?.jsonValue, links: [] };
      groups.push(group);
    }
    group.links.push(item);
  });

  return (
    <div
      className={`component sector-group-list ${params?.styles || ''}`}
      id={params?.RenderingIdentifier || undefined}
    >
      <div className="container">
        {(isPageEditing || datasource.title?.jsonValue?.value) && (
          <h2>
            <Text field={datasource.title?.jsonValue} />
          </h2>
        )}
        <div className="row g-4">
          {groups.map((group) => (
            <div className="col-md-4" key={group.name || group.links[0]?.id}>
              <article className="sector-card">
                {(isPageEditing || group.image?.value?.src) && (
                  <NextImage field={group.image} width={480} height={270} />
                )}
                <h3>{group.name}</h3>
                <ul>
                  {group.links.map((item) => (
                    <li key={item.id}>
                      {(isPageEditing || item.link?.jsonValue?.value?.href) ? (
                        <Link field={item.link?.jsonValue} />
                      ) : (
                        <Text field={item.label?.jsonValue} />
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Dentons = (props: SectorGroupListProps): JSX.Element => <Default {...props} />;
