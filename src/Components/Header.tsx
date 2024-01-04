import { AppBar, Badge, Box, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';
import {
  NotificationsNone as NotificationsNoneIcon
} from '@mui/icons-material';
import logo from "../assets/GeneralStarGenesis.png"
import { makeStyles } from '@mui/styles';
import CSS from 'csstype';
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  useLocation
} from 'react-router-dom';
import {
  Icon,
  Menu,
  MenuItem
} from '@mui/material';
import React from "react";
const useStyles = makeStyles(() => ({
  notificationCount: {
    marginRight: '5px'
  }
}));



const HeaderBar = styled.header`
  height: 60px;
  width: 100%;
  padding: 0em;
  display: flex;
  flex-flow: row no-wrap;
  justify-content: space-between;
  align-content: end;
  background-color: transparent;
  color: ${props => props.theme.primaryColor};
`;

const Navigation = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-content: center;
`;

const Main = styled.main`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: transparent;
  border-radius: 4px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  display: flex;
  color:rgb(0, 130, 206);
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
`;

const Navbar = styled.nav`
  margin: 0px 10px 0px;
  margin-top: 10px;
  
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  width: 100%;
`;

const TopNavLink = styled(NavLink) <CSS.Properties>`
  display: flex;
  flex-flow: row ;
  align-items: center;
  align-content: center;
  text-decoration:none;
  color: rgb(0, 130, 206);
  margin: 5px;
  padding: .5em;
  border-radius: 5px;

  &:hover {
      transition: all .5s ease;
      background-color: rgb(237, 237, 237);
  }
`;

const DashboardButton = styled.a<CSS.Properties>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  align-content: center;
  color: rgb(0, 130, 206);
  margin: 5px;
  padding: .5em;
  border-radius: 5px;
  cursor: pointer;

  & > div {
      width: 90%;
      display: flex;
      flex-flow: row nowrap;
      align-content: center;
      align-items: center;
  }

  &:hover {
      transition: all .5s ease;
      background-color: ${props => props.theme.backgroundDark};
  }
`;

const NotificationButton = styled(IconButton) <CSS.Properties>`
  color: rgb(0, 130, 206);

`;

const NotificationsIcon = styled(NotificationsNoneIcon)`
  color: rgb(0, 130, 206);
`

const DashboadLabel = styled.span<CSS.Properties>`
  whiteSpace: nowrap;
`;

interface NavItemProps {
  to?: any,
  icon?: any,
  title?: any,
  onClick?: any
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, title, onClick }) => (
  <TopNavLink to={to} title={title} onClick={onClick}>
    <Person2SharpIcon/>
    <span style={{ marginLeft: '3px' }}>{title}</span>
  </TopNavLink>
);


export const Header = () => {

  const classes = useStyles();

  return (
    
      <HeaderBar>
        <Title>
          <img src={logo} alt="Logo" style={{ width: '248px', height: '48px', marginTop: '15px', marginLeft: '5px', marginRight: '20px', marginBottom: '10px' }} />
          Genesis UW
        </Title>
        <Navigation>
          <Navbar>
            {/* <DashboardMenu user={$auth} /> */}

            <NavItem to="" icon="person" title="Arslan Tariq (Consultant)" />
            <NotificationButton title="Notification"  >
              <Badge badgeContent={10} color="error" className={classes.notificationCount} >
                <NotificationsIcon />
              </Badge>
            </NotificationButton>
          </Navbar>
        </Navigation>
      </HeaderBar >
 
  )

}