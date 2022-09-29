import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { addToCart, existingInOrderList, useDispatch, useTrackedState } from '@app/features';
import { COLOR_NAME } from '@app/constants';

import { Button, Check } from '@components';

export const Content = ({ product }) => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);

  const { products } = state;

  const { id, name, type, description, images, rarity, price } = product;
  const { background } = images;
  // eslint-disable-next-line no-console
  console.log('product', product);

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
      <h1>Название: {name}</h1>
      <p>Тип: {type.name}</p>
      <p>Раритет: {rarity.name.toLowerCase()}</p>
      <p>Описание: {description}</p>
      <p>Изображение: </p>
      <p>Цена: $ {price}</p>
      {inCart && <Check color={COLOR_NAME.SUCCESS} />}
      <Button onClick={handleAddToCart(id)}>Купить</Button>
      <img src={background} alt={name} style={{ width: '200px', height: '200px' }} />
    </>
  );
};

Content.propTypes = {
  product: PropTypes.any,
};
