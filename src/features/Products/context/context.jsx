import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { STATUS, DISPATCH_NAME } from '@app/constants';

import { reducer } from './reducer';

export const ProductsContext = createContext();

const {
  SET_FETCHED_STATUS,
  SET_CART_MODAL,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  FETCHED_PRODUCTS,
  INCREMENT_PRODUCT_CART,
  DECREMENT_PRODUCT_CART,
} = DISPATCH_NAME;

const initialState = () => ({
  products: {
    list: [],
    orderedList: [],
    cartOrderInfo: [],
  },
  fetching: {
    status: STATUS.IDLE,
    error: null,
  },
  isCartModal: false,
  notify: null,
});

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  state.setCartModal = (isOpen) => {
    dispatch({ type: SET_CART_MODAL, payload: isOpen });
  };

  state.addToCart = (productId) => {
    dispatch({ type: ADD_PRODUCT_TO_CART, payload: { productId } });
  };

  state.removeFromCart = (productId) => {
    dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: { productId } });
  };

  state.addProducts = (fetchedProducts) => {
    dispatch({ type: FETCHED_PRODUCTS, payload: { fetchedProducts } });
  };

  state.incProduct = (productId) => {
    dispatch({ type: INCREMENT_PRODUCT_CART, payload: { productId } });
  };

  state.decProduct = (productId) => {
    dispatch({ type: DECREMENT_PRODUCT_CART, payload: { productId } });
  };

  state.existingInOrderList = (productId) => {
    return state.products.orderedList.find((product) => product.id === productId);
  };

  state.setFetchingStatus = (fetchingStatus, error) => {
    dispatch({ type: SET_FETCHED_STATUS, payload: { fetchingStatus, error } });
  };

  return <ProductsContext.Provider value={state}>{children}</ProductsContext.Provider>;
};

ProductsProvider.propTypes = {
  children: PropTypes.node,
};
