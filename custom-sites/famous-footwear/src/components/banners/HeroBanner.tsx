"use client"
import React, { JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  LinkField,
  TextField,
  NextImage,
  withDatasourceCheck,
  Text,
  Link
} from '@sitecore-content-sdk/nextjs';

type HeroBannerProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: {
    Image: ImageField,
    Title: TextField,
    Subtitle: TextField,
    Link: LinkField
  }
};

const HeroBanner = (props: HeroBannerProps): JSX.Element => {
  return (
    <section className="relative overflow-hidden rounded-sm">
      <div className="relative aspect-[2.5/1] w-full md:aspect-[3/1]">
        <NextImage
          field={props.fields.Image}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" aria-hidden="true" />
      </div>
      <div
        className={`absolute inset-0 flex flex-col justify-center px-6 md:px-12`}
      >
        <h2 className="max-w-md text-2xl font-extrabold uppercase leading-tight text-card md:text-4xl lg:text-5xl text-balance">
          <Text field={props.fields.Title} />
        </h2>
        <p className="mt-2 max-w-sm text-sm text-card/90 md:text-base">
          <Text field={props.fields.Subtitle} />
        </p>
        <Link field={props.fields.Link} className="w-[130px] mt-4 inline-block rounded-sm bg-card px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-card/90" />
      </div>
    </section>
  )
}

export const Default = withDatasourceCheck()<HeroBannerProps>(HeroBanner);