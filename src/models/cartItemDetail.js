import PBModel from "./pbModel";

class CartItemDetail extends PBModel {
    constructor(product, quantity) {
        console.log(quantity)
        super({
            product: product,
            quantity: quantity
        })
    }

    get product() {
        return this.getValue("product")
    }

    get quantity() {
        return this.getValue("quantity")
    }

    get productName() {
        return this.product.name
    }

    get productId() {
        return this.product.id
    }
}

export default CartItemDetail
