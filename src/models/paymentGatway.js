import PBModel from './pbModel'

class PaymentGateway extends PBModel {
    get title() {
        return this.getValue("title")
    }

    get description() {
        return this.getValue("description")
    }

    get order() {
        return parseInt(this.getValue("order"))
    }

    get enabled() {
        return this.getValue("enabled")
    }
}

export default PaymentGateway
