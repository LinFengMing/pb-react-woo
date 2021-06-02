import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import Nav from './view/layout/nav.jsx';
import AppRouters from './view/layout/appRouters.jsx';
import CartContext from './context/cartContext.jsx';
import IsLogInContext from './context/isLogInContext.jsx';
import CategoryContext from './context/categoryContext'
import CartService from './services/cartService.js'
import CustomerService from './services/customerService.js'
import ProductService from './services/productService'
import CartItemDetail from './models/cartItemDetail.js'

const cartService = new CartService()
const customerService = new CustomerService()
const productService = new ProductService()

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
    const [categories, setCategories] = useState([])
    const [isLogIn, setIsLogIn] = useState(customerService.isLoggedIn)

    useEffect(() => {
        const loadFunc = async () => {
            const result = await productService.getCategories()
            setCategories(result)
        }

        loadFunc()
    }, [])

    return (
        <IsLogInContext.Provider value={[isLogIn, setIsLogIn]}>
            <CartContext.Provider
                value={[cartItemDetails,
                setCartItemDetails,
                mergeDataWithToCartItemsDetail]}
            >
                <CategoryContext.Provider value={categories}>
                    <Router>
                        <Nav />
                        <main className="mdc-top-app-bar--fixed-adjust">
                            <AppRouters />
                        </main>
                    </Router>
                </CategoryContext.Provider>
            </CartContext.Provider>
        </IsLogInContext.Provider>
    );
}

export default App;
