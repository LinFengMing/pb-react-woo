import PBModel from './pbModel'

class ShippingZone extends PBModel {
    get name() {
        return this.getValue("name")
    }

    get order() {
        return this.getValue("order")
    }
}

export default ShippingZone
