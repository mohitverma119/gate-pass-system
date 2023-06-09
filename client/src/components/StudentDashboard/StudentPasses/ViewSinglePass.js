import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from 'react-router-dom';

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardHeader,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CheckCircleOutlined } from "@mui/icons-material";
import withAuthCheck from "../../checkAuth";
import QRCode from "qrcode.react";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

const ViewSinglePass = () => {

  const { id } = useParams();

  const location = useLocation();
  //const id = location.state.id;
  console.log(id);
  const navigate = useNavigate();

  const tokenJwt = localStorage.getItem("user_token"); // fetch token from localstorage
  const [formattedData, setData] = useState(null);

  const convertToFormattedDateTime = (datetimeStr) => {
    const datetime = new Date(datetimeStr);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return datetime.toLocaleString("en-GB", options);
  };

  const handleBack = () => {
    navigate(-1);

  };


  const handlePrint = () => {
    const printButton = document.getElementById("print-button");
    const backButton = document.getElementById("back-button");
    const backButtonTop = document.getElementById("single-pass-back-button");
    const drawer = document.querySelector(".MuiDrawer-root");

    if (printButton) {
      printButton.style.display = "none"; // Hide the print button
      backButton.style.display = "none"; // Hide the back button
      backButtonTop.style.display = "none"; // Hide the back button
    }

    if (drawer) {
      drawer.style.display = "none"; // Hide the nav drawer
    }

    // Set CSS styles for A4 page layout
    const style = document.createElement("style");
    style.innerHTML = `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
      
      }
    `;
    document.head.appendChild(style);

    window.print(); // Print the page

    setTimeout(() => {
      if (drawer) {
        drawer.style.display = "block"; // Show the nav drawer again after printing
      }
      if (printButton) {
        printButton.style.display = "inline-flex"; // Show the print button again after printing
      }
      if (backButton) {
        backButton.style.display = "inline-flex"; // Show the back button again after printing
      }
      if (backButtonTop) {
        backButtonTop.style.display = "inline-flex"; // Show the back button again after printing
      }
      document.head.removeChild(style); // Remove the CSS styles for A4 page layout
    }, 100); // Delay to show the nav drawer and print button after printing (100 milliseconds)
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/singlegatepass/${id}`, {
      headers: {
        Authorization: `${tokenJwt}`, // replace yourToken with the actual token
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const formattedData = {
          id: result.id,
          entry_no: result.entry_emp_no,
          leaving_purpose: result.leaving_purpose,
          leaving_date: result.leaving_date,
          leaving_time: result.leaving_time,
          returning_date: result.returning_date,
          dept_pass_status: result.dept_pass_status,
          pass_status: result.pass_status,
          warden_pass_status: result.warden_pass_status,
          hostel_name: result.hostel_name,
          course_name: result.course_name,
          fullname: result.fullname,
          block_no: result.block_no,
          room_no: result.room_no,
          address: result.address,
          contact_no: result.contact_no,
          rejected_by: result.rejected_by,
          reject_reason: result.reject_reason,
          security_clearance: result.security_clearance,
          security_clearance_datetime: result.security_clearance_datetime,
        };
        setData(formattedData);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <Card>
      <CardHeader
        title={
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              <IconButton
                aria-label="Back"
                onClick={handleBack}
                color="#000"
                id="single-pass-back-button"
                style={{ borderRadius: "50%" }}
              >
                <ArrowBackIcon />
              </IconButton>
              Gate Pass Details
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                ml: { xs: "0", sm: "auto" },
                mr: { xs: "0", sm: "20px" },
                color:
                  formattedData?.dept_pass_status === "approved"
                    ? "green"
                    : formattedData?.dept_pass_status === "rejected"
                    ? "red"
                    : formattedData?.dept_pass_status === "pending"
                    ? "orange"
                    : "black",
              }}
              align="left"
            >
              <span style={{ color: "#000" }}>HOD Remarks:</span>{" "}
              {formattedData?.dept_pass_status.charAt(0).toUpperCase() +
                formattedData?.dept_pass_status.slice(1)}
            </Typography>
          </Box>
        }
        style={{ paddingTop: "10px" }}
      />
      <CardHeader
        title={
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                ml: { xs: "0", sm: "auto" },
                mr: { xs: "0", sm: "20px" },
                color:
                  formattedData?.warden_pass_status === "approved"
                    ? "green"
                    : formattedData?.warden_pass_status === "rejected"
                    ? "red"
                    : formattedData?.warden_pass_status === "pending"
                    ? "orange"
                    : "black",
              }}
              align="left"
            >
              <span style={{ color: "#000" }}>Warden's Remarks:</span>{" "}
              {formattedData?.dept_pass_status === "rejected"
                ? "N/A"
                : formattedData?.warden_pass_status.charAt(0).toUpperCase() +
                  formattedData?.warden_pass_status.slice(1)}
            </Typography>
          </Box>
        }
        style={{ marginTop: "-35px" }} //Changed marginTop to paddingTop to give space from the above CardHeader
      />{" "}
      {formattedData &&
        (formattedData?.warden_pass_status === "rejected" ||
          formattedData?.dept_pass_status === "rejected") && (
          <Box mt={-2} p={1}>
            <Alert severity="error">
              <Typography fontWeight="bold">
                Rejected by:{" "}
                {formattedData?.rejected_by.toUpperCase()}
              </Typography>
              <Typography>Reason: {formattedData?.reject_reason}</Typography>
            </Alert>
          </Box>
        )}
      {formattedData && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TableContainer component={Paper} sx={{ border: "1px solid #bbb" }}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">GatePass ID</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{formattedData.id}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">Full Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{formattedData.fullname}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">Entry No</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>
                      {formattedData.entry_no.toUpperCase()}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">Hostel Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{formattedData.hostel_name}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">Course Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{formattedData.course_name}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">Block & Room No</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>
                      {formattedData.block_no} {formattedData.room_no}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">Leaving Purpose</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{formattedData.leaving_purpose}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">Permanent Address</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{formattedData.address}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">
                      Leaving Date and Time
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>
                      {new Date(formattedData.leaving_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                      ,{" "}
                      {new Date(
                        `1970-01-01T${formattedData.leaving_time}Z`
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    <Typography fontWeight="bold">Contact No</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{formattedData.contact_no}</Typography>
                  </TableCell>
                </TableRow>

                {formattedData?.warden_pass_status === "approved" ? (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      <Typography fontWeight="bold">
                        Security Clearance
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CheckCircleOutlined
                          style={{ color: "green", marginRight: "5px" }}
                        />
                        <Typography>
                          {formattedData?.security_clearance
                            .charAt(0)
                            .toUpperCase() +
                            formattedData?.security_clearance.slice(1)}{" "}
                          on{" "}
                          {convertToFormattedDateTime(
                            formattedData?.security_clearance_datetime
                          )}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      <Typography fontWeight="bold">
                        Security Clearance at Gate
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography style={{ color: "red", fontWeight: "bold" }}>
                        {formattedData?.security_clearance
                          .charAt(0)
                          .toUpperCase() +
                          formattedData?.security_clearance.slice(1)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <QRCode
                      value={JSON.stringify({ pass_id: formattedData.id })}
                      size={128} // Or any other size you want
                      level={"H"} // Error correction level, can be L, M, Q, H. Higher means more robust QR codes but also more complex image
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <Button
                      variant="contained"
                      id="print-button"
                      startIcon={<PrintIcon />}
                      onClick={handlePrint}
                    >
                      Print
                    </Button>
                    <span> </span>
                    <Button
                      variant="contained"
                      id="back-button"
                      color="success"
                      startIcon={<ArrowBackIcon />}
                      onClick={handleBack}
                    >
                      Go Back
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Card>
  );
};

export default withAuthCheck(ViewSinglePass);
