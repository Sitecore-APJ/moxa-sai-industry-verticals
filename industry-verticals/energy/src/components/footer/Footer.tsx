import React, { JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  LinkField,
  Placeholder,
  RichTextField,
  TextField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  RichText,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  CookiesText: LinkField;
  ContactText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const Footer = (props: FooterProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const id = props.params.RenderingIdentifier;

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <ContentSdkText field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <ContentSdkText field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <ContentSdkText field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
  ];

  return (
    <div className={`bg-hero py-12 text-white ${sxaStyles}`} id={id}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex max-w-44">
              <ContentSdkImage field={props.fields.Logo} width={200} />
            </div>
            <div className="**:text-foreground-secondary mb-6 text-sm leading-relaxed">
              <RichText field={props.fields.Description} />
            </div>
            <Placeholder name={phKeyFour} rendering={props.rendering} />
          </div>

          {sections.map(({ key, title, content }) => (
            <div key={key}>
              <div className="mb-4 text-base font-bold tracking-wide">{title}</div>
              <div className="text-foreground-secondary text-sm [&_a:hover]:text-accent [&_a]:text-foreground-secondary [&_a]:transition-colors">
                {content}
              </div>
            </div>
          ))}
        </div>

        <hr className="border-white/15 my-10" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-foreground-secondary order-2 text-sm md:order-1">
            <ContentSdkText field={props.fields.CopyrightText} />
          </p>
          <div className="order-1 flex flex-wrap justify-center gap-x-6 gap-y-2 md:order-2">
            <ContentSdkLink
              className="text-foreground-secondary hover:text-accent text-sm transition-colors"
              field={props.fields.PolicyText}
            />
            <ContentSdkLink
              className="text-foreground-secondary hover:text-accent text-sm transition-colors"
              field={props.fields.TermsText}
            />
            <ContentSdkLink
              className="text-foreground-secondary hover:text-accent text-sm transition-colors"
              field={props.fields.CookiesText}
            />
            <ContentSdkLink
              className="text-foreground-secondary hover:text-accent text-sm transition-colors"
              field={props.fields.ContactText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = Footer;
