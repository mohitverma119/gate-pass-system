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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import withAuthCheck from "../../checkAuth";


const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

const ViewSinglePass = ({ onBack, id }) => {
  const tokenJwt = localStorage.getItem("user_token"); // fetch token from localstorage

  const [formattedData, setData] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // go back to previous page
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
          leaving_purpose: result.leaving_purpose,
          leaving_date: result.leaving_date,
          leaving_time: result.leaving_time,
          returning_date: result.returning_date,
          pass_status: result.pass_status,
          warden_pass_status: result.warden_pass_status,
        };
        setData(formattedData);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <Card>
      {/*  <CardHeader
        title={
          <>
            <IconButton aria-label="Back" onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
            GatePass Details:
          </>
        }
      /> */}
      <CardHeader
        title={
          <Typography variant="h6" fontWeight="bold">
            <IconButton aria-label="Back" onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
            Pass Details:
          </Typography>
        }
        style={{ padding: "0" }}
      />{" "}
      {/*    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mango (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      {formattedData && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Gatepass Attribute</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(formattedData).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {key}
                  </TableCell>
                  <TableCell align="right">{String(value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default withAuthCheck(ViewSinglePass);
