import React, { useState, useContext, useEffect, useRef } from 'react'
import Button from '@material/react-button'
import CartContext from '../../context/cartContext'
import OrderService from '../../services/orderService'
import CartService from '../../services/cartService'
import CustomerService from '../../services/customerService'
import CheckoutInfoEditorContainer from './components/hooks/checkoutInfoEditorContainer'
import PaymentGatewaySelector from './components/hooks/paymentGatewaySelector'
import ShippingZoneMethodSelector from './components/hooks/shippingZoneMethodSelector'
import ExtraCheckoutInfroContext from '../../context/extraCheckoutInfroContext'
import CheckoutInfoContext from '../../context/checkoutInfoContext'
import Card, {
    CardPrimaryContent,
} from "@material/react-card";
import { Cell, Grid, Row } from '@material/react-layout-grid';

const orderService = new OrderService()
const cartService = new CartService()
const customerService = new CustomerService()

const data = {
    payment_method: "bacs",
    payment_method_title: "銀行轉帳",
    billing: {
        first_name: "小明",
        last_name: "王",
        address_1: "",
        address_2: "",
        city: "信義區",
        state: "台北市",
        postcode: "110",
        country: "TW",
        email: "demo.progressbar.tw@gmail.com",
        phone: "0912345678"
    },
    shipping: {
        first_name: "小明",
        last_name: "王",
        address_1: "",
        address_2: "",
        city: "信義區",
        state: "台北市",
        postcode: "110",
        country: "TW",
    },
    line_items: [],
    shipping_lines: [
    ],
    customer_id: customerService.getCustomerIdFromCookie()
};

const CheckoutPage = () => {
    const [submitting, setSubmitting] = useState(false)
    const [submitData, setSubmitData] = useState(data)
    const [extraSubmitData, SetExtraSubmitData] = useState({
        receiptType: "2",
        taxId: "",
        receiptOptions: ["byMail"]
    })

    const [checkoutAssets, setCheckoutAssets] = useState({
        paymentGateways: [],
        shippingZoneMethods: []
    })

    const [cartItemDetails] = useContext(CartContext)
    const isReady = useRef(false)

    const getButtonText = () => {
        if (submitting) {
            return "結帳中...請稍後"
        } else if (!isReady.current || !isSubmitDataReady()) {
            return "資料填寫不完整, 無法結帳"
        } else {
            return "結帳"
        }
    }

    const isSubmitDataReady = () => {
        return submitData.shipping_lines &&
            submitData.shipping_lines.length > 0 &&
            submitData.payment_method !== ""
    }

    const { paymentGateways, shippingZoneMethods } = checkoutAssets

    submitData.line_items = cartItemDetails.map((item) => {
        return {
            product_id: item.product.id,
            quantity: item.quantity
        }
    })

    useEffect(() => {
        const loadAssets = async () => {
            const [paymentGateways, shippingZones] = await Promise.all([
                orderService.getPaymentGatways(),
                orderService.getShippingZones()
            ])
            const shippingZoneMethods = await orderService.getShippingZoneMethods(shippingZones[1])

            setCheckoutAssets({
                ...checkoutAssets,
                paymentGateways: paymentGateways,
                shippingZoneMethods: shippingZoneMethods
            })
        }

        loadAssets()
    }, [])

    return (
        <CheckoutInfoContext.Provider value={[submitData, setSubmitData, isReady]} >
            <ExtraCheckoutInfroContext.Provider value={[extraSubmitData, SetExtraSubmitData]}>
                <div style={{ margin: "auto", maxWidth: "1200px" }}>
                    <h1 style={{ textAlign: "center", padding: "18px 0" }}>結帳</h1>
                    <CheckoutInfoEditorContainer />
                    <Grid style={{paddingTop: 0}}>
                        <Row>
                            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                            <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                                <Card>
                                    <CardPrimaryContent>
                                        <PaymentGatewaySelector
                                            value={submitData.payment_method}
                                            paymentGateways={paymentGateways}
                                            onChange={(paymentGateway) => {
                                                setSubmitData({
                                                    ...submitData,
                                                    payment_method: paymentGateway.id,
                                                    payment_method_title: paymentGateway.title
                                                })
                                            }}
                                        />
                                        <ShippingZoneMethodSelector
                                            value={submitData.shipping_lines}
                                            shippingZoneMethods={shippingZoneMethods}
                                            onChange={(shippingZoneMethod) => {
                                                setSubmitData({
                                                    ...submitData,
                                                    shipping_lines: [
                                                        {
                                                            method_id: shippingZoneMethod.methodId,
                                                            method_title: shippingZoneMethod.methodTitle,
                                                            total: shippingZoneMethod.costValue
                                                        }
                                                    ]
                                                })
                                            }}
                                        />
                                    </CardPrimaryContent>
                                </Card>
                            </Cell>
                            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                        </Row>
                    </Grid>
                    <div style={{ textAlign: "center", padding: "18px 0 88px 0" }}>
                        <Button outlined onClick={
                            (e) => {
                                setSubmitting(true)
                                const submitOrder = async () => {
                                    const order = await orderService.submitOrder(submitData)
                                    if (order) {
                                        cartService.clearCartItems()
                                        window.location.replace(`/orders/${order.id}/success`)
                                    } else {
                                        window.location.replace(`/orders/failed`)
                                    }
                                }
                                submitOrder()
                            }
                        }
                            disabled={!isReady.current || !isSubmitDataReady() || submitting}
                        >{getButtonText()}</Button>
                    </div>
                </div>
            </ExtraCheckoutInfroContext.Provider>
        </CheckoutInfoContext.Provider>
    )
}

export default CheckoutPage;
