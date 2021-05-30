import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM
import Product from "../models/product.js";

const WooCommerce = new WooCommerceRestApi({
    url: 'http://192.168.56.10/', // Your store URL
    consumerKey: 'ck_a45dccafe3f03eb0335129ddf8ae6464ff637b67', // Your consumer key
    consumerSecret: 'cs_720106a5298531eabbe761540616d8f02a07539e', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});

class ProductService {
    getProducts(page) {
        return WooCommerce
            .get("products", {
                page: page,
                per_page: 3
            })
            .then((response) => {
                const products = response.data.map((rawData) => {
                  return new Product(rawData);
                });

                return products;
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
    }

    getProductById(id) {
        return WooCommerce
            .get(`products/${id}`)
            .then((response) => {
                return new Product(response.data);
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }

    getProductsByIds(ids) {
        return WooCommerce
            .get(`products`, {
                per_page: 100,
                include: ids
            })
            .then((response) => {
                const products = response.data.map((rawData) => {
                    return new Product(rawData);
                });

                return products;
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }
}

export default ProductService;
