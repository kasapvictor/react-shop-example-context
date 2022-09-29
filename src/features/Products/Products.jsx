import React, { useEffect } from 'react';

import { API_SHOP, STATUS } from '@app/constants';
import { fetchProducts2 } from '@app/api';
import { Preloader, Text } from '@app/components';

import { setFetchingStatus, addProducts, useTrackedState, useDispatch } from './store';
import { ProductList } from './components';
import { ProductsStyled } from './styled';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

export const Products = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { fetching } = state;

  useEffect(() => {
    if (fetching.status === IDLE) {
      const fetchedProducts = fetchProducts2(API_SHOP);

      setFetchingStatus(LOADING, null)(dispatch);

      fetchedProducts.then((data) => {
        const { shop } = data;

        if (shop) {
          setFetchingStatus(SUCCEEDED, null)(dispatch);
          addProducts(shop)(dispatch);
        }

        if (!shop) {
          setFetchingStatus(FAILED, data)(dispatch);
        }
      });
    }
  }, []);

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
