import React from 'react';

export const HeaderComponent: React.FC = () => {
  return (
    <>
      <meta
        content='initial-scale=1.0, width=device-width'
        name='viewport'
      />
      <meta
        content='text/html; charset=UTF-8'
        httpEquiv='content-type'
      />
      <meta
        content="default-src * 'self' 'unsafe-eval' 'unsafe-inline'"
        httpEquiv='Content-Security-Policy'
      />
      <meta charSet='utf-8' />
      <meta
        content='#0c0a09'
        name='theme-color'
      />
      <meta
        content='width=device-width,initial-scale=1'
        name='viewport'
      />
      <meta
        content='qnton - developer'
        name='description'
      />
      <meta
        content='qnton - developer'
        property='og:description'
      />
      <meta
        content='qnt.one'
        property='og:site_name'
      />
      <title>Anton Werschinin</title>
      <meta
        content='Anton Werschinin'
        key='title'
        property='og:title'
      />
      <link
        href='favicon.ico'
        rel='icon'
        type='image/x-icon'
      />
      <link
        href='images/apple-touch-icon-iphone-60x60.png'
        rel='apple-touch-icon'
      />
      <link
        href='images/apple-touch-icon-ipad-76x76.png'
        rel='apple-touch-icon'
        sizes='60x60'
      />
      <link
        href='images/apple-touch-icon-iphone-retina-120x120.png'
        rel='apple-touch-icon'
        sizes='114x114'
      />
      <link
        href='images/apple-touch-icon-ipad-retina-152x152.png'
        rel='apple-touch-icon'
        sizes='144x144'
      />
    </>
  );
};

export default HeaderComponent;
