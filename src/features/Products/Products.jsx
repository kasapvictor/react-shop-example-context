import React, { useEffect } from 'react';

import { STATUS } from '@app/constants';
import { fetchProducts } from '@app/api';
import { CartModal } from '@app/features';
import { Preloader, Text, Cart } from '@app/components';

import { setFetchingStatus, addProducts, setCartModal, useTrackedState, useDispatch } from './context';
import { ProductList } from './components';
import { ProductsStyled } from './styled';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

export const Products = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { fetching, countProducts, isCartModal } = state;

  useEffect(() => {
    const fetchingProducts = fetchProducts();

    setFetchingStatus(LOADING, null)(dispatch);

    fetchingProducts.then((data) => {
      const { featured } = data;

      if (featured) {
        setFetchingStatus(SUCCEEDED, null)(dispatch);
        addProducts(featured)(dispatch);
      }

      if (!featured) {
        setFetchingStatus(FAILED, data)(dispatch);
      }
    });
  }, []);

  const handleOpenCartModal = () => {
    setCartModal(true)(dispatch);
  };

  return (
    <>
      <Cart count={countProducts} onClick={handleOpenCartModal} />

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
      {isCartModal && <CartModal />}
    </>
  );
};
