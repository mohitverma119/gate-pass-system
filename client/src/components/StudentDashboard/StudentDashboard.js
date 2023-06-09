import React, { useState, useEffect } from "react";
import { Drawer, Box } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DrawerContent from "./DrawerComponent";
import ApplyNewPass from "./StudentPasses/ApplyNewPass";
import ViewAllPasses from "./StudentPasses/ViewAllPasses";
import MyProfile from "../MyProfile";
import CustomAppBar from "../Common/DashboardAppBar";
import StudentHome from "./StudentHome";
import ViewSinglePass from "./StudentPasses/ViewSinglePass";

const drawerWidth = 240;

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let basePath = "/student-dashboard"; // Default value

  useEffect(() => {
    // Redirect to the base path if the current path is undefined
    if (location.pathname === `${basePath}/undefined`) {
      navigate(basePath);
    }
  }, [location.pathname, navigate, basePath]);

  const [drawerOpen, setDrawerOpen] = useState(true);
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
          path={basePath}
          isMobile={isMobile}
          setDrawerOpen={setDrawerOpen}
        />
      </Drawer>

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
        <Routes>
          <Route path="/" element={<StudentHome />} /> {/* Added this */}
          <Route path={`apply-new-pass`} element={<ApplyNewPass />} />
          <Route path={`view-all-passes`} element={<ViewAllPasses />} />
          <Route path={`view-single-pass/:id`} element={<ViewSinglePass />} />
          <Route path={`my-profile`} element={<MyProfile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
