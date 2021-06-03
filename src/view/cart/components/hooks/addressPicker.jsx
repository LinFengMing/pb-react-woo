import React, { useRef, useEffect } from 'react'
import Card, {
    CardPrimaryContent,
} from "@material/react-card";

import TextField, { HelperText, Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Select, { Option } from '@material/react-select';

const getCityOptions = (cities) => {
    return cities.map((city) => {
        return (
            <Option key={city} value={city}>{city}</Option>
        )
    })
}

const getDistricOptions = (districts) => {
    return districts.map((district) => {
        return (
            <Option key={district} value={district}>{district}</Option>
        )
    })
}

const AddressPicker = ({
    taiwanPostalCodes,
    fullAddress,
    handler
}) => {
    const {
        city,
        district,
        postalCode,
        address
    } = fullAddress
    const cities = Object.keys(taiwanPostalCodes)
    const cityOptions = getCityOptions(cities)
    const cityData = taiwanPostalCodes[city];
    const districts = Object.keys(cityData)
    const districtsOptions = getDistricOptions(districts)
    const div = useRef(null)

    useEffect(() => {
        let enhanced_selects = div.current.querySelectorAll("input[name='enhanced-select']")
        enhanced_selects.forEach(select => {
            select.removeAttribute("name")
        });
    }, [])

    const handlerRelated = (name, value) => {
        let mergeObject = {}
        if (name === "city" && city !== value) {
            mergeObject['district'] = ""
            mergeObject['postalCode'] = ""
        } else if (name === "district" && district !== value) {
            const cityData = taiwanPostalCodes[city];
            const postalCode = cityData[value];
            mergeObject['postalCode'] = postalCode
        }

        return mergeObject
    }

    const onEnhancedChange = (name, index, item) => {
        const value = item.getAttribute('data-value')
        const mergeObject = handlerRelated(name, value)
        handler("fullAddress", { ...fullAddress, ...mergeObject, [name]: value })
    };

    const clearAddress = () => {
        const name = "address"
        const value = ""
        const mergeObject = handlerRelated(name, value)
        handler("fullAddress", { ...fullAddress, ...mergeObject, [name]: value })
    }

    const inputHandler = (e) => {
        const { name, value } = e.target
        const mergeObject = handlerRelated(name, value)
        handler("fullAddress", { ...fullAddress, ...mergeObject, [name]: value })
    }

    return (
        <div ref={div}>
            <Card>
                <CardPrimaryContent>
                    <div style={{ padding: "1rem" }}>
                        <Select
                            label='城市'
                            value={city}
                            onEnhancedChange={
                                onEnhancedChange.bind(
                                    this,
                                    "city"
                                )
                            }
                            enhanced
                            outlined
                        >
                            {cityOptions}
                        </Select>
                        <input type="hidden" name="city" value={city} />
                        <br />
                        <br />
                        <Select
                            label='市/區'
                            value={district}
                            onEnhancedChange={
                                onEnhancedChange.bind(
                                    this,
                                    "district"
                                )
                            }
                            enhanced
                            outlined
                        >
                            {districtsOptions}
                        </Select>
                        <input type="hidden" name="district" value={district} />
                        <br />
                        <br />
                        <TextField
                            outlined
                            label='郵遞區號'
                        >
                            <Input
                                id="postalCode"
                                type="text"
                                name="postalCode"
                                value={postalCode}
                                disabled={true}
                            />
                        </TextField>
                        <input type="hidden" name="postalCode" value={postalCode} />
                        <br />
                        <br />
                        <TextField
                            outlined
                            label='地址'
                            helperText={<HelperText>請輸入正確地址用以寄送商品</HelperText>}
                            leadingIcon={<MaterialIcon role="button" icon="alarm" />}
                            onTrailingIconSelect={clearAddress}
                            trailingIcon={<MaterialIcon role="button" icon="delete" />}
                        >
                            <Input
                                id='address'
                                type="text"
                                name="address"
                                value={address}
                                onChange={inputHandler}
                            />
                        </TextField>
                    </div>
                </CardPrimaryContent>
            </Card>
        </div>
    )
}



export default AddressPicker;