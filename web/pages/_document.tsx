import { HeaderComponent } from '@qnton/components';
import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <HeaderComponent />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
