import { Cart as CartComponent } from '@app/components';
import { setCartModal, useDispatch, useTrackedState } from '@app/store';

export const Cart = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { countProducts } = state.products;

  const handleOpenCartModal = () => {
    setCartModal(true)(dispatch);
  };

  return <CartComponent count={countProducts} onClick={handleOpenCartModal}></CartComponent>;
};
