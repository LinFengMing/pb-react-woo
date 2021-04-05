import React from 'react';

function OnSalePriceString({product}) {
    return (
        <>
            <del style={{color: "red"}}>
                ${product.regularPrice}
            </del>
            <b>
                ${product.price}
            </b>
        </>
    );
}

export default OnSalePriceString;
