import { ImageComponent } from '@qnton/components*';
import React from 'react';

import dark_labor from '../../../../images/dark_labor.avif';
import rubber_glove from '../../../../images/rubber_glove.avif';
import second_behind_covid_test from '../../../../images/second_behind_covid_test.avif';

export const WorkImageSchnelltestComponent: React.FC = () => (
  <section className='mx-5 flex flex-col items-center justify-center text-center lg:mx-0'>
    <div className='grid-cols-3 lg:grid'>
      <div className='mb-8 overflow-hidden lg:mb-0 lg:ml-10 lg:mr-5'>
        <ImageComponent
          alt=''
          className='h-35'
          image={dark_labor}
        />
      </div>
      <div className='mb-8 overflow-hidden lg:mx-5 lg:mb-0'>
        <ImageComponent
          alt=''
          className='h-35'
          image={rubber_glove}
        />
      </div>
      <div className='overflow-hidden lg:mr-10 lg:ml-5'>
        <ImageComponent
          alt=''
          className='h-35'
          image={second_behind_covid_test}
        />
      </div>
    </div>
  </section>
);

export default WorkImageSchnelltestComponent;
