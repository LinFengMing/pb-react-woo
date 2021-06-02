import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Customer from '../models/customer'
import Cookies from 'js-cookie'

const CUSTOMER_KEY = "customer"

const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost:8888/', // Your store URL
    consumerKey: 'ck_8a975027f857d4a90efdaa8853ebb08d7991f9c6', // Your consumer key
    consumerSecret: 'cs_fff0d151dbf8b52f7d615e0819cba4c5a1c7692a', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});

class CustomerService {
    constructor() {
        this.customerStorage = Cookies.get(CUSTOMER_KEY)
        if (this.customerStorage == null) {
            this.clearCustomerStorage()
        } else {
            this.customerStorage = JSON.parse(this.customerStorage)
        }
    }

    clearCustomerStorage = () => {
        this.customerStorage = {}
        this.saveToCustomerStorage()
    }

    saveToCustomerStorage = () => {
        Cookies.set(CUSTOMER_KEY, this.customerStorage, { expires: 7 })
    }

    setCustomerIdToCookie = (customerId) => {
        this.customerStorage["customerId"] = customerId
        this.saveToCustomerStorage()
    }

    isLoggedIn = () => {
        return this.getCustomerIdFromCookie() !== null
    }

    getCustomerIdFromCookie = () => {
        return this.customerStorage["customerId"]
    }

    getCustomerById = (id) => {
        return WooCommerce.get(`customers/${id}`)
            .then((response) => {
                const customer = new Customer(response.data)
                this.setCustomerIdToCookie(customer.id)

                return customer
            })
            .catch((error) => {
                console.log(error.response.data);

                return null
            });
    }

    logIn = (email) => {
        return WooCommerce.get("customers", {
            email: email,
            role: "all"
        })
            .then((response) => {
                if (response.data.length > 0) {
                    const customer = new Customer(response.data[0])
                    this.setCustomerIdToCookie(customer.id)

                    return customer
                } else {
                    return null
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                return null
            });
    }

    logOut = () => {
        this.customerStorage["customerId"] = null
        this.saveToCustomerStorage()
    }
}

export default CustomerService
