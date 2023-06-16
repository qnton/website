import {
  DividerComponent,
  FooterComponent,
  TitleComponent,
  WorkAboutSchnelltestComponent,
  WorkHeroSchnelltestComponent,
  WorkImageSchnelltestComponent,
  WorkRedirectSchnelltestComponent,
} from '@qnton/components';
import React from 'react';

export const Schnelltest: React.FC = () => (
  <>
    <TitleComponent title='Schnelltest' />
    <WorkHeroSchnelltestComponent />
    <DividerComponent title='About' />
    <WorkAboutSchnelltestComponent />
    <DividerComponent title='Images' />
    <WorkImageSchnelltestComponent />
    <DividerComponent title='Hankens' />
    <WorkRedirectSchnelltestComponent />
    <DividerComponent title='' />
    <FooterComponent />
  </>
);

export default Schnelltest;
