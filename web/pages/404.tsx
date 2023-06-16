import React from 'react';

import { Error, Title } from '@qnton/components';

export const NotFoundError: React.FC = () => (
  <>
    <Title>Page not found</Title>
    <Error />
  </>
);

export default NotFoundError;
