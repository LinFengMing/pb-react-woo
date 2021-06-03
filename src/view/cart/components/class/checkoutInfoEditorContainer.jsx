import React, { PureComponent } from 'react'
import AddressPicker from './addressPicker.jsx'
import ReceiptType from './receiptType.jsx'
import TaiwanPostalCode from './taiwanPostalCode.json'
import { Cell, Grid, Row } from '@material/react-layout-grid';
import CheckoutInfoContext from '../../../../context/checkoutInfoContext'

class CheckoutInfoEditorContainer extends PureComponent {
    static contextType = CheckoutInfoContext;

    constructor(props) {
        super(props)
        this.state = {
            receipt: {
                receiptType: "2",
                taxId: "",
                receiptOptions: ["byMail"]
            },
            fullAddress: {
                city: "新竹市",
                district: "",
                postalCode: "",
                address: ""
            }
        }
    }

    updateContextValue = () => {
        const [submitData, setSubmitData, isReady] = this.context
        isReady.current = this.isReady()

        const {fullAddress} = this.state
        const newAddress = {
            address_1: fullAddress.address,
            address_2: "",
            city: fullAddress.district,
            state: fullAddress.city,
            postcode: fullAddress.postalCode,
        }
        setSubmitData({
            ...submitData,
            billing:{
                ...submitData.billing,
                ...newAddress
            },
            shipping: {
                ...submitData.shipping,
                ...newAddress
            }
        })
    }

    handler = (name, value) => {
        this.setState({ [name]: value }, () => {
            this.updateContextValue()
        })
    }

    checkIsReceiptTypeReady = () => {
        let result = false
        if (this.state.receipt.receiptType === "2") {
            result = true
        } else if (this.state.receipt.receiptType === "3" && this.state.receipt.taxId !== "") {
            result = true
        }

        return result
    }

    checkIsAddressReady = () => {
        const { city, district, postalCode, address } = this.state.fullAddress
        if (city !== "" && district !== "" && postalCode !== "" && address !== "") {
            return true
        }
        return false
    }

    isReady = () => {
        return this.checkIsReceiptTypeReady() && this.checkIsAddressReady()
    }

    render = () => {
        return (
            <Grid>
                <Row>
                    <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                    <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                        <ReceiptType
                            handler={this.handler}
                            receipt={this.state.receipt}
                        />
                        <br />
                    </Cell>
                    <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                </Row>
                <Row>
                    <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                    <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                        <AddressPicker
                            handler={this.handler}
                            fullAddress={this.state.fullAddress}
                            taiwanPostalCodes={TaiwanPostalCode}
                        />
                        <br />
                    </Cell>
                    <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                </Row>
            </Grid>
        )
    }
}

export default CheckoutInfoEditorContainer;
