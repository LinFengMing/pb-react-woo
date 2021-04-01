import React, {useState} from 'react';
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

function Nav() {
  const [open, setOpen] = useState(false);

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
        <Link to='/cart'>
          <ListItem>購物車</ListItem>
        </Link>
        <Link to='/orders'>
          <ListItem>歷史訂單</ListItem>
        </Link>
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
      </TopAppBarRow>
    </TopAppBar>
  </>
  );
}

export default Nav;
