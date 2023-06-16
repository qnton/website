import { ImageComponent } from '@qnton/components*';
import React from 'react';

import red_covid_test from '../../../../images/red_covid_test.avif';

export const WorkImageHankensComponent: React.FC = () => (
  <section className='mx-5 flex flex-col items-center justify-center text-center lg:mx-0'>
    <div className='overflow-hidden lg:mx-10'>
      <ImageComponent
        alt=''
        className='h-35'
        image={red_covid_test}
      />
    </div>
  </section>
);

export default WorkImageHankensComponent;
