import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductCardList from './components/productCardList.jsx';
import ProductService from '../../services/productService.js';
import { Button } from '@material/react-button';
import LoadingView from '../layout/loadingView';

const productService = new ProductService();

function ProductsIndexPage() {
    let isInit = useRef(false);
    let page = useRef(1);
    let isLastPage = useRef(false);

    const [products, setProducts] = useState([]);

    const loadMoreProducts = useCallback(async () => {
        if(isLastPage.current) return true;

        page.current++;
        const result = await productService.getProducts(page.current);
        if(result && result.length > 0) {
            setProducts([
                ...products,
                ...result
            ]);
        } else {
            page--;
            isLastPage.current = true;
            setProducts([
                ...products
            ]);
        }
    }, [products]);

    useEffect(() => {
        const loadFunc = async () => {
            const result = await productService.getProducts(page.current);
            isInit.current = true;
            setProducts([
                ...products,
                ...result
            ]);
        };

        loadFunc();

    }, [productService]);

    return (
        isInit.current ?
        (<div style={{ maxWidth: "1200px", margin: "auto" }}>
            <ProductCardList products={products} />
            <div style={{ textAlign: "center", padding: "36px 0" }}>
                {
                    isLastPage.current ? (<p>This is last page.</p>) :
                    (<Button onClick={loadMoreProducts}>
                        Load More
                    </Button>)
                }
            </div>
        </div>) : (<LoadingView />)
    );
}

export default ProductsIndexPage;
