import React, { useEffect } from 'react'
import Card, {
    CardPrimaryContent,
} from "@material/react-card";

import {
    Body2,
    Headline6,
} from '@material/react-typography';

import Radio, { NativeRadioControl } from '@material/react-radio';
import Checkbox from '@material/react-checkbox';
import TextField, { Input } from '@material/react-text-field';

const removeValueFromArray = (array, value) => {
    return array.filter((element) => {
        return element !== value
    })
}

const ReceiptType = ({ receipt, handler }) => {
    const { receiptType, taxId, receiptOptions } = receipt

    const inputHandler = (e) => {
        const { name, value } = e.target
        handler("receipt", { ...receipt, [name]: value })
    }

    const checkboxHandler = (e) => {
        const checkboxParent = e.target.closest('.mdc-checkbox')
        const newValue = e.target.value
        const name = checkboxParent.getAttribute("attributeName")

        let values = receipt[name]
        if (values.includes(newValue)) {
            values = removeValueFromArray(values, newValue)
        } else {
            values.push(newValue)
        }

        if (name === "receiptOptions" && !values.includes("byMail")) {
            values = []
        }

        handler("receipt", { ...receipt, [name]: values })
    }

    useEffect(() => {
        document.getElementById("byMail").value = "byMail"
        document.getElementById("promptRegistered").value = "promptRegistered"
    }, [])

    return (
        <div>
            <Card>
                <CardPrimaryContent>
                    <div style={{ padding: "1rem" }}>
                        <Headline6 tag="p">
                            發票類型
                            </Headline6>
                        <Body2 tag="div">
                            <div>
                                <Radio label='個人' key='personal'>
                                    <NativeRadioControl
                                        name='receiptType'
                                        value='2'
                                        id='personal'
                                        onChange={inputHandler}
                                        checked={receiptType === "2"}
                                    />
                                </Radio>
                                <br />
                                <Radio label='公司' key='company'>
                                    <NativeRadioControl
                                        value='3'
                                        name='receiptType'
                                        id='company'
                                        onChange={inputHandler}
                                        checked={receiptType === "3"}
                                    />
                                </Radio>
                                <TextField
                                    style={{ "marginLeft": "1rem" }}
                                    outlined
                                    label='統一編號'
                                >
                                    <Input
                                        type="text"
                                        name="taxId"
                                        value={taxId}
                                        id='taxId'
                                        onChange={inputHandler}
                                    />
                                </TextField>
                            </div>
                            <br />
                            <div>
                                <Headline6 tag="p">
                                    郵寄選項
                                    </Headline6>
                                <React.Fragment>
                                    <Checkbox
                                        name="receiptOptions[]"
                                        attributeName="receiptOptions"
                                        nativeControlId='byMail'
                                        checked={receiptOptions.includes("byMail")}
                                        onChange={checkboxHandler}
                                    />
                                    <label htmlFor='byMail'>實體寄送(+ $30)</label>
                                </React.Fragment>
                                <br />
                                <React.Fragment>
                                    <Checkbox
                                        name="receiptOptions[]"
                                        attributeName="receiptOptions"
                                        nativeControlId='promptRegistered'
                                        checked={receiptOptions.includes("promptRegistered")}
                                        disabled={
                                            !receiptOptions.includes("byMail")
                                        }
                                        onChange={checkboxHandler}
                                    />
                                    <label htmlFor='promptRegistered'>限時掛號(再 + $30 = 60)</label>
                                </React.Fragment>

                            </div>
                        </Body2>
                    </div>
                </CardPrimaryContent>
            </Card>
        </div>
    )
}

export default ReceiptType;