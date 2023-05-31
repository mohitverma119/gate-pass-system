import React, { useState } from "react";
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
import ViewSinglePass from './ViewSinglePass'; // import the ViewSinglePass component

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const initialRows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Pizza", 285, 12.5, 35, 9.5),
  createData("Hamburger", 354, 19.2, 35, 12.4),
  createData("Hot Dog", 150, 8.2, 20, 5.5),
  createData("Sushi", 360, 10.0, 50, 15.0),
  createData("Steak", 420, 25.0, 0, 35.0),
  createData("Salad", 120, 5.0, 15, 7.0),
  createData("Pasta", 320, 8.0, 50, 10.0),
];

const ViewAllPasses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value !== "") {
      const searchRows = initialRows.filter((row) =>
        row.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setRows(searchRows);
    } else {
      setRows(initialRows);
    }
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
  
    <Card elevation={3} variant="outlined">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "20px", padding: "0 15px", marginTop: "20px" }}
      >
        <CardHeader title="All Applied Passes" style={{ padding: "0" }} />
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ "& .MuiTableCell-root": { fontWeight: "bold" } }}>
            <TableRow>
              <TableCell> (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">
                  <IconButton color="success" size="small" aria-label="View">
                    <VisibilityIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton color="primary" size="small" aria-label="Edit">
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
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Card>
  );
};

export default ViewAllPasses;
