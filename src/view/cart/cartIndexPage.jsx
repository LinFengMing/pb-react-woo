import React, {} from 'react'
import {
    Link,
} from "react-router-dom";
import {
    Cell,
    Grid,
    Row
} from '@material/react-layout-grid';
import Button from '@material/react-button'
import CartItemsList from './components/cartItemsList'

const CartIndexPage = () => {
    return (
        <div>
            <Grid>
                <Row>
                    <Cell
                        desktopColumns={8}
                        phoneColumns={4}
                        tabletColumns={8}
                    >
                        <div style={{ padding: "16px 32px" }}>
                            <CartItemsList />
                        </div>
                    </Cell>
                    <Cell
                        desktopColumns={4}
                        phoneColumns={4}
                        tabletColumns={8}
                    >
                        <div style={{ paddingTop: "32px" }}>
                            <p>總價: {0}</p>
                            <div>
                                <Link to="/checkout">
                                    <Button outlined>結帳</Button>
                                </Link>
                            </div>
                        </div>
                    </Cell>
                </Row>
            </Grid>
        </div>
    )
}

export default CartIndexPage;

