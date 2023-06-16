import {
  ContactComponent,
  DividerComponent,
  FooterComponent,
  IndexHeroComponent,
  IndexWorkComponent,
  Services,
  TitleComponent,
} from '@qnton/components';
import React from 'react';

export const Index: React.FC = () => (
  <>
    <TitleComponent title='Fullstack developer' />
    <IndexHeroComponent />
    <DividerComponent
      id='work'
      title='My Work'
    />
    <IndexWorkComponent />
    <DividerComponent
      id='services'
      title='My Services'
    />
    <Services />
    <DividerComponent
      id='contact'
      title='Contact me'
    />
    <ContactComponent />
    <DividerComponent title='' />
    <FooterComponent />
  </>
);

export default Index;
