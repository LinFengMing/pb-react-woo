import React, {useState, useEffect} from 'react';
import ProductCardList from './components/productCardList.jsx';
import ProductService from '../../services/productService.js';

const productService = new ProductService();

function ProductsIndexPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadFunc = async () => {
            const result = await productService.getProducts(1);
            setProducts([
                ...products,
                ...result
            ]);
        };

        loadFunc();

    }, [productService]);

    return (
    <div style={{maxWidth: "1200px", margin: "auto"}}>
        <ProductCardList products={products} />
    </div>
    );
}

export default ProductsIndexPage;
