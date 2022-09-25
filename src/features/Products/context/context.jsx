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
});

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  return <ProductsContext.Provider value={{ state, dispatch }}>{children}</ProductsContext.Provider>;
};

ProductsProvider.propTypes = {
  children: PropTypes.node,
};
