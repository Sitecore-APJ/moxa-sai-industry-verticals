import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  RichTextField,
  RichText as ContentSdkRichText,
  Image as ContentSdkImage,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { Article } from '@/types/article';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from 'next-localization';

interface Fields {
  Title: Field<string>;
  Description: RichTextField;
  Articles: Array<Article>;
}

export type SelectedArticlesProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: SelectedArticlesProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const styles = props.params.styles || [];
  const articles = props.fields?.Articles || [];

  return (
    <section className={`bg-background-muted py-16 ${styles}`} id={id}>
      <div className="container">
        <div className="in-[.column-splitter]:px-0">
          <div className="mb-12 text-center">
            <h2 className="mb-4">
              <ContentSdkText field={props.fields.Title} />
            </h2>
            <div className="text-foreground-light mx-auto max-w-2xl text-lg">
              <ContentSdkRichText field={props.fields.Description} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => {
            return (
              <div
                key={index}
                className="bg-background group flex flex-col overflow-hidden border transition-shadow hover:shadow-md"
              >
                <ContentSdkImage
                  field={article.fields.Image}
                  className="h-40 w-full shrink-0 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="flex grow flex-col justify-between p-6">
                  <h6 className="mb-4 text-base leading-snug font-bold">
                    <ContentSdkText field={article.fields.Title} />
                  </h6>
                  <Link
                    href={article.url}
                    className="text-accent hover:text-accent-dark inline-flex items-center gap-1 self-start text-sm font-medium tracking-wide uppercase transition-colors"
                  >
                    {t('read_more') || 'Learn More'}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
