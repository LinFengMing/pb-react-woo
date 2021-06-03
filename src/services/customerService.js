import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Customer from '../models/customer'
import Cookies from 'js-cookie'

const CUSTOMER_KEY = "customer"

const WooCommerce = new WooCommerceRestApi({
    url: 'http://192.168.56.10/', // Your store URL
    consumerKey: 'ck_a45dccafe3f03eb0335129ddf8ae6464ff637b67', // Your consumer key
    consumerSecret: 'cs_720106a5298531eabbe761540616d8f02a07539e', // Your consumer secret
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

    setShouldBackToCheckout = () => {
        this.customerStorage["setShouldBackToCheckout"] = true
        this.saveToCustomerStorage()
    }

    clearShouldBackToCheckout = () => {
        this.customerStorage["setShouldBackToCheckout"] = null
        this.saveToCustomerStorage()
    }

    get shouldBackToCheckout () {
        return !!this.customerStorage["setShouldBackToCheckout"]
    }

    get isLoggedIn () {
        return !!this.getCustomerIdFromCookie()
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
        this.clearCustomerStorage()
    }

    signUp = (data) => {
        return WooCommerce.post("customers", data)
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
}

export default CustomerService
