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
      return {
        ...state,
        isCartModal: payload,
      };
    }

    case FETCHED_PRODUCTS: {
      const { fetchedProducts } = action.payload;
      return {
        ...state,
        products: {
          ...state.products,
          list: fetchedProducts,
        },
      };
    }

    case SET_FETCHED_STATUS: {
      const { fetchingStatus, error } = action.payload;
      return {
        ...state,
        fetching: {
          ...state.fetching,
          status: fetchingStatus,
          error,
        },
      };
    }

    case ADD_PRODUCT_TO_CART: {
      const { productId } = action.payload;
      const newProduct = state.products.list.find((product) => product.id === productId);

      const newOrderedList = [...state.products.orderedList, newProduct];
      const newCartOrderInfo = [
        ...state.products.cartOrderInfo,
        {
          count: 1,
          id: newProduct.id,
          name: newProduct.name,
          cost: newProduct.price,
          total: newProduct.price,
        },
      ];

      return {
        ...state,
        products: {
          ...state.products,
          orderedList: newOrderedList,
          cartOrderInfo: newCartOrderInfo,
        },
      };
    }

    case REMOVE_PRODUCT_FROM_CART: {
      const { productId } = action.payload;
      const filteredOrderedList = state.products.orderedList.filter((product) => product.id !== productId);
      const filteredCartOrderInfo = state.products.cartOrderInfo.filter((product) => product.id !== productId);

      return {
        ...state,
        products: {
          ...state.products,
          orderedList: filteredOrderedList,
          cartOrderInfo: filteredCartOrderInfo,
        },
      };
    }

    case INCREMENT_PRODUCT_CART: {
      const { productId } = action.payload;
      const newCartOrderInfo = state.products.cartOrderInfo.map((product) => {
        if (product.id === productId) {
          product.count = product.count + 1;
          product.total = product.cost * product.count;
        }

        return product;
      });

      return {
        ...state,
        products: {
          ...state.products,
          cartOrderInfo: newCartOrderInfo,
        },
      };
    }

    case DECREMENT_PRODUCT_CART: {
      const { productId } = action.payload;
      const newCartOrderInfo = state.products.cartOrderInfo.map((product) => {
        if (product.id === productId && product.count >= 2) {
          product.count = product.count - 1;
          product.total = product.cost * product.count;
        }

        return product;
      });

      return {
        ...state,
        products: {
          ...state.products,
          cartOrderInfo: newCartOrderInfo,
        },
      };
    }

    default:
      return state;
  }
};
