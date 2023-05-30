import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Label } from "@mui/icons-material";

const MyProfile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Profile
      </Typography>
      <TextField
        label="Full Name"
        variant="outlined"
        value={localStorage.getItem("user_name")}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={localStorage.getItem("user_email")}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label={
          localStorage.getItem("role") === "student"
            ? "Entry No"
            : "Employee Code"
        }
        variant="outlined"
        value={localStorage.getItem("entry_emp_no")}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Department"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
      />
      <Button variant="contained" color="primary">
        Change Password
      </Button>
    </Box>
  );
};

export default MyProfile;
