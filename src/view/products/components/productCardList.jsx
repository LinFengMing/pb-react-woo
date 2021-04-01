import React from 'react';
import ProductCard from './productCard.jsx';
import {Cell, Grid, Row} from '@material/react-layout-grid';

function ProductCardList({products}) {
    return (
        <Grid>
            <Row>
                {
                    products.map((product) => {
                        return (
                            <Cell
                                key={product.id}
                                desktopColumns={3}
                                phoneColumns={4}
                                tabletColumns={4}
                            >
                                <ProductCard  product={product} />
                            </Cell>
                        );
                    })
                }
            </Row>
        </Grid>
    );
}

export default ProductCardList;
