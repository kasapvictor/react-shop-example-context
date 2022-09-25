import PropTypes from 'prop-types';

import { fontSizes } from '@app/theme';

import { Button, Text } from '@components';

import { CartItemName, CartItemRemove, CartItemStyled, CartItemCount, CartItemCost } from './styled';

export const CartItem = ({ product, inc, dec, remove }) => {
  const { id, cost, count, name, total } = product;
  return (
    <CartItemStyled>
      <CartItemName>
        <Text variant="semiBold" size="large">
          {name}
        </Text>
      </CartItemName>

      <CartItemCost>{cost} руб.</CartItemCost>

      <CartItemCount>
        <Button variant="black" size="small" onClick={dec(id)}>
          -
        </Button>
        <Text variant="semiBold" size="large">
          {count}
        </Text>
        <Button variant="black" size="small" onClick={inc(id)}>
          +
        </Button>
      </CartItemCount>

      <CartItemCost>Всего: {total || cost} руб.</CartItemCost>

      <CartItemRemove>
        <Button variant="black" size="small" onClick={remove(id)}>
          <span className="material-icons" style={{ fontSize: fontSizes.large }}>
            close
          </span>
        </Button>
      </CartItemRemove>
    </CartItemStyled>
  );
};

CartItem.propTypes = {
  product: PropTypes.object,
  inc: PropTypes.func,
  dec: PropTypes.func,
  remove: PropTypes.func,
};
