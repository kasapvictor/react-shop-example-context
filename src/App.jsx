import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@app/theme/styles';
import { Product, Products } from '@app/features';
import { ShopTemplate } from '@app/templates';
import { Provider as ShopProvider } from '@app/store';

export const App = () => {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Routes>
          <Route path="/" element={<ShopTemplate />}>
            <Route index element={<Products />}></Route>
            <Route path="*" element={<Products />}></Route>
            <Route path="product/:productId" element={<Product />}></Route>
          </Route>
        </Routes>
      </ShopProvider>
    </BrowserRouter>
  );
};
