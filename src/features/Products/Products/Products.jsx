import { useEffect, useContext } from 'react';

import { STATUS } from '@app/constants';
import { fetchProducts } from '@app/api';
import { Preloader, Text, Cart } from '@app/components';
import { CartModal, ProductCard, ProductsContext, setFetchingStatus, addProducts, setCartModal } from '@app/features';

import { ProductsStyled } from './styled';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

export const Products = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const { fetching, products, isCartModal } = state;

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
