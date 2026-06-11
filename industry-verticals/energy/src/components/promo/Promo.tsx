import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  ImageField,
  LinkField,
  RichTextField,
  Text as ContentSdkText,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { LayoutStyles } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: TextField;
  PromoSubTitle: TextField;
  PromoDescription: RichTextField;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const isPromoReversed = sxaStyles?.includes(LayoutStyles.Reversed) ? 'lg:order-last' : '';

  return (
    <div className={`${sxaStyles}`} id={id}>
      <div className="container">
        <div className="my-12 grid overflow-hidden border transition-shadow hover:shadow-md lg:grid-cols-2">
          <div className={`relative flex items-stretch ${isPromoReversed}`}>
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="inset-0 h-full w-full object-cover max-lg:h-64 lg:absolute"
            />
          </div>
          <div className="flex flex-col justify-center bg-background p-8 lg:p-16">
            <span className="text-accent mb-2 text-sm font-medium tracking-wide uppercase">
              <ContentSdkText field={props.fields.PromoSubTitle} />
            </span>
            <h4 className="mb-4">
              <ContentSdkText field={props.fields.PromoTitle} />
            </h4>
            <div className="mb-8">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
            <ContentSdkLink field={props.fields.PromoMoreInfo} className="main-btn self-start" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Stacked = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const isPromoReversed = sxaStyles?.includes(LayoutStyles.Reversed) ? 'lg:order-last' : '';

  return (
    <div className={`${sxaStyles}`} id={id}>
      <div className="container">
        <div className="my-12 grid overflow-hidden border transition-shadow hover:shadow-md">
          <div className={`relative flex items-stretch ${isPromoReversed}`}>
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="h-64 w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-background p-8 lg:p-12">
            <span className="text-accent mb-2 text-sm font-medium tracking-wide uppercase">
              <ContentSdkText field={props.fields.PromoSubTitle} />
            </span>
            <h4 className="mb-4">
              <ContentSdkText field={props.fields.PromoTitle} />
            </h4>
            <div className="mb-8">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
            <ContentSdkLink field={props.fields.PromoMoreInfo} className="main-btn self-start" />
          </div>
        </div>
      </div>
    </div>
  );
};
