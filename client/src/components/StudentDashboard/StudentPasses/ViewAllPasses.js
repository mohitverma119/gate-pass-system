import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Box,
  TableBody,
  Card,
  CardHeader,
  TextField,
  IconButton,
  TablePagination,
} from "@mui/material";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewSinglePass from "./ViewSinglePass"; // import the ViewSinglePass component
import { TableSortLabel } from "@mui/material";
import { Button, ButtonGroup } from "@mui/material";
import { Typography } from "@mui/material";
import withAuthCheck from "../../checkAuth";
/* const createData = (name, calories, fat, carbs, protein,id) => {
  return { name, calories, fat, carbs, protein,id };
}; */

/* const initialRows = [
  createData("Frozen yoghurt", 159, 6.0, 'Pending', 4.0,1),
  createData("Ice cream sandwich", 237, 9.0, 'Approved', 4.3,2),
  createData("Eclair", 262, 16.0, 'Rejected', 6.0,3),
]; */

const ViewAllPasses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewPass, setViewPass] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // add state to keep track of selected row id
  const [gatepasses, setGatepasses] = useState([]);
  const [originalGatepasses, setOriginalGatepasses] = useState([]);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [currentStatus, setCurrentStatus] = useState("all");

  useEffect(() => {
    const fetchGatepasses = async () => {
      const studentId = localStorage.getItem("user_id"); // fetch studentId from localstorage
      const token = localStorage.getItem("user_token"); // fetch token from localstorage

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/gatepasses/${studentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      const formattedData = data.map((item) => ({
        id: item.id,
        leaving_purpose: item.leaving_purpose,
        leaving_date: item.leaving_date,
        leaving_time: item.leaving_time,
        returning_date: item.returning_date,
        pass_status: item.pass_status,
        warden_pass_status: item.warden_pass_status,
      }));

      setGatepasses(formattedData);
      setOriginalGatepasses(formattedData);
    };

    fetchGatepasses();
  }, []);

  useEffect(() => {
    if (orderBy !== null) {
      setGatepasses((gatepasses) =>
        [...gatepasses].sort((a, b) => {
          if (a[orderBy] < b[orderBy]) {
            return order === "asc" ? -1 : 1;
          } else if (a[orderBy] > b[orderBy]) {
            return order === "asc" ? 1 : -1;
          } else {
            return 0;
          }
        })
      );
    }
  }, [orderBy, order]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const lowercasedValue = event.target.value.toLowerCase();

    if (lowercasedValue !== "") {
      const searchRows = originalGatepasses.filter((row) =>
        Object.values(row).some(
          (value) =>
            value && value.toString().toLowerCase().includes(lowercasedValue)
        )
      );
      setGatepasses(searchRows);
    } else {
      setGatepasses(originalGatepasses);
    }
    setPage(0);
  };

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
  };

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, gatepasses.length - page * rowsPerPage);

  const handleViewPass = (id) => {
    setViewPass(true);
    setSelectedId(id); // set selected row id
  };

  const handleBack = () => {
    setViewPass(false);
  };

  return (
    <>
      {viewPass ? (
        <ViewSinglePass onBack={handleBack} id={selectedId} />
      ) : (
        <Card elevation={3} variant="outlined">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              marginBottom: "20px",
              padding: "0 15px",
              marginTop: "20px",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  Passes Applied
                </Typography>
              }
              style={{ padding: "0" }}
            />{" "}
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <ButtonGroup
              size="small"
              variant="contained"
              aria-label="text button group"
            >
              <Button
                onClick={() => handleStatusChange("all")}
                color={currentStatus === "all" ? "primary" : "inherit"}
              >
                All
              </Button>
              <Button
                onClick={() => handleStatusChange("pending")}
                color={currentStatus === "pending" ? "warning" : "inherit"}
              >
                Pending
              </Button>
              <Button
                onClick={() => handleStatusChange("rejected")}
                color={currentStatus === "rejected" ? "error" : "inherit"}
              >
                Rejected
              </Button>
              <Button
                onClick={() => handleStatusChange("approved")}
                color={currentStatus === "approved" ? "success" : "inherit"}
              >
                Approved
              </Button>
            </ButtonGroup>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                sx={{ "& .MuiTableCell-root": { fontWeight: "bold" } }}
              >
                <TableRow>
                  <TableCell align="left">S.No</TableCell>
                  <TableCell align="left">
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={order}
                      onClick={createSortHandler("id")}
                    >
                      Pass Id
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">
                    <TableSortLabel
                      active={orderBy === "leaving_date"}
                      direction={order}
                      onClick={createSortHandler("leaving_date")}
                    >
                      Leaving Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">
                    <TableSortLabel
                      active={orderBy === "leaving_time"}
                      direction={order}
                      onClick={createSortHandler("leaving_time")}
                    >
                      Leaving Time
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">
                    <TableSortLabel
                      active={orderBy === "returning_date"}
                      direction={order}
                      onClick={createSortHandler("returning_date")}
                    >
                      Returning Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">
                    <TableSortLabel
                      active={orderBy === "leaving_purpose"}
                      direction={order}
                      onClick={createSortHandler("leaving_purpose")}
                    >
                      Reason
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">
                    <TableSortLabel
                      active={orderBy === "warden_pass_status"}
                      direction={order}
                      onClick={createSortHandler("warden_pass_status")}
                    >
                      Pass Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              {/*   <TableBody>
                {(rowsPerPage > 0
                  ? gatepasses.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : gatepasses
                ).map((gatepasses) => (
                  <TableRow
                    key={gatepasses.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {gatepasses.pass_status}
                    </TableCell>
                    <TableCell align="right">{gatepasses.pass_status}</TableCell>
                    <TableCell align="right">{gatepasses.pass_status}</TableCell>
                    <TableCell align="right">{gatepasses.pass_status}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="success"
                        size="small"
                        aria-label="View"
                        onClick={() => handleViewPass(gatepasses.id)}
                        >
                        <VisibilityIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="small"
                        aria-label="Edit"
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        sx={{ color: red[500] }}
                        size="small"
                        aria-label="Delete"
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody> */}

              <TableBody>
                {(rowsPerPage > 0
                  ? gatepasses
                  .filter((gatepass) => gatepass.pass_status !== "in-active")
                      .filter((gatepass) => {
                        if (currentStatus === "all") {
                          return true;
                        } else {
                          return gatepass.warden_pass_status === currentStatus;
                        }
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  : gatepasses
                ).map((gatepass, index) => (
                  <TableRow
                    key={gatepass.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {gatepass.id}
                    </TableCell>
                    <TableCell align="left">
                      {new Date(gatepass.leaving_date).toLocaleDateString()}
                    </TableCell>

                    <TableCell align="left">
                      {new Date(
                        `1970-01-01T${gatepass.leaving_time}Z`
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {new Date(gatepass.returning_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left">
                      {gatepass.leaving_purpose}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold" }}
                      align="left"
                      style={{
                        color:
                          gatepass.warden_pass_status === "approved"
                            ? "green"
                            : gatepass.warden_pass_status === "rejected"
                            ? "red"
                            : gatepass.warden_pass_status === "pending"
                            ? "orange"
                            : "black",
                      }}
                    >
                      {gatepass.warden_pass_status.charAt(0).toUpperCase() +
                        gatepass.warden_pass_status.slice(1)}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="success"
                        size="small"
                        aria-label="View"
                        onClick={() => handleViewPass(gatepass.id)}
                      >
                        <VisibilityIcon fontSize="inherit" />
                      </IconButton>
                      {gatepass.pass_status !== "completed" && (
                        <>
                          <IconButton
                            color="primary"
                            size="small"
                            aria-label="Edit"
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            sx={{ color: red[500] }}
                            size="small"
                            aria-label="Delete"
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={gatepasses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Card>
      )}
    </>
  );
};

export default withAuthCheck(ViewAllPasses);
