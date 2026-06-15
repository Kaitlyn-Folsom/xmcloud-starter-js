import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text, Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { ButtonBase as Button } from '@/components/button-component/ButtonComponent';

interface FooterNavigationCalloutFields {
  title?: Field<string>;
  description?: Field<string>;
  linkOptional?: LinkField;
}

interface FooterNavigationCalloutProps {
  fields: FooterNavigationCalloutFields;
}

export const Default: React.FC<FooterNavigationCalloutProps> = ({ fields }) => {
  const { title, description, linkOptional } = fields;

  return (
    <aside>
      <Card className="bg-tertiary text-tertiary-foreground rounded-none border-none shadow-none">
        <CardHeader className="flex flex-row justify-between pb-2">
          <CardTitle className="font-heading text-xl font-semibold">
            <Text tag="span" field={title} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text field={description} className="font-body text-sm leading-relaxed" />
          {linkOptional && (
            <Button
              className="mt-6 block w-full bg-white text-foreground hover:bg-secondary"
              buttonLink={linkOptional}
              contextTitle={title?.value}
            />
          )}
        </CardContent>
      </Card>
    </aside>
  );
};
