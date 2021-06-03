import React from 'react'
import Select, { Option } from '@material/react-select';

const shippingZoneMethodSelector = ({value, shippingZoneMethods, onChange}) => {

    const currentValue = (shippingZoneMethods.length > 0 && value.length > 0) ? value[0].method_id : ""

    return (
        <div style={{ padding: "1rem" }}>
            <Select
                label='運送方式'
                value={currentValue}
                onEnhancedChange={(index, element) => {
                    onChange(shippingZoneMethods[index])
                }}
                enhanced
                outlined
            >
                {
                    shippingZoneMethods.map((shippingZoneMethod) => {
                        return (
                            <Option
                                key={shippingZoneMethod.id}
                                value={shippingZoneMethod.methodId}
                            >
                                {`${shippingZoneMethod.title} ${shippingZoneMethod.costValue}`}
                            </Option>
                            )
                    })
                }
            </Select>
        </div>
    )
}

export default shippingZoneMethodSelector;
