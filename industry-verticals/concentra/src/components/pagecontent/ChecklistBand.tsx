'use client';

import { JSX } from 'react';
import { Field, RichTextField, Text, RichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Heading?: Field<string>;
  Text?: RichTextField;
  Column1?: RichTextField;
  Column2?: RichTextField;
  Column3?: RichTextField;
}

export type ChecklistBandProps = ComponentProps & { fields: Fields };

const render = (props: ChecklistBandProps, look: string): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const f = props.fields;
  if (!f) {
    return (
      <div className="component checklist-band">
        <span className="is-empty-hint">Checklist band: choose a datasource</span>
      </div>
    );
  }
  const cols = [f.Column1, f.Column2, f.Column3].filter((c) => isEditing || c?.value);
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component checklist-band ${look} ${props.params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        <h2 className="clb-heading">
          <Text field={f.Heading} />
        </h2>
        <RichText field={f.Text} className="clb-text" />
        <div className={`clb-columns cols-${cols.length}`}>
          {cols.map((c, i) => (
            <RichText key={i} field={c} className="clb-column cc-cross-list" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ChecklistBandProps): JSX.Element => render(props, '');
export const Concentra = (props: ChecklistBandProps): JSX.Element => render(props, 'cc-navy-band');
