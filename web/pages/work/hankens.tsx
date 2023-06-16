import {
  DividerComponent,
  FooterComponent,
  TitleComponent,
  WorkAboutHankensComponent,
  WorkHeroHankensComponent,
  WorkImageHankensComponent,
  WorkRedirectHankensComponent,
} from '@qnton/components';
import React from 'react';

export const Hankens: React.FC = () => (
  <>
    <TitleComponent title='Hankens' />
    <WorkHeroHankensComponent />
    <DividerComponent title='About' />
    <WorkAboutHankensComponent />
    <DividerComponent title='Images' />
    <WorkImageHankensComponent />
    <DividerComponent title='Schnelltest' />
    <WorkRedirectHankensComponent />
    <DividerComponent title='' />
    <FooterComponent />
  </>
);

export default Hankens;
