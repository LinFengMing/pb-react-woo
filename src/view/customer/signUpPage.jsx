import React, { useState, useContext } from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import CustomerService from '../../services/customerService'
import IsLogInContext from '../../context/isLogInContext';

const customerService = new CustomerService()

const SignUpPage = () => {

    const [uiStatus, setUIStatus] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        isLoading: false
    })

    const [isLogin, setIsLogin] = useContext(IsLogInContext)

    const typeInInput = (e) => {
        const { value, name } = e.target
        setUIStatus({ ...uiStatus, [name]: value })
    }

    const tryToSignUp = async (e) => {
        setUIStatus({ ...uiStatus, isLoading: true })
        const result = await customerService.signUp({
            email: uiStatus.email,
            first_name: uiStatus.first_name,
            last_name: uiStatus.last_name,
            username: `${uiStatus.first_name} ${uiStatus.last_name}`
        })

        if (customerService.isLoggedIn) {
            setIsLogin(customerService.isLoggedIn)
            window.location.replace("/")
        } else {
            alert('註冊失敗')
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
                <div style={{padding: "32px 0px"}}>
                <h1 style={{textAlign: "center", paddingBottom: "16px"}}>
                    註冊
                </h1>
                <div>
                    <TextField
                        outlined
                        label='First name'
                        style={{width: "100%"}}
                    >
                        <Input
                            name="first_name"
                            type="first_name"
                            value={uiStatus.first_name}
                            onChange={typeInInput}
                        />
                    </TextField>
                </div>
                <br/>
                <div>
                    <TextField
                        outlined
                        label='Last name'
                        style={{width: "100%"}}
                    >
                        <Input
                            name="last_name"
                            type="last_name"
                            value={uiStatus.last_name}
                            onChange={typeInInput}
                        />
                    </TextField>
                </div>
                <br/>
                <div>
                    <TextField
                        outlined
                        label='Email'
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
                        label='Password'
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
                            Sign up
                        </Button>
                    ) : (
                            <Button onClick={tryToSignUp}>
                                Sign up
                            </Button>
                        )
                }
                </div>
            </Cell>
            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
        </Row>
    </Grid>
    )
}

export default SignUpPage
