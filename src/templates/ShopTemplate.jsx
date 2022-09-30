import { Link, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { Footer, Header, Main } from '@app/layouts';
import { Cart, CartModal } from '@app/features';
import { fetchProducts2 } from '@app/api';
import { API_SHOP, STATUS } from '@app/constants';
import { addProducts, setFetchingStatus, useDispatch, useTrackedState } from '@app/store';

import { Link as LinkComponent, Text, Title } from '@components';

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUS;

export const ShopTemplate = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { fetching } = state;

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Header>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Title type="h1" size="h1" variant="thin" color="white">
            Products
          </Title>
        </Link>
        <Cart />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>
        <Title type="h4" size="h4" variant="thin" color="white">
          &copy; {new Date().getFullYear()} by Victor Kasap
        </Title>

        <LinkComponent href="https://github.com/kasapvictor/react-shop-example-context" target="_blank">
          <Text color="white" type="span">
            GitHub
          </Text>
        </LinkComponent>
      </Footer>
      <CartModal />
      <ToastContainer position="bottom-right" />
    </>
  );
};
