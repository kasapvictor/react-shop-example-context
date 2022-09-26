import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { COLOR_NAME } from '@app/constants';
import { Text, Button, Check } from '@app/components';
import { ProductsContext, addToCart, existingInOrderList } from '@app/features';

import { Poster, Content } from './components';
import { ProductCardStyled, FooterStyled, ProductHeaderStyled, BodyStyled } from './styled';

const MAX_LENGTH_NAME = 16;
const MAX_LENGTH_DESC = 25;

const ProductCardComponent = ({ productId }) => {
  const { state, dispatch } = useContext(ProductsContext);
  const { products } = state;

  const product = state.products.list.find((product) => product.id === productId);
  const { id, name, price, categories, description, image } = product;

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Product card was rendered useEffect', categories);
  }, []);

  const nameFormatted = description.substring(0, MAX_LENGTH_NAME);
  const descriptionFormatted = description.substring(0, MAX_LENGTH_DESC);

  const handleAddToCart = (productId) => () => {
    const orderedProduct = products.list.find((product) => product.id === productId);
    const isOrderedProduct = existingInOrderList(productId, products.orderedList)();

    if (!isOrderedProduct) {
      addToCart(productId)(dispatch);
      toast.success(`${orderedProduct.name} добавлен в корзину`);
    }

    if (isOrderedProduct) {
      toast.info(`${orderedProduct.name} уже в корзине`);
    }
  };

  return (
    <ProductCardStyled>
      {
        // eslint-disable-next-line no-console
        console.log('Product card was rendered')
      }
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
      {existingInOrderList(id, products.orderedList)() && <Check color={COLOR_NAME.SUCCESS} />}
    </ProductCardStyled>
  );
};

ProductCardComponent.propTypes = {
  productId: PropTypes.string,
};

export const ProductCard = React.memo(ProductCardComponent);
