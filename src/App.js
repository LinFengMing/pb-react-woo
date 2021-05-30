import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import Nav from './view/layout/nav.jsx';
import AppRouters from './view/layout/appRouters.jsx';
import CartContext from './context/cartContext.jsx';

function App() {
    const [cartItemDetails, setCartItemDetails] = useState([]);

    return (
        <CartContext.Provider value={[cartItemDetails, setCartItemDetails]}>
            <Router>
                <Nav />
                <main className="mdc-top-app-bar--fixed-adjust">
                    <AppRouters />
                </main>
            </Router>
        </CartContext.Provider>
    );
}

export default App;
