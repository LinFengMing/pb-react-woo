import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import HomePage from '../home/homePage.jsx';
import ProductsIndexPage from '../products/productsIndexPage.jsx';
import ProductsShowPage from '../products/productsShowPage.jsx';
import OrdersIndexPage from '../orders/ordersIndexPage.jsx';
import OrdersShowPage from '../orders/ordersShowPage.jsx';
import OrderSuccessPage from '../orders/orderSuccessPage.jsx';
import OrderFailedPage from '../orders/orderFailedPage.jsx';
import CartIndexPage from '../cart/cartIndexPage.jsx';
import CheckoutPage from '../cart/checkoutPage.jsx';
import NoMatch from '../errors/404.jsx';

function Routers() {
  return (
  <>
    <Switch>
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Route path='/products' exact>
        <ProductsIndexPage />
      </Route>
      <Route path='/products/:id' exact>
        <ProductsShowPage />
      </Route>
      <Route path='/orders' exact>
        <OrdersIndexPage />
      </Route>
      <Route path='/orders/:id/success' exact>
        <OrderSuccessPage />
      </Route>
      <Route path='/orders/failed' exact>
        <OrderFailedPage />
      </Route>
      <Route path='/orders/:id' exact>
        <OrdersShowPage />
      </Route>
      <Route path='/cart' exact>
        <CartIndexPage />
      </Route>
      <Route path='/checkout' exact>
        <CheckoutPage />
      </Route>
      <Route path='*' exact>
        <NoMatch />
      </Route>
    </Switch>
  </>
  );
}

export default Routers;
