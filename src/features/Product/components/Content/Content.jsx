import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { COLOR_NAME } from '@app/constants';
import { addToCart, existingInOrderList, useDispatch, useTrackedState } from '@app/store';

import { Button, Check, Text, Title } from '@components';

import {
  ProductDetails,
  ProductDetailsBody,
  ProductDetailsHeader,
  ProductImage,
  ProductMeta,
  ProductPrice,
  ProductTag,
  ProductTagRare,
} from './styled';

export const Content = ({ product }) => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);

  const { products } = state;

  const { id, name, type, description, images, rarity, price } = product;
  const { background } = images;

  useEffect(() => {
    const isOrderedProduct = existingInOrderList(id, products.orderedList)();
    setInCart(!!isOrderedProduct);
  }, [state]);

  const handleAddToCart = (productId) => () => {
    if (!inCart) {
      addToCart(productId)(dispatch);
      toast.success(`${name} добавлен в корзину`);
    }

    if (inCart) {
      toast.info(`${name} уже в корзине`);
    }
  };

  return (
    <>
      <ProductDetailsHeader>
        <Title type="h1" variant="semiBold">
          {name}
        </Title>
      </ProductDetailsHeader>

      <ProductDetailsBody>
        <ProductImage src={background} alt={name} />
        <ProductDetails>
          <ProductMeta>
            <ProductTag>{type.name.toLowerCase()}</ProductTag>
            <ProductTagRare>{rarity.name.toLowerCase()}</ProductTagRare>
          </ProductMeta>

          <Text variant="normal" type="div" size="xxlarge">
            {description}
          </Text>
          <ProductPrice>
            <Text variant="bold" size="xxlarge" color="warning">
              $ {price}
            </Text>
            <Button onClick={handleAddToCart(id)}>Купить</Button>
          </ProductPrice>
          {inCart && <Check color={COLOR_NAME.SUCCESS} />}
        </ProductDetails>
      </ProductDetailsBody>
    </>
  );
};

Content.propTypes = {
  product: PropTypes.any,
};
