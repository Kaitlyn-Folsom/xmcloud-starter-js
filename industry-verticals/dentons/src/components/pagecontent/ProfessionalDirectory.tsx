'use client';

import { JSX, useMemo, useState } from 'react';
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

type Person = {
  id: string;
  name?: JsonField<Field<string>>;
  role?: JsonField<Field<string>>;
  office?: JsonField<Field<string>>;
  photo?: JsonField<ImageField>;
  email?: JsonField<LinkField>;
  link?: JsonField<LinkField>;
};

type DirectoryFields = {
  data?: {
    datasource?: {
      title?: JsonField<Field<string>>;
      intro?: JsonField<Field<string>>;
      children?: { results?: Person[] };
    };
  };
};

export type ProfessionalDirectoryProps = ComponentProps & { fields: DirectoryFields };

const valueOf = (field?: JsonField<Field<string>>) => field?.jsonValue?.value || '';

const ProfessionalDirectoryEmpty = (): JSX.Element => (
  <div className="component professional-directory">
    <div className="component-content">
      <span className="is-empty-hint">ProfessionalDirectory</span>
    </div>
  </div>
);

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PAGE_SIZE = 8;

export const Default = ({ fields, params }: ProfessionalDirectoryProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const datasource = fields?.data?.datasource;
  const people = datasource?.children?.results || [];
  const [keyword, setKeyword] = useState('');
  const [letter, setLetter] = useState('');
  const [office, setOffice] = useState('');
  const [role, setRole] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const offices = useMemo(
    () => [...new Set(people.map((person) => valueOf(person.office)).filter(Boolean))].sort(),
    [people]
  );
  const roles = useMemo(
    () => [...new Set(people.map((person) => valueOf(person.role)).filter(Boolean))].sort(),
    [people]
  );

  if (!datasource) return <ProfessionalDirectoryEmpty />;

  const query = keyword.trim().toLowerCase();
  const matched = people.filter((person) => {
    const name = valueOf(person.name);
    const haystack = [name, valueOf(person.role), valueOf(person.office)].join(' ').toLowerCase();
    const lastName = name.trim().split(/\s+/).slice(-1)[0] || '';
    if (query && !haystack.includes(query)) return false;
    if (letter && !lastName.toUpperCase().startsWith(letter)) return false;
    if (office && valueOf(person.office) !== office) return false;
    if (role && valueOf(person.role) !== role) return false;
    return true;
  });
  const shown = isPageEditing ? matched : matched.slice(0, visible);

  return (
    <div
      className={`component professional-directory ${params?.styles || ''}`}
      id={params?.RenderingIdentifier || undefined}
    >
      <div className="container">
        <h1>
          <Text field={datasource.title?.jsonValue} />
        </h1>
        {(isPageEditing || valueOf(datasource.intro)) && <Text tag="p" field={datasource.intro?.jsonValue} />}
        <form className="directory-filters" onSubmit={(event) => event.preventDefault()}>
          <label>
            Search
            <input value={keyword} onChange={(event) => { setKeyword(event.target.value); setVisible(PAGE_SIZE); }} />
          </label>
          <div className="letters" aria-label="Filter list by last names starting with the selected letter">
            <button type="button" aria-pressed={letter === ''} onClick={() => setLetter('')}>All</button>
            {LETTERS.map((item) => (
              <button key={item} type="button" aria-pressed={letter === item} onClick={() => { setLetter(item); setVisible(PAGE_SIZE); }}>
                {item}
              </button>
            ))}
          </div>
          {offices.length > 0 && (
            <label>
              Location
              <select value={office} onChange={(event) => setOffice(event.target.value)}>
                <option value="">All</option>
                {offices.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          )}
          {roles.length > 0 && (
            <label>
              Position
              <select value={role} onChange={(event) => setRole(event.target.value)}>
                <option value="">All</option>
                {roles.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          )}
        </form>
        <div className="row g-4">
          {shown.map((person) => (
            <div className="col-md-6 col-lg-3" key={person.id}>
              <article className="person-card">
                {(isPageEditing || person.photo?.jsonValue?.value?.src) && (
                  <NextImage field={person.photo?.jsonValue} width={151} height={181} />
                )}
                <h2>
                  {person.link?.jsonValue && (isPageEditing || person.link.jsonValue.value?.href) ? (
                    <Link field={person.link.jsonValue} />
                  ) : (
                    <Text field={person.name?.jsonValue} />
                  )}
                </h2>
                {(isPageEditing || valueOf(person.role)) && <Text tag="p" field={person.role?.jsonValue} />}
                {(isPageEditing || valueOf(person.office)) && <Text tag="p" field={person.office?.jsonValue} />}
                {person.email?.jsonValue && (isPageEditing || person.email.jsonValue.value?.href) && (
                  <Link field={person.email.jsonValue} className="button button-main" />
                )}
              </article>
            </div>
          ))}
        </div>
        {!isPageEditing && visible < matched.length && (
          <button type="button" className="button button-main" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export const Dentons = (props: ProfessionalDirectoryProps): JSX.Element => <Default {...props} />;
