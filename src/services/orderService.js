import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM
import Order from '../models/order.js';
import PaymentGateway from '../models/paymentGatway'
import ShippingZone from '../models/shippingZone'
import ShippingZoneMethod from '../models/shippingZoneMethod'

const WooCommerce = new WooCommerceRestApi({
    url: 'http://192.168.56.10/', // Your store URL
    consumerKey: 'ck_a45dccafe3f03eb0335129ddf8ae6464ff637b67', // Your consumer key
    consumerSecret: 'cs_720106a5298531eabbe761540616d8f02a07539e', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});

class OrderService {
    submitOrder = (data) => {
        if (!data.customer_id) {
            return new Promise((resolve) => {
                resolve(null);
            })
        }

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

    getOrder = (id, customer_id = null) => {
        if (!customer_id) {
            return new Promise((resolve) => {
                resolve(null);
            })
        }

        return WooCommerce.get(`orders` ,{
            customer: customer_id,
            include: [id]
        })
        .then((response) => {
            const result = response.data.map((rawData) => {
                return new Order(rawData);
            });

            if(result.length > 0) {
                return result[0]
            } else {
                return null;
            }
        }).catch((error) => {
            console.log(error);
            return null
        });
    }

    getOrders = (customer_id) => {
        if (!customer_id) {
            return new Promise((resolve) => {
                resolve(null);
            })
        }

        return WooCommerce.get(`orders`,{
            customer: customer_id
        })
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
                return response.data.map((rawData) => {
                    if (rawData.enabled){
                        return new PaymentGateway(rawData)
                    } else {
                        return null
                    }
                }).filter(x => x)
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

    getShippingZones = () => {
        return WooCommerce.get("shipping/zones")
            .then((response) => {
                return response.data.map((rawData) => {
                    return new ShippingZone(rawData)
                })
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    getShippingZoneMethods = (shippingZone) => {
        if(!shippingZone || !shippingZone.id) {
            return []
        }

        return WooCommerce.get(`shipping/zones/${shippingZone.id}/methods`)
        .then((response) => {
            return response.data.map((rawData) => {
                return new ShippingZoneMethod(rawData)
            })
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }
}

export default OrderService;
