import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';

import { STATUS } from '@app/constants';
import { fetchProducts } from '@app/api';
import { CartModal, ProductCard } from '@app/features';

import { Preloader, Text, Cart } from '@components';

import { ProductsStyled } from './styled';

const COUNT = 1;
const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

const initialStateProducts = () => ({
  list: [],
  orderedList: [],
  cartOrderInfo: [],
});

const initialStateFetching = () => ({
  status: IDLE,
  error: null,
});

export const Products = () => {
  const [isCartModal, setCartModal] = useState(false);
  const [products, setProducts] = useImmer(initialStateProducts());
  const [fetching, setFetching] = useImmer(initialStateFetching());

  const notify = (message) => toast.success(message);

  useEffect(() => {
    const fetchingProducts = fetchProducts();

    setFetching((draft) => {
      draft.status = LOADING;
      draft.error = null;
    });

    fetchingProducts.then((data) => {
      const { featured } = data;

      if (featured) {
        setProducts((draft) => {
          draft.list = featured;
        });
        setFetching((draft) => {
          draft.status = SUCCEEDED;
        });
      }

      if (!featured) {
        setFetching((draft) => {
          draft.status = FAILED;
          draft.error = data;
        });
      }
    });
  }, []);

  const existingInOrderList = (productId) => {
    return products.orderedList.find((product) => product.id === productId);
  };

  const handleOpenCartModal = () => {
    setCartModal(true);
  };

  const handleCloseCartModal = () => {
    setCartModal(false);
  };

  const incrementProduct = (productId) => () => {
    setProducts((draft) => {
      const product = draft.cartOrderInfo.find((product) => product.id === productId);

      product.count = product.count + COUNT;
      product.total = product.cost * product.count;
    });
  };

  const decrementProduct = (productId) => () => {
    setProducts((draft) => {
      const product = draft.cartOrderInfo.find((product) => product.id === productId);

      if (product.count >= COUNT + 1) {
        product.count = product.count - COUNT;
        product.total = product.cost * product.count;
      }
    });
  };

  const removeProduct = (productId) => () => {
    setProducts((draft) => {
      const newOrderList = draft.orderedList.filter((product) => product.id !== productId);
      draft.orderedList = newOrderList;

      const newCartOrderInfo = draft.cartOrderInfo.filter((product) => product.id !== productId);
      draft.cartOrderInfo = newCartOrderInfo;
    });

    notify('Товар удален');
  };

  const handleAddToCart = (productId) => () => {
    const orderedProduct = products.list.find((product) => product.id === productId);
    const isOrderedProduct = existingInOrderList(productId);

    if (!isOrderedProduct) {
      setProducts((draft) => {
        draft.orderedList.push(orderedProduct);
        draft.cartOrderInfo.push({
          count: COUNT,
          id: orderedProduct.id,
          name: orderedProduct.name,
          cost: orderedProduct.price,
          total: orderedProduct.price,
        });
      });

      notify(`${orderedProduct.name} добавлен в корзину`);
    }

    if (isOrderedProduct) {
      setProducts((draft) => {
        const product = draft.cartOrderInfo.find((product) => product.id === productId);

        product.count = product.count + COUNT;
        product.total = product.cost * product.count;
      });

      notify(`+1 ${orderedProduct.name} добавлен в корзину`);
    }
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
              <ProductCard key={product.id} product={product} addToCart={handleAddToCart} existingInOrder={existingInOrderList} />
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

      {isCartModal && (
        <CartModal
          products={products.cartOrderInfo}
          onClose={handleCloseCartModal}
          inc={incrementProduct}
          dec={decrementProduct}
          remove={removeProduct}
          isOpen={isCartModal}
        />
      )}
    </>
  );
};
