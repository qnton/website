import { ErrorComponent, TitleComponent } from '@qnton/components';
import React from 'react';

export const NotFoundError: React.FC = () => (
  <>
    <TitleComponent title='Page not found' />
    <ErrorComponent />
  </>
);

export default NotFoundError;
