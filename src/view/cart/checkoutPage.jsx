import React, { useState, useContext, useEffect } from 'react'
import Button from '@material/react-button'
import CartContext from '../../context/cartContext'
import OrderService from '../../services/orderService'
import CartService from '../../services/cartService'

const orderService = new OrderService()
const cartService = new CartService()

const data = {
    payment_method: "bacs",
    payment_method_title: "銀行轉帳",
    set_paid: false,
    billing: {
        first_name: "小明",
        last_name: "王",
        address_1: "信義路五段7號89樓",
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
        address_1: "信義路五段7號89樓",
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
    const [cartItemDetails] = useContext(CartContext)
    const { shipping } = data
    const buttonText = (submitting) ? "結帳中...請稍後" : "結帳"

    data.line_items = cartItemDetails.map((item) => {
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
        <div style={{ margin: "auto", maxWidth: "1200px", textAlign: "center" }}>
            <h1>地址</h1>
            <p>{data.last_name}{data.first_name}</p>
            <p>{data.email}</p>
            <p>{shipping.postcode}{shipping.country}{shipping.state}{shipping.city}{shipping.address_1}</p>
            <p>{data.payment_method_title}</p>
            <p>{data.shipping_lines[0].method_title}</p>
            <Button outlined onClick={
                (e) => {
                    setSubmitting(true)
                    const submitOrder = async () => {
                        const order = await orderService.submitOrder(data)
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
                disabled={submitting}
            >{buttonText}</Button>
        </div>
    )
}

export default CheckoutPage;

