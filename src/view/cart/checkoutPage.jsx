import React, { useState, useContext, useEffect, useRef } from 'react'
import Button from '@material/react-button'
import CartContext from '../../context/cartContext'
import OrderService from '../../services/orderService'
import CartService from '../../services/cartService'
import CheckoutInfoEditorContainer from './components/class/checkoutInfoEditorContainer'
import ExtraCheckoutInfroContext from '../../context/extraCheckoutInfroContext'
import CheckoutInfoContext from '../../context/checkoutInfoContext'

const orderService = new OrderService()
const cartService = new CartService()

const data = {
    payment_method: "bacs",
    payment_method_title: "銀行轉帳",
    set_paid: true,
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
        {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "10"
        }
    ]
};


const CheckoutPage = () => {
    const [submitting, setSubmitting] = useState(false)
    const [submitData, setSubmitData] = useState(data)
    const [extraSubmitData, SetExtraSubmitData] = useState({
        receiptType: "2",
        taxId: "",
        receiptOptions: ["byMail"]
    })
    const [cartItemDetails] = useContext(CartContext)
    const isReady = useRef(false)

    const getButtonText = () => {
        if (submitting) {
            return "結帳中...請稍後"
        } else if (!isReady.current) {
            return "資料填寫不完整, 無法結帳"
        } else {
            return "結帳"
        }
    }

    submitData.line_items = cartItemDetails.map((item) => {
        return {
            product_id: item.product.id,
            quantity: item.quantity
        }
    })

    useEffect(() => {
        orderService.getPaymentGatways()
        orderService.getShippingMethods()
    }, [])

    return (
        <CheckoutInfoContext.Provider value={[submitData, setSubmitData, isReady]} >
            <ExtraCheckoutInfroContext.Provider value={[extraSubmitData, SetExtraSubmitData]}>
                <div style={{ margin: "auto", maxWidth: "1200px" }}>
                    <h1 style={{ textAlign: "center", padding: "18px 0" }}>結帳</h1>
                    <CheckoutInfoEditorContainer />
                    <div style={{ textAlign: "center", padding: "18px 0 88px 0" }}>
                        <Button outlined onClick={
                            (e) => {
                                setSubmitting(true)
                                const submitOrder = async () => {
                                    console.log(submitData)
                                    // const order = await orderService.submitOrder(submitData)
                                    // if (order) {
                                        // cartService.clearCartItems()
                                        // window.location.replace(`/orders/${order.id}/success`)
                                    // } else {
                                        // window.location.replace(`/orders/failed`)
                                    // }
                                }
                                submitOrder()
                            }
                        }
                            disabled={!isReady.current || submitting}
                        >{getButtonText()}</Button>
                    </div>
                </div>
            </ExtraCheckoutInfroContext.Provider>
        </CheckoutInfoContext.Provider>
    )
}

export default CheckoutPage;
