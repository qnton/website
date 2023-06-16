import React from 'react';

import {
  Contact,
  Divider,
  Footer,
  IndexHero,
  Services,
  Title,
  Work,
} from '@qnton/components';

export const Index: React.FC = () => (
  <>
    <Title>Fullstack developer</Title>
    <IndexHero />
    <Divider id='work'>My Work</Divider>
    <Work />
    <Divider id='services'>My Services</Divider>
    <Services />
    <Divider id='contact'>Contact me</Divider>
    <Contact />
    <Divider />
    <Footer />
  </>
);

export default Index;
