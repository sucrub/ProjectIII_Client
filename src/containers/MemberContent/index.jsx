import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; // Import icons

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Manager",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    role: "Engineer",
  },
  {
    id: 5,
    name: "Eva White",
    email: "eva@example.com",
    role: "Tester",
  },
  {
    id: 6,
    name: "Sam Green",
    email: "sam@example.com",
    role: "Designer",
  },
  // Add more members as needed
];

function MemberContent() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (id) => {
    console.log("Edit", id);
  };

  const handleDeleteClick = (id) => {
    console.log("Delete", id);
  };

  const displayedMembers = members.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <Typography variant="h4">Member List</Typography>
      <TableContainer sx={{ width: "60vw" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(member.id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(member.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default MemberContent;
