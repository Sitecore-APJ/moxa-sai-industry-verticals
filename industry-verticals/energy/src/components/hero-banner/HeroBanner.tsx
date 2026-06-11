import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
  SecondaryCtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;

  const hasMedia = fields?.Video?.value?.src || fields?.Image?.value?.src;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner relative overflow-hidden py-16 lg:py-24 ${styles}`}
      id={id}
    >
      {/* Blueprint grid overlay */}
      <div className="hero-grid-overlay absolute inset-0 z-0" aria-hidden="true" />

      {/* Background media with dark overlay */}
      {hasMedia && (
        <div className="absolute inset-0 z-1">
          {!isPageEditing && fields?.Video?.value?.src ? (
            <video
              className="h-full w-full object-cover opacity-30"
              autoPlay
              muted
              loop
              playsInline
              poster={fields.Image?.value?.src}
            >
              <source src={fields.Video?.value?.src} type="video/webm" />
            </video>
          ) : (
            <ContentSdkImage
              field={fields.Image}
              className="h-full w-full object-cover opacity-20"
              priority
            />
          )}
          <div className="from-hero via-hero/90 to-hero/70 absolute inset-0 bg-linear-to-r" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-3 container mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-left">
            <h1 className="text-background text-4xl leading-tight font-bold lg:text-5xl">
              <ContentSdkText field={fields.Title} />
            </h1>

            <div className="**:text-background/90 max-w-xl text-lg leading-relaxed **:text-left">
              <ContentSdkRichText field={fields.Description} />
            </div>

            {(fields?.CtaLink || fields?.SecondaryCtaLink) && (
              <div className="flex flex-wrap gap-4 pt-2">
                {fields?.CtaLink && <Link field={fields.CtaLink} className="ghost-btn" />}
                {fields?.SecondaryCtaLink && (
                  <Link field={fields.SecondaryCtaLink} className="main-btn" />
                )}
              </div>
            )}
          </div>

          {hasMedia && (
            <div className="relative hidden lg:block">
              <ContentSdkImage
                field={fields.Image}
                className="relative z-1 h-auto w-full object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
