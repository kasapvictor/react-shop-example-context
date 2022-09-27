import React from 'react';

import { Products, Provider } from '@app/features';

export const Shop = () => {
  return (
    <Provider>
      <Products />
    </Provider>
  );
};
