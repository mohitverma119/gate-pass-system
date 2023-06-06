import React, { useState, useEffect } from "react";
import { Drawer, Box } from "@mui/material";
import DrawerContent from "./WardenDrawer";
import MyProfile from "../MyProfile";
import WardenHome from "./WardenHome";
import ViewAllPasses from "./WardenPasses/ViewAllPasses";
import CustomAppBar from "../Common/DashboardAppBar";
import withAuthCheck from "../checkAuth";

const drawerWidth = 240;

const WardenDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("home");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Listen for window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CustomAppBar handleDrawerToggle={handleDrawerToggle} />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={drawerOpen}
      >
        <DrawerContent
          isMobile={isMobile}
          setDrawerOpen={setDrawerOpen}
          handleItemClick={handleItemClick}
        />
      </Drawer>
      {/* <Drawer
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
      </Drawer> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          marginLeft: isMobile
            ? "0px"
            : drawerOpen
            ? "0px"
            : `-${drawerWidth}px`,
          transition: "0.5s",
        }}
      >
        {activeItem === "home" && <WardenHome />}
        {/*   {activeItem === "apply" && <ApplyNewPass />}*/}
        {activeItem === "viewAllPasses" && <ViewAllPasses />}
        {activeItem === "myProfile" && <MyProfile />}
      </Box>
    </Box>
  );
};

export default withAuthCheck(WardenDashboard);
