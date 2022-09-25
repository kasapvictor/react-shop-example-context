import produce from 'immer';

import { DISPATCH_NAME } from '@app/constants';

const {
  SET_FETCHED_STATUS,
  SET_CART_MODAL,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  FETCHED_PRODUCTS,
  INCREMENT_PRODUCT_CART,
  DECREMENT_PRODUCT_CART,
} = DISPATCH_NAME;

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CART_MODAL: {
      return produce(state, (draft) => {
        draft.isCartModal = payload;
      });
    }

    case FETCHED_PRODUCTS: {
      const { fetchedProducts } = action.payload;

      return produce(state, (draft) => {
        draft.products.list = fetchedProducts;
      });
    }

    case SET_FETCHED_STATUS: {
      const { fetchingStatus, error } = action.payload;

      return produce(state, (draft) => {
        draft.fetching.status = fetchingStatus;
        draft.fetching.error = error;
      });
    }

    case ADD_PRODUCT_TO_CART: {
      const { productId } = action.payload;

      return produce(state, (draft) => {
        const orderedProduct = draft.products.list.find((product) => product.id === productId);

        draft.products.orderedList.push(orderedProduct);
        draft.products.cartOrderInfo.push({
          count: 1,
          id: orderedProduct.id,
          name: orderedProduct.name,
          cost: orderedProduct.price,
          total: orderedProduct.price,
        });
      });
    }

    case REMOVE_PRODUCT_FROM_CART: {
      const { productId } = action.payload;

      return produce(state, (draft) => {
        const newOrderList = draft.products.orderedList.filter((product) => product.id !== productId);
        const newCartOrderInfo = draft.products.cartOrderInfo.filter((product) => product.id !== productId);

        draft.products.orderedList = newOrderList;
        draft.products.cartOrderInfo = newCartOrderInfo;
      });
    }

    case INCREMENT_PRODUCT_CART: {
      const { productId } = action.payload;

      return produce(state, (draft) => {
        const product = draft.products.cartOrderInfo.find((product) => product.id === productId);

        product.count = product.count + 1;
        product.total = product.cost * product.count;
      });
    }

    case DECREMENT_PRODUCT_CART: {
      const { productId } = action.payload;

      return produce(state, (draft) => {
        const product = draft.products.cartOrderInfo.find((product) => product.id === productId);

        if (product.count >= 2) {
          product.count = product.count - 1;
          product.total = product.cost * product.count;
        }
      });
    }

    default:
      return state;
  }
};
