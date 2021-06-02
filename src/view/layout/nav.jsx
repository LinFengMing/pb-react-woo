import React, { useState, useContext } from 'react';
import {
  Link,
} from "react-router-dom";
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import List, {ListItem} from '@material/react-list';
import Drawer from '@material/react-drawer';
import MaterialIcon from '@material/react-material-icon';
import CartItemsPopUp from './cartItemsPopup.jsx';
import IsLogInContext from '../../context/isLogInContext';

function Nav() {
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useContext(IsLogInContext)

    return (
    <>
        <Drawer
            modal
            open={open}
            onClose={
                () => {
                    setOpen(false);
                }
            }
        >
            <List>
                <Link to='/'>
                    <ListItem>首頁</ListItem>
                </Link>
                <Link to='/products'>
                    <ListItem>所有商品</ListItem>
                </Link>
                <Link to='/products/search'>
                    <ListItem>搜尋商品</ListItem>
                </Link>
                <Link to='/cart'>
                    <ListItem>購物車</ListItem>
                </Link>
                {
                    isLogin ? (
                        <>
                            <Link to="/orders">
                                <ListItem>歷史訂單</ListItem>
                            </Link>
                            <Link to="/logout">
                                <ListItem>
                                    登出
                                </ListItem>
                            </Link>
                        </>
                    ) : (
                            <>
                                <Link to="/login">
                                    <ListItem>登入</ListItem>
                                </Link>
                                <Link to="/signup">
                                    <ListItem>註冊</ListItem>
                                </Link>
                            </>
                        )
                }
            </List>
        </Drawer>
        <TopAppBar>
            <TopAppBarRow>
                <TopAppBarSection align='start'>
                    <TopAppBarIcon navIcon tabIndex={0}>
                        <MaterialIcon hasRipple icon='menu' onClick={
                            () => {
                                setOpen(!open);
                            }
                        }
                        />
                    </TopAppBarIcon>
                    <TopAppBarTitle>
                        React Hooks
                    </TopAppBarTitle>
                </TopAppBarSection>

                <TopAppBarSection align='end' role='toolbar'>
                    <TopAppBarIcon tabIndex={0}>
                        <div style={{marginRight: "32px"}}>
                            <CartItemsPopUp />
                        </div>
                    </TopAppBarIcon>
                </TopAppBarSection>

            </TopAppBarRow>
        </TopAppBar>
    </>
    );
}

export default Nav;
