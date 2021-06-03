import React from 'react'
import Select, { Option } from '@material/react-select';

const PaymentGatewaySelector = ({value, paymentGateways, onChange}) => {
    const currentValue = paymentGateways.length > 0 ? value : ""

    return (
        <div style={{ padding: "1rem" }}>
            <Select
                label='付費方式'
                value={currentValue}
                onEnhancedChange={(index, element) => {
                    onChange(paymentGateways[index])
                }}
                enhanced
                outlined
            >
                {
                    paymentGateways.map((paymentGateway) => {
                        return (
                            <Option
                                key={paymentGateway.id}
                                value={paymentGateway.id}
                            >
                                {paymentGateway.title}
                            </Option>
                            )
                    })
                }
            </Select>
        </div>
    )
}

export default PaymentGatewaySelector;
