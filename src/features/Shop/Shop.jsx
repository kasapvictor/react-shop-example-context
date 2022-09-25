import React from 'react';

import { Products, ProductsProvider } from '@app/features';

export const Shop = () => {
  return (
    <ProductsProvider>
      <Products />
    </ProductsProvider>
  );
};
