import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM
import Order from '../models/order.js';

const WooCommerce = new WooCommerceRestApi({
    url: 'http://192.168.56.10/', // Your store URL
    consumerKey: 'ck_a45dccafe3f03eb0335129ddf8ae6464ff637b67', // Your consumer key
    consumerSecret: 'cs_720106a5298531eabbe761540616d8f02a07539e', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});

class OrderService {
    submitOrder = (data) => {
        return WooCommerce
            .post("orders", data)
            .then((response) => {
                return new Order(response.data);
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }

    getOrder = (id) => {
        return WooCommerce.get(`orders/${id}`)
        .then((response) => {
            return new Order(response.data);
        }).catch((error) => {
            console.log(error);
            return null
        });
    }

    getOrders = () => {
        return WooCommerce.get(`orders`)
        .then((response) => {
            return response.data.map((rawData) => {
                return new Order(rawData);
            });
        }).catch((error) => {
            console.log(error);
            return null
        });
    }

    getPaymentGatways = () => {
        return WooCommerce.get("payment_gateways")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    getShippingMethods = () => {
        return WooCommerce.get("shipping_methods")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }
}

export default OrderService;
