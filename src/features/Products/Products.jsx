import React from 'react';

import { STATUS } from '@app/constants';
import { useTrackedState } from '@app/store';
import { Preloader, Text } from '@app/components';

import { ProductsStyled } from './styled';
import { ProductList } from './components';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

export const Products = () => {
  const state = useTrackedState();
  const { fetching } = state;

  return (
    <>
      <ProductsStyled>
        {(fetching.status === IDLE || fetching.status === LOADING) && <Preloader />}

        {fetching.status === LOADING && 'Loading products ...'}

        {fetching.status === SUCCEEDED && <ProductList />}
      </ProductsStyled>

      {fetching.status === FAILED && (
        <>
          <Text variant="bold" size="xlarge">
            Error:
          </Text>
          <br />
          {fetching.error}
        </>
      )}
    </>
  );
};
