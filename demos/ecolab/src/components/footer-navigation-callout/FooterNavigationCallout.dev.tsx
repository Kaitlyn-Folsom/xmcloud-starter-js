import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@sitecore-content-sdk/nextjs';
import { ButtonBase as Button } from '@/components/button-component/ButtonComponent';
import { FooterNavigationCalloutProps } from './footer-navigation-callout.props';

export const Default: React.FC<FooterNavigationCalloutProps> = ({ fields }) => {
  const { title, description, linkOptional } = fields;

  return (
    <aside>
      <Card className="border-dark-foreground/20 bg-white/10 text-dark-foreground rounded-md border p-2 backdrop-blur-sm">
        <CardHeader className="flex flex-row justify-between pb-2">
          <CardTitle className="font-heading text-lg font-bold text-white">
            <Text tag="span" field={title} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text field={description} className="font-body text-sm leading-relaxed text-white/80" />
          {linkOptional && (
            <Button
              className="mt-6 block w-full rounded-full bg-white text-center text-primary hover:bg-gray-100"
              buttonLink={linkOptional}
              contextTitle={title?.value}
            />
          )}
        </CardContent>
      </Card>
    </aside>
  );
};
