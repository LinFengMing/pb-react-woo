import React, { useContext, useState } from 'react'
import AddressPicker from './addressPicker.jsx'
import ReceiptType from './receiptType.jsx'
import TaiwanPostalCode from './TaiwanPostalCode.json'
import { Cell, Grid, Row } from '@material/react-layout-grid';
import CheckoutInfoContext from '../../../../context/checkoutInfoContext'

const CheckoutInfoEditorContainer = () => {
    const [submitData, setSubmitData, isReady] = useContext(CheckoutInfoContext)
    const [state, setState] = useState(
        {
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
    )

    const checkIsReceiptTypeReady = (receipt) => {
        let result = false
        const { receiptType, taxId } = receipt
        if (receiptType === "2") {
            result = true
        } else if (receiptType === "3" && taxId !== "") {
            result = true
        }

        return result
    }

    const checkIsAddressReady = (fullAddress) => {
        const { city, district, postalCode, address } = fullAddress
        if (city !== "" && district !== "" && postalCode !== "" && address !== "") {
            return true
        }
        return false
    }

    const updateContextValue = () => {
        const { fullAddress } = state
        const newAddress = {
            address_1: fullAddress.address,
            address_2: "",
            city: fullAddress.district,
            state: fullAddress.city,
            postcode: fullAddress.postalCode,
        }
        setSubmitData({
            ...submitData,
            billing: {
                ...submitData.billing,
                ...newAddress
            },
            shipping: {
                ...submitData.shipping,
                ...newAddress
            }
        })
    }

    const handler = (name, value) => {
        setState({ ...state, [name]: value })
        isReady.current = (
            checkIsReceiptTypeReady(
                (name === "receipt" ? value : state.receipt)
            )
            && checkIsAddressReady(
                (name === "fullAddress" ? value : state.fullAddress)
            )
        )
        updateContextValue()
    }

    return (
        <Grid>
            <Row>
                <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                    <ReceiptType
                        handler={handler}
                        receipt={state.receipt}
                    />
                    <br />
                </Cell>
                <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            </Row>
            <Row>
                <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                    <AddressPicker
                        handler={handler}
                        fullAddress={state.fullAddress}
                        taiwanPostalCodes={TaiwanPostalCode}
                    />
                    <br />
                </Cell>
                <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            </Row>
        </Grid>
    )
}

export default CheckoutInfoEditorContainer;