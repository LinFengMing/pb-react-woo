import React, {useState, useEffect} from 'react';
import ProductService from '../../services/productService.js';

const productService = new ProductService();

function ProductsIndexPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadFunc = async () => {
            const result = await productService.getProducts(1);
            console.log(result);
        };

        loadFunc();

    }, [productService]);

    return (
    <div>
        ProductsIndexPage
    </div>
    );
}

export default ProductsIndexPage;
