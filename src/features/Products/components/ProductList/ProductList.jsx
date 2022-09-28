import React from 'react';

import { useTrackedState } from '@app/features';
import { ProductCard } from '@app/features/Products/components';

export const ProductList = () => {
  const state = useTrackedState();
  const { products } = state;

  return (
    <>
      {products.list.map(({ mainId }) => (
        <ProductCard key={mainId} productId={mainId} />
      ))}
    </>
  );
};
