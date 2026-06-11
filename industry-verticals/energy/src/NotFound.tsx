import Head from 'next/head';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: Page Not Found</title>
    </Head>
    <div className="bg-background flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center">
        <p className="text-accent mb-4 text-sm font-medium tracking-widest uppercase">404</p>
        <h1 className="mb-4 text-3xl font-bold lg:text-4xl">Page not found</h1>
        <p className="text-foreground-light mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="main-btn inline-flex">
          Return to Home
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
