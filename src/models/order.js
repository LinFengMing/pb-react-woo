import PBModel from './pbModel'
import OrderItem from './orderItem'
import Address from './address'

class Order extends PBModel {
    get status () {
        return this.getValue("status")
    }

    get dateCreated () {
        return this.getValue('date_created').replace("T", " ")
    }

    get currency () {
        return this.getValue("currency")
    }

    get total () {
        return this.getValue("total")
    }

    get fullAddress () {
        const {postcode, state, city, address_1, address_2} = this.shipping
        return `${postcode} ${state} ${city} ${address_1} ${address_2}`
    }

    get shipping () {
        return new Address(this.getValue("shipping"))
    }

    get billing () {
        return new Address(this.getValue("billing"))
    }

    get items () {
        if (!this._items) {
            this._items = this.getValue("line_items").map((lineItem)=>{
                return new OrderItem(lineItem)
            })
        }

        return this._items
    }

    get productIds () {
        return this.items.map((item) => {
            return item.productId
        })
    }
}

export default Order
