import PropTypes from 'prop-types';
import { Modal } from '@components/Modal';
import { useState } from 'react';

import { INTERVAL_3 } from '@app/constants';

import { Text } from '@components';

import { CartModalBody, CartModalContainer, CartModalFooter, CartModalHeader, CartModalWrapper } from './styled';
import { CartItem } from './components';

export const CartModal = ({ products, isOpen, onClose, inc, dec, remove }) => {
  const [isClose, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(true);
    setTimeout(() => {
      onClose();
    }, INTERVAL_3);
  };

  const totalCost = () => {
    if (products.length) {
      return products.reduce((acc, prev) => {
        const cost = prev.total ?? prev.cost;
        return Number(acc) + Number(cost);
      }, 0);
    }
  };

  return (
    <>
      {isOpen && (
        <CartModalWrapper isOpen={!isClose}>
          <Modal onClose={handleClose}>
            <CartModalContainer>
              <CartModalHeader>
                <Text variant="semiBold" size="xxlarge">
                  Корзина: {!products.length ? 'пуста' : products.length}
                </Text>
              </CartModalHeader>
              <CartModalBody>
                {!products.length && 'Товаров пока нет'}
                {products.map((product) => (
                  <CartItem key={product.id} product={product} inc={inc} dec={dec} remove={remove} />
                ))}
              </CartModalBody>
              {!!products.length && (
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

CartModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  products: PropTypes.array,
  inc: PropTypes.func,
  dec: PropTypes.func,
  remove: PropTypes.func,
};

/*
{
  cost: PropTypes.number,
  count: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
}
 */
