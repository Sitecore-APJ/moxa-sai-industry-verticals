import { newsDateFormatter } from '@/helpers/dateHelper';
import { ArticleFields } from '@/types/article';
import {
  NextImage as ContentSdkImage,
  DateField,
  useSitecore,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { useI18n } from 'next-localization';
import Link from 'next/link';

interface ArticlesProps {
  fields: ArticleFields;
  id: string;
  url: string;
}

const ArticleCard = ({ fields, id, url }: ArticlesProps) => {
  const { t } = useI18n();
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  return (
    <div className="group flex h-full flex-col overflow-hidden border" key={id}>
      <div className="bg-background-muted relative h-56 overflow-hidden">
        <ContentSdkImage
          field={fields?.Image}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex grow flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          {fields.Category.fields.Category?.value && (
            <span className="bg-background-accent text-accent border-accent border px-2 py-0.5 text-xs font-semibold tracking-wide uppercase">
              <ContentSdkText field={fields.Category.fields.Category} />
            </span>
          )}
          <div className="flex items-center gap-2 text-sm">
            {(fields?.PublishedDate?.value || isPageEditing) && (
              <div className="text-foreground-secondary flex items-center gap-1">
                <Calendar className="size-3" />
                <DateField
                  tag="p"
                  className="news-date"
                  field={fields?.PublishedDate}
                  render={newsDateFormatter}
                />
              </div>
            )}
          </div>
        </div>
        {(fields?.Title?.value || isPageEditing) && (
          <div className="mb-3 text-base leading-snug font-bold wrap-break-word hyphens-auto">
            <ContentSdkText field={fields?.Title} />
          </div>
        )}
        {(fields?.ShortDescription?.value || isPageEditing) && (
          <div className="mb-4 grow text-sm leading-relaxed wrap-break-word hyphens-auto">
            <ContentSdkRichText field={fields?.ShortDescription} />
          </div>
        )}
        <div className="mt-auto flex items-center justify-between border-t pt-4">
          {(fields?.PublishedDate?.value || isPageEditing) && (
            <div className="text-foreground-secondary flex items-center gap-1 text-sm">
              <User className="size-3" />
              <ContentSdkText field={fields?.Author?.fields?.AuthorName} tag="p" />
            </div>
          )}
          <Link
            href={url}
            className="text-accent hover:text-accent-dark flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors"
            aria-label="Read full article"
          >
            {t('read_more') || 'Learn More'}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
