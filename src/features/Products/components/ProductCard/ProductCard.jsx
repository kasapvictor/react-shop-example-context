import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { COLOR_NAME } from '@app/constants';
import { Text, Button, Check } from '@app/components';
import { addToCart, existingInOrderList, useTrackedState, useDispatch } from '@app/store';

import { Poster } from './components';
import {
  ProductCardContainer,
  ProductCardFooter,
  ProductCardHeader,
  ProductCardBody,
  ProductCardContent,
  ProductLinkDetails,
} from './styled';

const MAX_LENGTH_NAME = 14;
const MAX_LENGTH_DESC = 25;

export const ProductCard = ({ productId }) => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { products } = state;

  const product = state.products.list.find((product) => product.mainId === productId);
  const { mainId, price, displayName, displayType, displayDescription, displayAssets } = product;
  const { regularPrice } = price;
  const { url } = displayAssets[0];

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
      <Poster src={url} alt={name} />
      <ProductCardContent>
        <ProductCardHeader>
          <Text variant="semiBold" size="xxlarge">
            {nameFormatted}
            {nameFormatted.length >= MAX_LENGTH_NAME && <>...</>}
          </Text>
        </ProductCardHeader>

        <ProductLinkDetails>
          <Link to={`/product/${mainId}`} style={{ color: 'white', textDecoration: 'none' }}>
            Details
          </Link>
        </ProductLinkDetails>

        <ProductCardBody>
          <Text>
            {displayDescriptionFormatted || displayType}
            {displayDescriptionFormatted.length >= MAX_LENGTH_DESC && <>...</>}
          </Text>
        </ProductCardBody>

        <ProductCardFooter>
          <Text size="xxlarge" variant="bold" color={COLOR_NAME.WHITE}>
            $ {regularPrice}
          </Text>
          <Button onClick={handleAddToCart(mainId)} variant="danger">
            Купить
          </Button>
        </ProductCardFooter>
      </ProductCardContent>
      {existingInOrderList(mainId, products.orderedList)() && <Check color={COLOR_NAME.SUCCESS} />}
    </ProductCardContainer>
  );
};

ProductCard.propTypes = {
  productId: PropTypes.string,
};
