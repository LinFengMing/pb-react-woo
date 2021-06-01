import React from 'react'
import {
    Link
} from "react-router-dom";

const OrderFailedPage = () => {
    return (
        <div style={{ padding: "88px 0", textAlign: "center" }}>
            <h1>訂單建立失敗</h1>
            <div style={{ paddingTop: "128px" }}>
                <Link to="/">
                    回到首頁
                </Link>
            </div>
        </div>
    )
}

export default OrderFailedPage;
