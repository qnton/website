import {
  DividerComponent,
  FooterComponent,
  IndexAboutComponent,
  IndexHeroComponent,
  IndexHobbiesComponent,
  IndexWorkComponent,
  TitleComponent,
} from '@qnton/components';
import React from 'react';

export const Index: React.FC = () => (
  <>
    <TitleComponent title='Fullstack developer' />
    <IndexHeroComponent />
    <DividerComponent title='Intro' />
    <IndexAboutComponent />
    <DividerComponent title='My latest work' />
    <IndexWorkComponent />
    <DividerComponent title='About myself' />
    <IndexHobbiesComponent />
    <DividerComponent title='' />
    <FooterComponent />
  </>
);

export default Index;
