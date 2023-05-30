import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import DrawerContent from "./DrawerComponent";
import ApplyNewPass from "./ApplyNewPass";
import ViewAllPasses from "./ViewAllPasses";
import MyProfile from "../MyProfile";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    // Navigate to the login page
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: drawerOpen ? `${drawerWidth}px` : "0",
          transition: "0.5s",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Students Gate Pass
          </Typography>
          <div>
            <Button
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Typography
                variant="body1"
                sx={{
                  flexGrow: 1,
                  marginRight: 1,
                  fontSize: "20px",
                  textTransform: "capitalize",
                }}
              >
                {localStorage.getItem("user_name")}
              </Typography>

              <AccountCircle />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              KeepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {/*<MenuItem onClick={handleClose}>My Profile</MenuItem>*/}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerContent
          setDrawerOpen={setDrawerOpen}
          handleItemClick={handleItemClick}
        />
      </Drawer>
      <Box
        // component="main"
        // sx={{ flexGrow: 1, p: 3, mt: 12 }} // Added a margin top of 12 units

        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          marginLeft: drawerOpen ? `0px` : `-${drawerWidth}px`,
          transition: "0.5s",
        }}
      >
        {activeItem === "home" && <div>Home Content</div>}
        {activeItem === "apply" && <ApplyNewPass />}
        {activeItem === "viewAllPasses" && <ViewAllPasses />}
        {activeItem === "myProfile" && <MyProfile />}
      </Box>
    </Box>
  );
};

export default Dashboard;
