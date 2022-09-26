import { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { STATUS } from '@app/constants';

import { reducer } from './reducer';

export const ProductsContext = createContext();

const initialState = () => ({
  products: {
    list: [],
    orderedList: [],
    cartOrderInfo: [],
    countProducts: 0,
  },
  fetching: {
    status: STATUS.IDLE,
    error: null,
  },
  isCartModal: false,
});

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  const memoState = useMemo(() => ({ state, dispatch }), [state]);

  return <ProductsContext.Provider value={{ ...memoState }}>{children}</ProductsContext.Provider>;
};

ProductsProvider.propTypes = {
  children: PropTypes.node,
};
