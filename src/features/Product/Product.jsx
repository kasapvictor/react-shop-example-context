import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import { fetchProductDetail } from '@app/api';
// import { API_DETAILS } from '@app/constants';

export const Product = () => {
  const { productId } = useParams();

  // eslint-disable-next-line no-console
  console.log('productId', productId);

  useEffect(() => {
    // fetchProductDetail(`${API_DETAILS}${productId}`).then((response) => {
    //   // eslint-disable-next-line no-unused-expressions
    //   console.log('details', response);
    // });
  }, []);

  /*
    useEffect(() => {
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
  }, []);
   */

  return <>Product</>;
};
