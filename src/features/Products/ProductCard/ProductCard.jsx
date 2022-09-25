import { toast } from 'react-toastify';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { COLOR_NAME } from '@app/constants';
import { ProductsContext } from '@app/features';

import { Text, Button, Check } from '@components';

import { Poster, Content } from './components';
import { ProductCardStyled, FooterStyled, ProductHeaderStyled, BodyStyled } from './styled';

const MAX_LENGTH_NAME = 16;
const MAX_LENGTH_DESC = 25;

export const ProductCard = ({ productId }) => {
  const state = useContext(ProductsContext);
  const { addToCart, products, existingInOrderList } = state;
  const product = products.list.find((product) => product.id === productId);
  const { id, name, price, categories, description, image } = product;

  // eslint-disable-next-line no-console
  console.log('category', categories);

  const nameFormatted = description.substring(0, MAX_LENGTH_NAME);
  const descriptionFormatted = description.substring(0, MAX_LENGTH_DESC);

  const notify = (message) => toast.success(message);

  const handleAddToCart = (productId) => () => {
    const orderedProduct = products.list.find((product) => product.id === productId);
    const isOrderedProduct = existingInOrderList(productId);

    if (!isOrderedProduct) {
      addToCart(productId);
      notify(`${orderedProduct.name} добавлен в корзину`);
    }

    if (isOrderedProduct) {
      notify(`${orderedProduct.name} уже в корзине`);
    }
  };

  return (
    <ProductCardStyled>
      <Poster src={image} alt={name} />
      <Content>
        <ProductHeaderStyled>
          <Text variant="semiBold" size="xxlarge">
            {nameFormatted}
            {nameFormatted.length >= MAX_LENGTH_NAME && <>...</>}
          </Text>
        </ProductHeaderStyled>

        <BodyStyled>
          <Text>
            {descriptionFormatted}
            {descriptionFormatted.length >= MAX_LENGTH_DESC && <>...</>}
          </Text>
        </BodyStyled>

        <FooterStyled>
          <Text size="xxlarge" variant="bold" color={COLOR_NAME.DANGER}>
            {price}$
          </Text>
          <Button onClick={handleAddToCart(id)}>Купить</Button>
        </FooterStyled>
      </Content>
      {existingInOrderList(id) && <Check color={COLOR_NAME.SUCCESS} />}
    </ProductCardStyled>
  );
};

ProductCard.propTypes = {
  productId: PropTypes.string,
};
