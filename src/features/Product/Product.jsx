import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';

import { fetchProductDetail, fetchProducts2 } from '@app/api';
import { API_DETAILS, API_SHOP, STATUS } from '@app/constants';
import { addProducts, setFetchingStatus, useDispatch, useTrackedState } from '@app/features';

import { Preloader, Text } from '@components';

import { Content } from './components/Content';
import { ProductContainer } from './styled';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

export const Product = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { fetching } = state;

  const { productId } = useParams();
  const [productDetails, setProductDetails] = useImmer({
    fetchedStatus: IDLE,
    fetchedError: null,
    details: null,
  });

  useEffect(() => {
    /* ДУБЛЬ Products */
    if (fetching.status === IDLE) {
      const fetchedProducts = fetchProducts2(API_SHOP);

      setFetchingStatus(LOADING, null)(dispatch);

      fetchedProducts.then((data) => {
        const { shop } = data;

        if (shop) {
          setFetchingStatus(SUCCEEDED, null)(dispatch);
          addProducts(shop)(dispatch);
        }

        if (!shop) {
          setFetchingStatus(FAILED, data)(dispatch);
        }
      });
    }
    /* ДУБЛЬ Products */

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
