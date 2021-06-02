import PBModel from './pbModel'

class Address extends PBModel {

    get postcode () {
        return this.getValue("postcode")
    }

    get state () {
        return this.getValue("state")
    }

    get city () {
        return this.getValue("city")
    }

    get address_1 () {
        return this.getValue("address_1")
    }

    get address_2 () {
        return this.getValue("address_2")
    }
}

export default Address
