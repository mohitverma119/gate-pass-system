import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your backend server URL

const LoginForm = () => {
  const [loginEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleLogin = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    //alert('dd');

    try {
      
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, { loginEmail, password });

      //console.log(response.data);
  
      const { token,id, email, entry_emp_no, fullname, hostel_id, course_id, role } = response.data;

      // Store the token, email and role in local storage or as needed for future requests
      localStorage.setItem('user_token', token);
      localStorage.setItem('user_id', id);
      localStorage.setItem('user_email', email);
      localStorage.setItem('entry_emp_no', entry_emp_no);
      localStorage.setItem('user_name', fullname);
      localStorage.setItem('user_role', role);

      // Handle successful login, such as redirecting to the dashboard
      // or updating the UI state
      // Redirect the user to a protected route or update the application state
      // For example, you can use react-router-dom to navigate to a different page
      navigate('/student-dashboard');
    } catch (error) {
      console.error('Error sending login request:', error);
      setError('Invalid email or password');
      //setError('Original Error: ',error);
    }
  };



  /*const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      const { token, email, role } = response.data;
  
      // Store the token, email and role in local storage or as needed for future requests
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);
  
      // Handle successful login, such as redirecting to the dashboard
      // or updating the UI state
      // Redirect the user to a protected route or update the application state
      // For example, you can use react-router-dom to navigate to a different page
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };*/



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 16 }}>
    <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
      Login
    </Typography>
    {error && <Typography color="error">{error}</Typography>}
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}
    >
      <TextField
        label="Email"
        type="email"
        value={loginEmail || "admin@example.com"}
        onChange={handleEmailChange}
        required
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password || "password"}
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
