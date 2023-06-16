import {
  AboutAboutComponent,
  AboutContactComponent,
  AboutHeroComponent,
  AboutHobbiesComponent,
  AboutServicesComponent,
  DividerComponent,
  FooterComponent,
  TitleComponent,
} from '@qnton/components';
import React from 'react';

export const About: React.FC = () => (
  <>
    <TitleComponent title='About myself' />
    <AboutHeroComponent />
    <DividerComponent title='About myself' />
    <AboutAboutComponent />
    <DividerComponent title='My services' />
    <AboutServicesComponent />
    <DividerComponent title='My hobbies' />
    <AboutHobbiesComponent />
    <DividerComponent title='Contact me' />
    <AboutContactComponent />
    <DividerComponent title='' />
    <FooterComponent />
  </>
);

export default About;
