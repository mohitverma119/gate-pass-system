import React, { useState } from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
import {
  Home as HomeIcon,
} from "@mui/icons-material";

import EditNoteIcon from "@mui/icons-material/EditNote";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const buttonActiveColor = "#a9a7ac9c";

const DrawerContent = ({ setDrawerOpen, handleItemClick, isMobile }) => {
  const [activeButton, setActiveButton] = useState("home");

  // const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    // Navigate to the login page
  };

  const handleClick = (item) => {
    setActiveButton(item);
    handleItemClick(item);

    if (isMobile) {
      // Close the drawer with a slight delay
      setTimeout(() => {
        setDrawerOpen(false);
      }, 50); // 50 milliseconds delay
    }
  };

  return (
    <Box sx={{ width: drawerWidth, marginTop: 4  }} role="presentation">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
       {/* <img
          src="https://www.smvdu.ac.in/templates/jsmvdu2017/img/bklogo-headerg20.png"
          alt="Logo"
          style={{ width: "65%", height: "auto" }}
      />*/}
      </Box>
      <List>
        <ListItemButton
          button
          key="Home"
          onClick={() => handleClick("home")}
          sx={{
            backgroundColor:
              activeButton === "home" ? buttonActiveColor : "inherit",
            "&:hover": {
              backgroundColor:
                activeButton === "home" ? buttonActiveColor : "#F0F0F0",
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          button
          key="Apply"
          onClick={() => handleClick("apply")}
          sx={{
            backgroundColor:
              activeButton === "apply" ? buttonActiveColor : "inherit",
            "&:hover": {
              backgroundColor:
                activeButton === "apply" ? buttonActiveColor : "#F0F0F0",
            },
          }}
        >
          <ListItemIcon>
            <EditNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Apply New Pass" />
        </ListItemButton>
        <ListItemButton
          button
          key="ViewAllPasses"
          onClick={() => handleClick("viewAllPasses")}
          sx={{
            backgroundColor:
              activeButton === "viewAllPasses" ? buttonActiveColor : "inherit",
            "&:hover": {
              backgroundColor:
                activeButton === "viewAllPasses"
                  ? buttonActiveColor
                  : "#F0F0F0",
            },
          }}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="View All Passes" />
        </ListItemButton>
        <ListItemButton
          button
          key="MyProfile"
          onClick={() => handleClick("myProfile")}
          sx={{
            backgroundColor:
              activeButton === "myProfile" ? buttonActiveColor : "inherit",
            "&:hover": {
              backgroundColor:
                activeButton === "myProfile" ? buttonActiveColor : "#F0F0F0",
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
        <ListItemButton
          button
          key="Logout"
          onClick={handleLogout}
          sx={{
            backgroundColor:
              activeButton === "logoutButton" ? buttonActiveColor : "inherit",
            "&:hover": {
              backgroundColor:
                activeButton === "logoutButton" ? buttonActiveColor : "#F0F0F0",
            },
          }}
        >
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default DrawerContent;
