import PBModel from './pbModel'

class OrderItem extends PBModel {
    get name(){
        return this.getValue("name")
    }

    get productId() {
        return this.getValue("product_id")
    }

    get quantity() {
        return this.getValue("quantity")
    }

    get price() {
        return this.getValue("price")
    }

    bindProduct = (product) => {
        if (`${this.productId}` === `${product.id}`){
            this._product = product
        }

        return this
    }

    get product () {
        return this._product || null
    }

    get imageUrl() {
        return this.product ? this.product.imageUrl : "https://via.placeholder.com/48x48"
    }
}

export default OrderItem
