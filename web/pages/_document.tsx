import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body data-scroll-container>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
