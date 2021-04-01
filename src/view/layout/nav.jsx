import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import List, {ListItem, ListItemText} from '@material/react-list';
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
          <Link to='/products'>
            <ListItem>所有商品</ListItem>
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
