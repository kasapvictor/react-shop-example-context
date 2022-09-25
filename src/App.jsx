import React from 'react';
import { ToastContainer } from 'react-toastify';

import '@app/theme/styles';
import { Products } from '@app/features';
import { Header, Main, Footer } from '@app/layouts';

import { Title } from '@components';

export const App = () => {
  return (
    <>
      <Header>
        <Title type="h1" size="h1" variant="thin" color="white">
          Products
        </Title>
      </Header>
      <Main>
        <Products />
      </Main>
      <Footer>
        <Title type="h4" size="h4" variant="thin" color="white">
          &copy; {new Date().getFullYear()} by Victor Kasap
        </Title>

        <a href="https://github.com/kasapvictor/react-shop-example-local-useImmer" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </Footer>
      <ToastContainer position="bottom-right" />
    </>
  );
};
