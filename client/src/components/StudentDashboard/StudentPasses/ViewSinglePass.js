import React, { useState, useEffect } from "react";
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
import withAuthCheck from "../../checkAuth";
import QRCode from "qrcode.react";

const ViewSinglePass = ({ onBack, id }) => {
  const tokenJwt = localStorage.getItem("user_token"); // fetch token from localstorage
  const [formattedData, setData] = useState(null);

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
          pass_status: result.pass_status,
          warden_pass_status: result.warden_pass_status,
          hostel_name: result.hostel_name,
          course_name: result.course_name,
          fullname: result.fullname,
          block_no: result.block_no,
          room_no: result.room_no,
          address: result.address,
          contact_no: result.contact_no,
          reject_reason: result.reject_reason,
        };
        setData(formattedData);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <Card>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              <IconButton aria-label="Back" onClick={onBack}>
                <ArrowBackIcon />
              </IconButton>
              Pass Details
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              align="left"
              style={{
                marginLeft: "auto",
                marginRight: "20px",
                color:
                  formattedData?.warden_pass_status === "approved"
                    ? "green"
                    : formattedData?.warden_pass_status === "rejected"
                    ? "red"
                    : formattedData?.warden_pass_status === "pending"
                    ? "orange"
                    : "black",
              }}
            >
              <span style={{ color: "#000" }}>Pass Status:</span>{" "}
              {formattedData?.warden_pass_status.charAt(0).toUpperCase() +
                formattedData?.warden_pass_status.slice(1)}
            </Typography>
          </div>
        }
        style={{ padding: "0" }}
      />{" "}
         {formattedData && formattedData.warden_pass_status === "rejected" && (
        <Box m={2}>
          <Alert severity="error">
            <Typography fontWeight="bold">Rejected Reason:</Typography>
            <Typography>{formattedData.reject_reason}</Typography>
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

                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <QRCode
                      value={JSON.stringify({ pass_id: formattedData.id })}
                      size={128} // Or any other size you want
                      level={"H"} // Error correction level, can be L, M, Q, H. Higher means more robust QR codes but also more complex image
                    />
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
