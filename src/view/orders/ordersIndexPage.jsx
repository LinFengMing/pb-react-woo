import React, { useRef, useState, useEffect, useMemo } from 'react'
import LoadingView from '../layout/loadingView'
import OrderService from '../../services/orderService'
import Card, {
    CardPrimaryContent,
    CardActions,
    CardActionButtons,
} from "@material/react-card";
import {
    Cell,
    Grid,
    Row
} from '@material/react-layout-grid';
import Button from '@material/react-button';
import {
    Link,
} from "react-router-dom";

const orderService = new OrderService()

const OrdersContentView = ({ orders }) => {
    return (
        <Grid>
            <Row>
                {
                    orders.map((order) => {
                        const url = `/orders/${order.id}`
                        return (
                            <Cell
                                key={order.id}
                                desktopColumns={3}
                                phoneColumns={4}
                                tabletColumns={4}
                            >
                                <Card>
                                    <CardPrimaryContent>
                                        <div style={{ padding: "16px" }}>
                                            <h1>訂單編號: {order.id}</h1>
                                            <h4>訂單狀態: {order.status}</h4>
                                            <p>訂單日期: {order.dateCreated}</p>
                                        </div>
                                    </CardPrimaryContent>
                                    <CardActions>
                                        <CardActionButtons>
                                            <Link to={url}>
                                                <Button>詳細資料</Button>
                                            </Link>
                                        </CardActionButtons>
                                    </CardActions>
                                </Card>
                            </Cell>
                        )
                    })
                }
            </Row>
        </Grid>
    )
}

const OrdersIndexPage = () => {
    const isInited = useRef(false)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const loadFun = async () => {
            const result = await orderService.getOrders()
            isInited.current = true
            setOrders(result)
        }

        loadFun()
    }, [orderService])

    const initFlag = isInited.current
    const contentView = useMemo(() => {
        if (initFlag) {
            return (<OrdersContentView orders={orders} />)
        } else {
            return (<LoadingView />)
        }
    }, [orders, initFlag])

    return (
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
            {contentView}
        </div>
    )
}

export default OrdersIndexPage;

