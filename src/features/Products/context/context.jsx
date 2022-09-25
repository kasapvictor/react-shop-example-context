import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { STATUS } from '@app/constants';

import { reducer } from './reducer';

export const ProductsContext = createContext();

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
    dispatch({ type: 'CART_MODAL', payload: isOpen });
  };

  state.removeProduct = (productId) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: { productId } });
  };

  state.addToCart = (productId) => {
    dispatch({ type: 'ADD_PRODUCT', payload: { productId } });
  };

  state.removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: { productId } });
  };

  state.addProducts = (fetchedProducts) => {
    dispatch({ type: 'ADD_PRODUCTS', payload: { fetchedProducts } });
  };

  state.incProduct = (productId) => {
    dispatch({ type: 'INCREMENT_PRODUCT', payload: { productId } });
  };

  state.decProduct = (productId) => {
    dispatch({ type: 'DECREMENT_PRODUCT', payload: { productId } });
  };

  state.existingInOrderList = (productId) => {
    return state.products.orderedList.find((product) => product.id === productId);
  };

  state.setFetchingStatus = (fetchingStatus, error) => {
    dispatch({ type: 'SET_STATUS', payload: { fetchingStatus, error } });
  };

  return <ProductsContext.Provider value={state}>{children}</ProductsContext.Provider>;
};

ProductsProvider.propTypes = {
  children: PropTypes.node,
};
