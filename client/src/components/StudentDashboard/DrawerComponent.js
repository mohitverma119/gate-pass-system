import React, { useState } from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

import EditNoteIcon from "@mui/icons-material/EditNote";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const buttonActiveColor = "#a9a7ac9c";

const DrawerContent = ({ path, setDrawerOpen, isMobile }) => {
  const [activeButton, setActiveButton] = useState("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    // Navigate to the login page
  };

  const handleClick = (item) => {
    setActiveButton(item);

    switch (item) {
      case "home":
        navigate(`${path}`);
        break;
      case "apply":
        navigate(`${path}/apply-new-pass`);
        break;
      case "viewAllPasses":
        navigate(`${path}/view-all-passes`);
        break;
      case "myProfile":
        navigate(`${path}/my-profile`);
        break;
      default:
        break;
    }

    if (isMobile) {
      setTimeout(() => {
        setDrawerOpen(false);
      }, 50);
    }
  };

  return (
    <Box sx={{ width: drawerWidth, marginTop: 4 }} role="presentation">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      ></Box>
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
