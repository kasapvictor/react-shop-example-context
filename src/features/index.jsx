/* eslint-disable comma-dangle */
export { Products } from './Products';
export { CartModal } from './CartModal';
export { ProductCard } from './Products/ProductCard';
export {
  ProductsContext,
  ProductsProvider,
  setFetchingStatus,
  addToCart,
  addProducts,
  incProduct,
  decProduct,
  setCartModal,
  removeFromCart,
  existingInOrderList,
} from './Products/context';
export { Shop } from './Shop';
