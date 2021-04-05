import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
    Redirect,
  useParams,
} from "react-router-dom";
import ProductContentView from './components/productContentView.jsx';
import LoadingView from '../layout/loadingView';
import ProductService from '../../services/productService.js';

const productService = new ProductService();

function ProductsShowPage() {
    let { id } = useParams();
    let isInit = useRef(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const loadFunc = async () => {
            const result = await productService.getProductById(id);
            isInit.current = true;
            setProduct(result);
        };

        loadFunc();

    }, [id]);

    const initFlag = isInit.current;
    const contentView = useMemo(() => {
        if(initFlag) {
            if(product) {
                return (<ProductContentView product={product} />);
            } else {
                return (<Redirect to="/products" />);
            }
        } else {
            return (<LoadingView />);
        }
    }, [product, initFlag]);

    return (
        <div>
            { contentView }
        </div>
    );
}

export default ProductsShowPage;
