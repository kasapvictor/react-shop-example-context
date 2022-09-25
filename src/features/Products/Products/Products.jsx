import { useEffect, useContext } from 'react';

import { STATUS } from '@app/constants';
import { fetchProducts } from '@app/api';
import { CartModal, ProductCard, ProductsContext } from '@app/features';

import { Preloader, Text, Cart } from '@components';

import { ProductsStyled } from './styled';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

export const Products = () => {
  const state = useContext(ProductsContext);
  const { fetching, products, setCartModal, isCartModal } = state;

  useEffect(() => {
    const fetchingProducts = fetchProducts();

    state.setFetchingStatus(LOADING, null);

    fetchingProducts.then((data) => {
      const { featured } = data;

      if (featured) {
        state.setFetchingStatus(SUCCEEDED, null);
        state.addProducts(featured);
      }

      if (!featured) {
        state.setFetchingStatus(FAILED, data);
      }
    });
  }, []);

  const handleOpenCartModal = () => {
    setCartModal(true);
  };

  return (
    <>
      <Cart count={products.orderedList.length} onClick={handleOpenCartModal} />
      <ProductsStyled>
        {(fetching.status === IDLE || fetching.status === LOADING) && <Preloader />}

        {fetching.status === LOADING && 'Loading products ...'}

        {fetching.status === SUCCEEDED && (
          <>
            {products.list.map((product) => (
              <ProductCard key={product.id} productId={product.id} />
            ))}
          </>
        )}
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
