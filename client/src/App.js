import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard  from './components/Dashboard/Dashboard';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;