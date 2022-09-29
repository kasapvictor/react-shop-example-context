import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@app/theme/styles';
import { Product, Products } from '@app/features';
import { MainTemplate } from '@app/templates';
// <Shop />
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainTemplate />}>
          <Route index element={<Products />}></Route>
          <Route path="*" element={<Products />}></Route>
          <Route path="product/:productId" element={<Product />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
