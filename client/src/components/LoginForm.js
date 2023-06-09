import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginEmail, setEmail] = useState("nisha@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        { loginEmail, password }
      );

      const userData = response.data;

      // Store the user data in local storage if it exists
      if (userData) {
        const { token, id, email, entry_emp_no, fullname, role } = userData;

        localStorage.setItem("user_token", token);
        localStorage.setItem("user_id", id);
        localStorage.setItem("user_email", email);
        localStorage.setItem("entry_emp_no", entry_emp_no);
        localStorage.setItem("user_name", fullname);
        localStorage.setItem("user_role", role);

        // Redirect based on user role
        switch (role) {
          case "student":
            navigate("/student-dashboard");
            break;
          case "warden":
            navigate("/warden-dashboard");
            break;
          case "director":
            navigate("/director-dashboard");
            break;
          default:
            navigate("/");
            break;
        }
      }

    } catch (error) {
      console.error("Error sending login request:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 16,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "300px",
        }}
      >
        <TextField
          label="Email"
          type="email"
          value={loginEmail}
          onChange={handleEmailChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          fullWidth
        />
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
