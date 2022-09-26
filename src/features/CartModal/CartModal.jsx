import React, { useState, useContext } from 'react';

import { INTERVAL_3 } from '@app/constants';
import { Text, Modal } from '@app/components';
import { ProductsContext, setCartModal } from '@app/features';

import { CartModalBody, CartModalContainer, CartModalFooter, CartModalHeader, CartModalWrapper } from './styled';
import { CartItem } from './components';

export const CartModal = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const { products, isCartModal } = state;

  const [isCloseCartModal, setIsCloseCartModal] = useState(false);

  const handleClose = () => {
    setIsCloseCartModal(true);

    setTimeout(() => {
      setCartModal(false)(dispatch);
    }, INTERVAL_3);
  };

  const totalCost = () => {
    if (products.cartOrderInfo.length) {
      return products.cartOrderInfo.reduce((acc, prev) => {
        const cost = prev.total ?? prev.cost;
        return Number(acc) + Number(cost);
      }, 0);
    }
  };

  return (
    <>
      {isCartModal && (
        <CartModalWrapper isOpen={!isCloseCartModal}>
          <Modal onClose={handleClose}>
            <CartModalContainer>
              <CartModalHeader>
                <Text variant="semiBold" size="xxlarge">
                  Корзина: {!products.length ? 'пуста' : products.length}
                </Text>
              </CartModalHeader>
              <CartModalBody>
                {!products.cartOrderInfo.length && 'Товаров пока нет'}
                {products.cartOrderInfo.map((product) => (
                  <CartItem key={product.id} productId={product.id} />
                ))}
              </CartModalBody>
              {!!products.cartOrderInfo.length && (
                <CartModalFooter>
                  <Text variant="bold" size="xxlarge">
                    Итого: {totalCost()} руб.
                  </Text>
                </CartModalFooter>
              )}
            </CartModalContainer>
          </Modal>
        </CartModalWrapper>
      )}
    </>
  );
};
