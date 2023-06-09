import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import WardenDashboard from "./components/WardenDashboard/WardenDashboard";
import ViewAllPasses from "./components/StudentDashboard/StudentPasses/ViewAllPasses";
import ViewSinglePass from "./components/StudentDashboard/StudentPasses/ViewSinglePass";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/warden-dashboard/*" element={<WardenDashboard />} />
        <Route path="/viewAllPasses" element={<ViewAllPasses />} />
        <Route path="/viewSinglePass" element={<ViewSinglePass />} />
      </Routes>
    </Router>
  );
};

export default App;
