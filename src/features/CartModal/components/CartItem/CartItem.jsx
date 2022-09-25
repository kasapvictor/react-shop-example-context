import { toast } from 'react-toastify';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { ProductsContext } from '@app/features';
import { fontSizes } from '@app/theme';

import { Button, Text } from '@components';

import { CartItemName, CartItemRemove, CartItemStyled, CartItemCount, CartItemCost } from './styled';

export const CartItem = ({ productId }) => {
  const state = useContext(ProductsContext);
  const { products, incProduct, decProduct, removeProduct } = state;

  const product = products.cartOrderInfo.find((product) => product.id === productId);
  const { id, cost, count, name, total } = product;

  const notify = (message) => toast.success(message);

  const handleIncrement = (productId) => () => {
    incProduct(productId);
  };

  const handleDecrement = (productId) => () => {
    decProduct(productId);
  };

  const handleRemove = (productId) => () => {
    removeProduct(productId);
    notify('Товар удален');
  };

  return (
    <CartItemStyled>
      <CartItemName>
        <Text variant="semiBold" size="large">
          {name}
        </Text>
      </CartItemName>

      <CartItemCost>{cost} руб.</CartItemCost>

      <CartItemCount>
        <Button variant="black" size="small" onClick={handleDecrement(id)}>
          -
        </Button>
        <Text variant="semiBold" size="large">
          {count}
        </Text>
        <Button variant="black" size="small" onClick={handleIncrement(id)}>
          +
        </Button>
      </CartItemCount>

      <CartItemCost>Всего: {total || cost} руб.</CartItemCost>

      <CartItemRemove>
        <Button variant="black" size="small" onClick={handleRemove(id)}>
          <span className="material-icons" style={{ fontSize: fontSizes.large }}>
            close
          </span>
        </Button>
      </CartItemRemove>
    </CartItemStyled>
  );
};

CartItem.propTypes = {
  productId: PropTypes.string,
};
