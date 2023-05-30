import React from 'react';
import { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, AddCircle as PlusCircleIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import Chevron from 'react-chevron';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';


const Dashboard = () => {
  const navigate = useNavigate();
 // const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
  
    localStorage.clear();
   navigate('/');
    // Navigate to the login page

  };

  const [drawerOpen, setDrawerOpen] = useState(false);

const handleDrawerOpen = () => {
  setDrawerOpen(true);
};

const handleDrawerClose = () => {
  setDrawerOpen(false);
};



  return (
    <div>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <div>
          <Button color="inherit" onClick={handleMenuOpen}>
            {localStorage.getItem('user_name')}
            <Chevron direction={'down'} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            {/* Add more menu items here */}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>

    <Drawer variant="permanent" anchor="left" open={drawerOpen}>
      <div>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/apply">
          <ListItemIcon>
            <PlusCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Apply for Gatepass" />
        </ListItem>
      </List>
    </Drawer>

    {/* Content of the dashboard */}
    <div style={{ marginLeft: '240px', marginTop: '64px' }}>
      {/* Your content goes here */}
    </div>
  </div>
  );
};

export default Dashboard;