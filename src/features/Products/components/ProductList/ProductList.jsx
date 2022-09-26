import React, { useContext } from 'react';

import { ProductsContext } from '@app/features';
import { ProductCard } from '@app/features/Products/components';

export const ProductList = () => {
  const { state } = useContext(ProductsContext);
  const { products } = state;

  return (
    <>
      {products.list.map((product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
    </>
  );
};
