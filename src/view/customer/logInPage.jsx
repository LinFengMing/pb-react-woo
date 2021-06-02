import React, { useState, useContext } from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import CustomerService from '../../services/customerService'
import IsLogInContext from '../../context/isLogInContext';

const customerService = new CustomerService()

function LogInPage() {

    const [uiStatus, setUIStatus] = useState({
        email: "",
        password: "",
        isLoading: false
    })

    const [isLogin, setIsLogin] = useContext(IsLogInContext)

    const typeInInput = (e) => {
        const { value, name } = e.target
        setUIStatus({ ...uiStatus, [name]: value })
    }

    const tryToLogin = async (e) => {
        setUIStatus({ ...uiStatus, isLoading: true })
        const result = await customerService.logIn(uiStatus.email, uiStatus.password)
        if(customerService.isLoggedIn){
            setIsLogin(customerService.isLoggedIn)

            if (customerService.setShouldBackToCheckout()) {
                customerService.clearShouldBackToCheckout()
                window.location.replace("/checkout")
            } else {
                window.location.replace("/")
            }
        }
    }

    if (isLogin) {
        window.location.replace('/')

        return null
    }

    return (
        <Grid>
            <Row>
                <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
                <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
                    <div style={{padding: "80px 0px"}}>
                    <h1 style={{textAlign: "center", paddingBottom: "16px"}}>Log in</h1>
                    <div>
                        <TextField
                            outlined
                            label='Login email'
                            style={{width: "100%"}}
                        >
                            <Input
                                name="email"
                                type="email"
                                value={uiStatus.email}
                                onChange={typeInInput}
                            />
                        </TextField>
                    </div>
                    <br/>
                    <div>
                    <TextField
                            outlined
                            label='Login password'
                            style={{width: "100%"}}
                        >
                            <Input
                                name="password"
                                type="password"
                                value={uiStatus.password}
                                onChange={typeInInput}
                            />
                        </TextField>
                    </div>
                    <br/>
                    <br/>
                    {
                        uiStatus.isLoading ? (
                            <Button disabled={true}>
                                Log in
                            </Button>
                        ) : (
                                <Button onClick={tryToLogin}>
                                    Log in
                                </Button>
                            )
                    }
                    </div>
                </Cell>
                <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            </Row>
        </Grid>)
}

export default LogInPage;
