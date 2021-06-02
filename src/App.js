import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import Nav from './view/layout/nav.jsx';
import AppRouters from './view/layout/appRouters.jsx';
import CartContext from './context/cartContext.jsx';
import IsLogInContext from './context/isLogInContext.jsx';
import CartService from './services/cartService.js'
import CustomerService from './services/customerService.js'
import CartItemDetail from './models/cartItemDetail.js'

const cartService = new CartService()
const customerService = new CustomerService()

const mergeDataWithToCartItemsDetail = (
    cartItemDetails,
    product,
    quantity,
    append = true
) => {
    const quantityForSubmit = parseInt(quantity)
    if (cartService.getCartItem(product.id)) {
        return cartItemDetails.map((item) => {
            if (item.product.id === product.id) {
                if (append){
                    return new CartItemDetail(
                        product,
                        item.quantity + quantityForSubmit
                    )
                }else{
                    return new CartItemDetail(
                        product,
                        quantityForSubmit
                    )
                }
            } else {
                return item
            }
        })
    } else {
        return [
            ...cartItemDetails,
            new CartItemDetail(
                product,
                quantity
            )
        ]
    }
}

function App() {
    const [cartItemDetails, setCartItemDetails] = useState([]);
    const [isLogIn, setIsLogIn] = useState(customerService.isLoggedIn)

    return (
        <IsLogInContext.Provider value={[isLogIn, setIsLogIn]}>
            <CartContext.Provider value={[cartItemDetails, setCartItemDetails, mergeDataWithToCartItemsDetail]}>
                <Router>
                    <Nav />
                    <main className="mdc-top-app-bar--fixed-adjust">
                        <AppRouters />
                    </main>
                </Router>
            </CartContext.Provider>
        </IsLogInContext.Provider>
    );
}

export default App;
