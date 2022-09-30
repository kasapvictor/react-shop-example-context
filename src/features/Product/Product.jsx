import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';

import { fetchProductDetail } from '@app/api';
import { API_DETAILS, STATUS } from '@app/constants';

import { Preloader, Text } from '@components';

import { Content } from './components/Content';
import { ProductContainer } from './styled';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

export const Product = () => {
  const { productId } = useParams();

  const [productDetails, setProductDetails] = useImmer({
    fetchedStatus: IDLE,
    fetchedError: null,
    details: null,
  });

  useEffect(() => {
    setProductDetails((draft) => {
      draft.fetchedStatus = LOADING;
    });

    fetchProductDetail(`${API_DETAILS}${productId}`).then((response) => {
      const { result } = response;

      if (result) {
        setProductDetails((draft) => {
          draft.fetchedStatus = SUCCEEDED;
          draft.details = response.item;
        });
      }

      if (!result) {
        setProductDetails((draft) => {
          draft.fetchedStatus = FAILED;
          draft.fetchedError = response;
        });
      }
    });
  }, []);

  return (
    <ProductContainer>
      {(productDetails.fetchedStatus === IDLE || productDetails.fetchedStatus === LOADING) && <Preloader />}

      {productDetails.fetchedStatus === SUCCEEDED && <Content product={productDetails.details} />}

      {productDetails.fetchedStatus === FAILED && (
        <>
          <Text variant="bold" size="xlarge">
            Something was wrong... =(
          </Text>
          <br />
          {productDetails.fetchedError}
        </>
      )}
    </ProductContainer>
  );
};
