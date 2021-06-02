import React, { useEffect, useRef, useState, useMemo } from 'react'
import OrderService from '../../services/orderService'
import ProductService from '../../services/productService'
import CustomerService from '../../services/customerService'
import LoadingView from '../layout/loadingView'
import Button from '@material/react-button'
import {
    useParams,
    Link,
    Redirect
} from "react-router-dom";

const orderService = new OrderService()
const productService = new ProductService()
const customerService = new CustomerService()

const OrderContentView = ({ order }) => {
    const isInited = useRef(false)
    const [orderItems, setOrderItems] = useState([])
    useEffect(() => {
        const loadFunc = async () => {
            const products = await productService.getProductsByIds(order.productIds)
            isInited.current = true
            const newOrderItems = order.items.map((item) => {
                for (const product of products) {
                    if (`${item.productId}` === `${product.id}`) {
                        return item.bindProduct(product)
                    }
                }

                return null
            }).filter(x => x)

            setOrderItems(newOrderItems)

        }

        loadFunc()
    }, [])
    return (
        <div style={{
            margin: "auto",
            padding: "48px 0",
            textAlign: "center",
            maxWidth: "1200px"
        }}>
            <h1>訂單編號：{order.id}</h1>
            <br />
            <p>訂單狀態：{order.status}</p>
            <p>訂單建立時間：{order.dateCreated}</p>
            <p>總價：{order.currency} {order.total}</p>
            <p>地址：{order.fullAddress}</p>
            <br />
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {
                    orderItems.map((orderItem) => {
                        const imageUrl = orderItem.imageUrl
                        const alt = `${orderItem.name}_image`
                        return (
                            <li key={orderItem.id}>
                                <div>
                                    <img
                                        src={imageUrl}
                                        alt={alt}
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            verticalAlign: "middle",
                                            marginRight: "16px"
                                        }} />
                                    <span style={
                                        {
                                            lineHeight: "48px",
                                            height: "48px"
                                        }}>
                                        {orderItem.name} : {orderItem.quantity} x {orderItem.price}
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div style={{ paddingTop: "64px" }}>
                <Link to="/orders">
                    <Button outlined>所有訂單</Button>
                </Link>
            </div>
            <div style={{ paddingTop: "64px" }}>
                <Link to="/">
                    回到首頁
                </Link>
            </div>
        </div>
    )
}

const OrderShowPage = () => {
    const { id } = useParams();
    const isInited = useRef(false)
    const [order, setOrder] = useState({})

    useEffect(() => {
        const loadFun = async () => {
            const result = await orderService.getOrder(id, customerService.getCustomerIdFromCookie())
            isInited.current = true
            setOrder(result)
        }

        loadFun()
    }, [])

    const initFlag = isInited.current
    const contentView = useMemo(() => {
        if (initFlag) {
            if (order) {
                return (<OrderContentView order={order} />)
            } else {
                return (<Redirect to="/" />)
            }
        } else {
            return (<LoadingView />)
        }
    }, [order, initFlag])

    return contentView
}

export default OrderShowPage;
