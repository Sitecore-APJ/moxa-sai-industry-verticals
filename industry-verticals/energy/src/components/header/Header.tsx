'use client';

import React, { JSX, useState, useEffect } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/shadcn/components/ui/drawer';
import { Menu, Search, X } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import PreviewSearch from '../non-sitecore/search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '@/constants/search';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname, searchParams]);

  return (
    <div
      className={`component header bg-background border-border sticky top-0 z-50 border-b shadow-sm ${styles}`}
      id={id}
    >
      <div className="container flex items-center gap-6 py-3 lg:py-4">
        <div className="header-block shrink-0 max-lg:w-full max-lg:justify-between lg:min-w-0">
          <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>

        <div className="hidden! min-w-0 flex-1 lg:flex! lg:justify-center">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>

        <button
          type="button"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label="Search"
          className="bg-background-muted text-foreground hover:text-accent flex size-9 shrink-0 items-center justify-center transition-colors"
        >
          <Search className="size-4" />
        </button>

        <div className="shrink-0 lg:hidden">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="text-foreground hover:text-accent p-2 transition-colors"
              >
                <Menu className="size-6" />
              </button>
            </DrawerTrigger>

            <DrawerContent className="bg-background w-xl! max-w-full! p-0">
              <div className="flex h-full flex-col">
                <div className="border-border flex items-center justify-between border-b px-6 py-4">
                  <Placeholder
                    name={`header-left-${DynamicPlaceholderId}`}
                    rendering={props.rendering}
                  />
                  <DrawerClose asChild>
                    <button type="button" aria-label="Close menu" className="p-1">
                      <X className="size-5" />
                    </button>
                  </DrawerClose>
                </div>

                <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto px-6 py-6">
                  <Placeholder
                    name={`header-nav-${DynamicPlaceholderId}`}
                    rendering={props.rendering}
                  />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-border bg-background absolute top-full right-0 left-0 z-50 border-b shadow-md">
          <div className="container py-4">
            <div className="flex items-center gap-3">
              <PreviewSearch
                rfkId={PREVIEW_WIDGET_ID}
                isOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
                className="text-foreground-muted hover:text-foreground p-2 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
