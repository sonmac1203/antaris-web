import { Html, Head, Main, NextScript } from 'next/document';
import { CommonHead } from '../components/layouts/components';
import Script from 'next/script';
import { DarkOverlay } from '@/core/components';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />

      <body>
        <Main />
        <NextScript />
        <Script
          async
          src='https://kit.fontawesome.com/ead8c78b5a.js'
          crossOrigin='anonymous'
          strategy='afterInteractive'
        />
        <DarkOverlay />
      </body>
    </Html>
  );
}
