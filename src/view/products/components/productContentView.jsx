import React, { useState, useCallback, useContext } from 'react';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Button from '@material/react-button';
import Select, {Option} from '@material/react-select';
import CartService from '../../../services/cartService.js';
import OnSalePriceString from './onSalePriceString.jsx';
import CartContext from '../../../context/cartContext.jsx';

const cartService = new CartService();

function ProductContentView({product}) {
    const [quantity, setQuantity] = useState(1);
    const [cartItemDetails, setCartItemDetails, mergeDataWithToCartItemsDetail] = useContext(CartContext);

    const selectQuantity = useCallback((e) => {
        const { value } = e.target;
        setQuantity(value);
    }, []);

    const addInCart = useCallback((e) => {
        const quantityForSubmit = parseInt(quantity)
        const newCartItemDetails = mergeDataWithToCartItemsDetail(
            cartItemDetails,
            product,
            quantityForSubmit
        )

        setCartItemDetails(newCartItemDetails)

        cartService.addInCart(product.id, quantityForSubmit)
        window.location.replace("/products")
    }, [
        cartItemDetails,
        mergeDataWithToCartItemsDetail,
        product,
        quantity,
        setCartItemDetails
    ]);

    const priceElement = product.onSale ? <OnSalePriceString product={product} /> : (<> ${product.price} </>);

    return (
        <Grid>
            <Row>
                <Cell
                    desktopColumns={6}
                    phoneColumns={4}
                    tabletColumns={8}
                >
                    <img src={product.imageUrl} alt="" style={{width: "100%"}} />
                </Cell>
                <Cell
                    desktopColumns={6}
                    phoneColumns={4}
                    tabletColumns={8}
                >
                    <div style={{padding: "12px 36px"}}>
                        <h1>{product.title}</h1>
                        <div dangerouslySetInnerHTML={{__html: product.description}}>
                        </div>
                        <div style={{marginBottom: "16px"}}>
                            {priceElement}
                        </div>
                        <div>
                            <Select
                                outlined
                                label=''
                                value={quantity}
                                onChange={selectQuantity}
                            >
                                {
                                    [1, 2, 3, 4, 5].map((number) => {
                                        return (<Option key={number} value={number}>{number}</Option>)
                                    })
                                }
                            </Select>
                            <Button
                                onClick={addInCart}
                                style={{margin: "0 16px"}}
                                outlined
                            >
                                Add In Cart
                            </Button>
                        </div>
                    </div>
                </Cell>
            </Row>
        </Grid>
    );
}

export default ProductContentView;
