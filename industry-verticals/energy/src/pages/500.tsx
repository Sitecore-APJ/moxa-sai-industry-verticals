import Head from 'next/head';
import Link from 'next/link';
import { SitecoreProvider, SitecorePageProps, Page, ErrorPage } from '@sitecore-content-sdk/nextjs';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import scConfig from 'sitecore.config';
import client from 'lib/sitecore-client';
import components from '.sitecore/component-map';
import { JSX } from 'react';

/**
 * Rendered in case if we have 500 error
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>500: Server Error</title>
    </Head>
    <div className="bg-background flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center">
        <p className="text-accent mb-4 text-sm font-medium tracking-widest uppercase">500</p>
        <h1 className="mb-4 text-3xl font-bold lg:text-4xl">Internal server error</h1>
        <p className="text-foreground-light mb-8">
          There is a problem with the resource you are looking for, and it cannot be displayed.
        </p>
        <Link href="/" className="main-btn inline-flex">
          Return to Home
        </Link>
      </div>
    </div>
  </>
);

const Custom500 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.page)) {
    return <ServerError />;
  }

  return (
    <SitecoreProvider api={scConfig.api} componentMap={components} page={props.page}>
      <Layout page={props.page} />
    </SitecoreProvider>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let page: Page | null = null;

  if (scConfig.generateStaticPaths) {
    try {
      page = await client.getErrorPage(ErrorPage.InternalServerError, {
        site: scConfig.defaultSite,
        locale: context.locale || context.defaultLocale || scConfig.defaultLanguage,
      });
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      page,
    },
  };
};

export default Custom500;
