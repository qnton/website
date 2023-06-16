import {
  DividerComponent,
  FooterComponent,
  LegalDisclosureDisclaimerComponent,
  LegalDisclosureHeroComponent,
  LegalDisclosureLegalDisclosureComponent,
  TitleComponent,
} from '@qnton/components';
import React from 'react';

export const Contact: React.FC = () => (
  <>
    <TitleComponent title='Legal Disclosure & Disclaimer' />
    <LegalDisclosureHeroComponent />
    <DividerComponent title='Legal Disclosure' />
    <LegalDisclosureLegalDisclosureComponent />
    <DividerComponent title='Disclaimer' />
    <LegalDisclosureDisclaimerComponent />
    <DividerComponent title='' />
    <FooterComponent />
  </>
);

export default Contact;
