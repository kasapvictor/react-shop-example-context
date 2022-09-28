import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { COLOR_NAME } from '@app/constants';
import { Text, Button, Check } from '@app/components';
import { addToCart, existingInOrderList, useTrackedState, useDispatch } from '@app/features';

import { Poster } from './components';
import { ProductCardContainer, ProductCardFooter, ProductCardHeader, ProductCardBody, ProductCardContent } from './styled';

const MAX_LENGTH_NAME = 14;
const MAX_LENGTH_DESC = 25;

const ProductCardComponent = ({ productId }) => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { products } = state;

  const product = state.products.list.find((product) => product.mainId === productId);
  const { mainId, price, categories, displayName, displayType, displayDescription, displayAssets } = product;
  const { regularPrice } = price;
  const { url } = displayAssets[0];

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Product card was rendered useEffect', categories);
    // eslint-disable-next-line no-console
    console.log('Product', { ...product });
  }, []);

  const nameFormatted = displayName.substring(0, MAX_LENGTH_NAME);
  const displayDescriptionFormatted = displayDescription.substring(0, MAX_LENGTH_DESC);

  const handleAddToCart = (productId) => () => {
    const isOrderedProduct = existingInOrderList(productId, products.orderedList)();

    if (!isOrderedProduct) {
      addToCart(productId)(dispatch);
      toast.success(`${displayName} добавлен в корзину`);
    }

    if (isOrderedProduct) {
      toast.info(`${displayName} уже в корзине`);
    }
  };

  return (
    <ProductCardContainer>
      {
        // eslint-disable-next-line no-console
        console.log('Product card was rendered')
      }
      <Poster src={url} alt={name} />
      <ProductCardContent>
        <ProductCardHeader>
          <Text variant="semiBold" size="xxlarge">
            {nameFormatted}
            {nameFormatted.length >= MAX_LENGTH_NAME && <>...</>}
          </Text>
        </ProductCardHeader>

        <ProductCardBody>
          <Text>
            {displayDescriptionFormatted || displayType}
            {displayDescriptionFormatted.length >= MAX_LENGTH_DESC && <>...</>}
          </Text>
        </ProductCardBody>

        <ProductCardFooter>
          <Text size="xxlarge" variant="bold" color={COLOR_NAME.DANGER}>
            $ {regularPrice}
          </Text>
          <Button onClick={handleAddToCart(mainId)}>Купить</Button>
        </ProductCardFooter>
      </ProductCardContent>
      {existingInOrderList(mainId, products.orderedList)() && <Check color={COLOR_NAME.SUCCESS} />}
    </ProductCardContainer>
  );
};

ProductCardComponent.propTypes = {
  productId: PropTypes.string,
};

export const ProductCard = React.memo(ProductCardComponent);
