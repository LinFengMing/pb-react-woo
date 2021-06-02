import React, { useEffect, useRef, useState, useMemo } from 'react'
import OrderService from '../../services/orderService'
import CustomerService from '../../services/customerService'
import LoadingView from '../layout/loadingView'
import Button from '@material/react-button'
import {
    useParams,
    Link,
    Redirect
} from "react-router-dom";

const orderService = new OrderService()
const customerService = new CustomerService()

const OrderSuccessContentView = ({order}) => {
    return (
        <div style={{ padding: "88px 0", textAlign: "center" }}>
            <h1>訂單建立成功</h1>
            <div>
                你的訂單編號為 <Link to={`/orders/${order.id}`}>{order.id}</Link>
            </div>
            <div style={{ paddingTop: "64px" }}>
                <Link to="/orders">
                    <Button outlined>所有訂單</Button>
                </Link>
            </div>
            <div style={{ paddingTop: "128px" }}>
                <Link to="/">
                    回到首頁
            </Link>
            </div>
        </div>
    )
}

const OrderSuccessPage = () => {
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
                return (<OrderSuccessContentView order={order} />)
            } else {
                return (<Redirect to="/" />)
            }
        } else {
            return (<LoadingView />)
        }
    }, [order, initFlag])

    return contentView
}

export default OrderSuccessPage;
