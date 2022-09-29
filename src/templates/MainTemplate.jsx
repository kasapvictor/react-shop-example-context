import { Link, Outlet } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import { Footer, Header, Main as MainContainer } from '@app/layouts';
import { Cart, CartModal, Provider } from '@app/features';

import { Link as LinkComponent, Text, Title } from '@components';

export const MainTemplate = () => {
  return (
    <Provider>
      <Header>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Title type="h1" size="h1" variant="thin" color="white">
            Products
          </Title>
        </Link>
        <Cart />
      </Header>

      <MainContainer>
        <Outlet />
      </MainContainer>

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
    </Provider>
  );
};
