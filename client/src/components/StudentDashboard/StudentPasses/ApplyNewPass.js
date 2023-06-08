import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/en-gb';
import { Button, TextField, Box, Typography, Grid } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Label } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import withAuthCheck from "../../checkAuth";

const ApplyNewPass = () => {
  const [roomNo, setRoomNo] = useState("");
  const [blockNo, setBlockNo] = useState("");
  const [leavingPurpose, setLeavingPurpose] = useState("");
  const [hostels, setHostels] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // New state variable for the selected course
  const [selectedHostel, setSelectedHostel] = useState(""); // New state variable for the selected hostel
  const [leavingDate, setLeavingDate] = useState(null);

  useEffect(() => {
    const fetchHostelsAndCourses = async () => {
      const token = localStorage.getItem("user_token"); // fetch token from localstorage

      const responseHostels = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/hostels`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const responseCourses = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/allcourses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const dataHostels = await responseHostels.json();
      const dataCourses = await responseCourses.json();

      setHostels(dataHostels);
      setCourses(dataCourses);
    };

    fetchHostelsAndCourses();
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleHostelChange = (event) => {
    setSelectedHostel(event.target.value); // New handler for hostel selection
  };

  const handleLeavingDateChange = (date) => {
    setLeavingDate(date);
  };

  const handleRoomNo = (event) => {
    setRoomNo(event.target.value);
  };

  const handleBlockNo = (event) => {
    setBlockNo(event.target.value);
  };

  const handleLeavingPurpose = (event) => {
    setLeavingPurpose(event.target.value);
  };
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
      <Typography variant="h5" sx={{ mb: 4 }}>
        Apply for New Gate Pass
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name"
            variant="outlined"
            required
            value={localStorage.getItem("user_name")}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2, width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Entry No"
            variant="outlined"
            required
            value={localStorage.getItem("entry_emp_no")}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2, width: "100%" }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="course-select-label">Course Name</InputLabel>
            <Select
              labelId="course-select-label"
              id="course-select"
              label="Course Name"
              value={selectedCourse}
              onChange={handleCourseChange}
              sx={{ mb: 2, width: "100%" }}
              required
            >
              {courses
                .sort((a, b) => a.course_name.localeCompare(b.course_name))
                .map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.course_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="hostel-select-label">Hostel Name</InputLabel>
            <Select
              labelId="hostel-select-label"
              id="hostel-select"
              label="Hostel Name"
              value={selectedHostel}
              onChange={handleHostelChange}
              sx={{ mb: 2, width: "100%" }}
              required
            >
              {hostels
                .sort((a, b) => a.hostel_name.localeCompare(b.hostel_name))
                .map((hostel) => (
                  <MenuItem key={hostel.id} value={hostel.id}>
                    {hostel.hostel_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Room No"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            type="text"
            value={roomNo}
            onChange={handleRoomNo}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="block-no-select-label">Block No</InputLabel>
            <Select
              labelId="block-no-select-label"
              id="block-no-select"
              value={blockNo}
              label="Block No"
              onChange={handleBlockNo}
              sx={{ mb: 2, width: "100%" }}
              required
            >
              <MenuItem value={"A"}>A</MenuItem>
              <MenuItem value={"B"}>B</MenuItem>
              <MenuItem value={"C"}>C</MenuItem>
              <MenuItem value={"D"}>D</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contact No"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Purpose of Leaving"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            type="text"
            value={leavingPurpose}
            onChange={handleLeavingPurpose}
            required
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <DatePicker
              label="Leaving Date"
              value={leavingDate}
              onChange={handleLeavingDateChange}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
              sx={{ mb: 2, width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
           
              label="Leaving Time"
              variant="outlined"
              sx={{ mb: 2, width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <TextField
        id="outlined-multiline-static"
        label="Permanent Address"
        sx={{ mb: 2, width: "100%" }}
        variant="outlined"
        multiline
        rows={4}
        required
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
      <Button size="large" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default withAuthCheck(ApplyNewPass);
