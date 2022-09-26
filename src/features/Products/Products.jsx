import React, { useEffect, useContext } from 'react';

import { STATUS } from '@app/constants';
import { fetchProducts } from '@app/api';
import { CartModal } from '@app/features';
import { Preloader, Text, Cart } from '@app/components';

import { ProductsContext, setFetchingStatus, addProducts, setCartModal } from './context';
import { ProductList } from './components';
import { ProductsStyled } from './styled';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

const ProductsComponent = () => {
  const { state, dispatch } = useContext(ProductsContext);
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

export const Products = React.memo(ProductsComponent);
