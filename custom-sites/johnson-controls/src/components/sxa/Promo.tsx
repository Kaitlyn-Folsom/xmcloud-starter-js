import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component promo bg-gray-100 ${props.params?.styles || ''}`}
        id={id ? id : undefined}
      >
        <div className="component-content md:flex gap-6 md:gap-8 p-8">
          {/* Image Section - Left */}
          <div className="field-promoicon order-2 md:order-1 max-w-[240px] w-full">
            <ContentSdkImage
              field={props.fields.PromoIcon}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Section - Right */}
          <div className="promo-text order-1 md:order-2 flex flex-col justify-center px-6 py-2 md:py-0 md:px-8">
            <div className="field-promotext mb-4">
              <ContentSdkRichText
                field={props.fields.PromoText}
                className="prose prose-lg max-w-none font-heading text-2xl md:text-[32px] font-semibold leading-tight text-gray-900"
              />
            </div>
             {/* Body Text */}
             <div className="field-promotext mb-2">
              <ContentSdkRichText
                field={props.fields.PromoText2}
                className="prose max-w-none text-base md:text-lg leading-relaxed text-gray-700"
              />
            </div>
            <div className="field-promolink mt-2">
              <ContentSdkLink
                field={props.fields.PromoLink}
                className="text-[#00539e] font-medium hover:text-[#00539e] inline-flex items-center gap-1 text-base md:text-lg"
              >
                <span>Find out more</span>
                <span className="ml-1">&gt;</span>
              </ContentSdkLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const ImageRight = (props: PromoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component promo bg-gray-100 ${props.params?.styles || ''}`}
        id={id ? id : undefined}
      >
        <div className="component-content md:flex gap-6 md:gap-8 p-8 justify-between">

          {/* Text Section - Right */}
          <div className="promo-text order-1 md:order-2 flex flex-col justify-center px-6 py-2 md:px-8 md:py-0">
            <div className="field-promotext mb-4">
              <ContentSdkRichText
                field={props.fields.PromoText}
                className="prose prose-lg max-w-none font-heading text-2xl md:text-[32px] font-semibold leading-tight text-gray-900"
              />
            </div>
             {/* Body Text */}
             <div className="field-promotext mb-2">
              <ContentSdkRichText
                field={props.fields.PromoText2}
                className="prose max-w-none text-base md:text-lg leading-relaxed text-gray-700"
              />
            </div>
            <div className="field-promolink mt-2">
              <ContentSdkLink
                field={props.fields.PromoLink}
                className="text-[#00539e] font-medium hover:text-[#00539e] inline-flex items-center gap-1 text-base md:text-lg"
              >
                <span>Find out more</span>
                <span className="ml-1">&gt;</span>
              </ContentSdkLink>
            </div>
          </div>

           {/* Image Section - Left */}
           <div className="field-promoicon order-2 md:order-2 max-w-[240px] w-full">
            <ContentSdkImage
              field={props.fields.PromoIcon}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

