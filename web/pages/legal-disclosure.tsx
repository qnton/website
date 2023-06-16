import React from 'react';

import {
  Disclaimer,
  Divider,
  Footer,
  LegalDisclosure,
  LegalDisclosureHero,
  Title,
} from '@qnton/components';

export const Legal: React.FC = () => (
  <>
    <LegalDisclosureHero />
    <Title>Legal Disclosure & Disclaimer</Title>
    <Divider>Legal Disclosure</Divider>
    <LegalDisclosure />
    <Divider>Disclaimer</Divider>
    <Disclaimer />
    <Divider />
    <Footer />
  </>
);

export default Legal;
