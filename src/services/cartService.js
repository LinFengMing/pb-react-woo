import Cookies from 'js-cookie'

const CART_KEY = "cart"

class CartService {
    constructor () {
        this.cart = Cookies.get(CART_KEY)
        if (this.cart == null) {
            this.clearCartItems();
        } else {
            this.cart = JSON.parse(this.cart)
        }
        console.log(this.cart);
    }

    static createCartItem = (productId, quantity = 0) => {
        return {
            productId: productId,
            quantity: quantity
        }
    }

    save = () => {
        Cookies.set(CART_KEY, this.cart)
    }

    getCartItem = (productId) => {
        const productIdKey = parseInt(productId)
        const cartItem = this.cart[productId]
        if (!cartItem || !this.isCartItemValid(cartItem, productIdKey)){
            this.removeCartItem(productIdKey)
            return
        }

        return cartItem
    }

    addInCart = (productId, quantity) => {
        const cartItem = this.getCartItem(productId) || CartService.createCartItem(productId, 0)
        cartItem.quantity += Math.max(1, quantity)
        this.updateCartItem(cartItem)
    }

    updateCartItem = (cartItem) => {
        const {productId} = cartItem
        if (this.isCartItemValid(cartItem, productId)){
            this.cart[productId] = cartItem
            this.save()
        }
    }

    removeCartItem = (productId) => {
        this.cart[productId] = null
        this.save()
    }

    clearCartItems = () => {
        this.cart = {}
        this.save()
    }

    isCartItemValid = (cartItem, productId) => {
        return !(cartItem.productId !== productId || cartItem.quantity <= 0)
    }

    getCartItems = () => {
        return Object.keys(this.cart).map((productId) => {
            return this.getCartItem(productId)
        }).filter(x => x)
    }
}

export default CartService
