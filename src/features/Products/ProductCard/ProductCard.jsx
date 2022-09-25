import PropTypes from 'prop-types';

import { COLOR_NAME } from '@app/constants';

import { Text, Button, Check } from '@components';

import { Poster, Content } from './components';
import { ProductCardStyled, FooterStyled, ProductHeaderStyled, BodyStyled } from './styled';

const MAX_LENGTH_NAME = 16;
const MAX_LENGTH_DESC = 25;

export const ProductCard = ({ product, addToCart, existingInOrder }) => {
  const { id, name, price, categories, description, image } = product;
  // eslint-disable-next-line no-console
  console.log('category', categories);

  const nameFormatted = description.substring(0, MAX_LENGTH_NAME);
  const descriptionFormatted = description.substring(0, MAX_LENGTH_DESC);

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
          <Button onClick={addToCart(id)}>Купить</Button>
        </FooterStyled>
      </Content>
      {existingInOrder(id) && <Check color={COLOR_NAME.SUCCESS} />}
    </ProductCardStyled>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    categories: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  addToCart: PropTypes.func,
  existingInOrder: PropTypes.func,
};
