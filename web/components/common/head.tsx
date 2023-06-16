import NextHead from 'next/head';
import React from 'react';

export const Head = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://qnt.one/#localBusiness',
    name: 'qnton - developer',
    slogan: 'Elevate your web presence',
    url: 'https://qnt.one',
    email: 'hello@qnt.one',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hinterm Wall 28',
      addressLocality: 'Cloppenburg',
      postalCode: '49661',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.891917,
      longitude: 8.007354,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://www.linkedin.com/in/qnton',
      'https://github.com/qnton',
      'https://dev.to/qnton',
    ],
    currenciesAccepted: 'EUR',
    founder: {
      givenName: 'Anton',
      familyName: 'Werschinin',
      jobTitle: 'Developer',
      gender: 'Male',
      knowsLanguage: ['de-DE', 'en-US'],
    },
    foundingDate: '2022-01-01',
    foundingLocation: {
      name: 'Cloppenburg',
    },
    knowsLanguage: ['de-DE', 'en-US'],
    priceRange: '$$',
  };

  return (
    <NextHead>
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
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        key='structured-data'
        type='application/ld+json'
      />
    </NextHead>
  );
};

export default Head;
