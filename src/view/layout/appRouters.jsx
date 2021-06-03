import React, { useContext } from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomePage from '../home/homePage.jsx';
import ProductsIndexPage from '../products/productsIndexPage.jsx';
import ProductsShowPage from '../products/productsShowPage.jsx';
import ProductSearchPage from '../products/productSearchPage.jsx';
import OrdersIndexPage from '../orders/ordersIndexPage.jsx';
import OrdersShowPage from '../orders/ordersShowPage.jsx';
import OrderSuccessPage from '../orders/orderSuccessPage.jsx';
import OrderFailedPage from '../orders/orderFailedPage.jsx';
import CartIndexPage from '../cart/cartIndexPage.jsx';
import CheckoutPage from '../cart/checkoutPage.jsx';
import CustomerLoginPage from '../customer/logInPage.jsx';
import CustomerSignUpPage from '../customer/signUpPage.jsx';
import NoMatch from '../errors/404.jsx';
import IsLogInContext from '../../context/isLogInContext';
import CustomerService from '../../services/customerService'

const customerService = new CustomerService()

function Routers() {
    const [isLogin, setIsLogin] = useContext(IsLogInContext)

    return (
        <>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/products' exact>
                    <ProductsIndexPage />
                </Route>
                <Route path="/products/search" exact>
                    <ProductSearchPage />
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
                <Route path='/checkout' exact render={
                    () => {
                        if (customerService.isLoggedIn) {
                            return (<CheckoutPage />)
                        } else {
                            alert('結帳前請先登入')

                            return <Redirect to="/" />
                        }
                    }}
                />
                <Route path="/login" exact>
                    <CustomerLoginPage />
                </Route>
                <Route path="/signup" exact>
                    <CustomerSignUpPage />
                </Route>
                <Route
                    path="/logout" exact
                    render={() => {
                        customerService.logOut()
                        setIsLogin(false)

                        return <Redirect to="/" />
                    }}
                />
                <Route path='*' exact>
                  <NoMatch />
                </Route>
            </Switch>
        </>
    );
}

export default Routers;
