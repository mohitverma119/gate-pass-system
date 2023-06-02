import React, { useState } from "react";
import dayjs from "dayjs";
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
            value={localStorage.getItem("user_name")}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2, width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Entry No"
            variant="outlined"
            value={localStorage.getItem("entry_emp_no")}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2, width: "100%" }}
          />
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              /*defaultValue={dayjs("2022-04-17")}*/
              label="Leaving Date"
              variant="outlined"
              sx={{ mb: 2, width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              /*defaultValue={dayjs("2022-04-17T15:30")}*/
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
