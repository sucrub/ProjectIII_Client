import React, { useState, useEffect } from "react";
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
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../../apis";
import { Edit, Delete } from "@mui/icons-material";
import EditRoleDialog from "./EditRoleDialog";
import DeleteAlert from "../../components/DeleteAlert";
import AddMemberDialog from "./AddMemberDialog";

const MemberContent = () => {
  const { campaignId } = useParams();
  const [memberData, setMemberData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const getMemberData = async () => {
    const result = await api.campaign.getAllMember(campaignId);
    console.log(result.result.members);
    setMemberData(result.result.members);
  };

  useEffect(() => {
    getMemberData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditRoleClick = (userId, currentRole) => {
    setSelectedUserId(userId);
    setSelectedUserRole(currentRole);
    setIsEditRoleDialogOpen(true);
  };

  const handleEditRoleSave = (newRole) => {
    console.log("Save Role", selectedUserId, newRole);
  };

  const handleDeleteClick = (id) => {
    handleOpenDeleteAlert({
      userId: id,
      campaignId,
    });
  };

  const handleOpenDeleteAlert = (data) => {
    setDeleteData(data);
    setDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
    getMemberData();
  };

  const handleCloseEditRole = () => {
    getMemberData();
    setIsEditRoleDialogOpen(false);
  };

  const handleAddMemberClick = () => {
    setIsAddMemberDialogOpen(true);
  };

  const handleAddMember = async ({ email, role }) => {
    // Perform the action to add a member with the provided email and role
    // You can send an API request here if needed
    const result = await api.campaign.addMember({
      email,
      role,
      campaignId,
    });
    console.log(result);
    getMemberData();
  };

  const handleCloseAddMember = () => {
    setIsAddMemberDialogOpen(false);
  };

  // Conditional rendering: Render the component only when memberData is not empty
  if (memberData.length === 0) {
    return (
      <div>
        <Typography variant="h4">Member List</Typography>
        <p>No members found.</p>
      </div>
    );
  }

  const displayedMembers = memberData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <DeleteAlert
        type="member"
        deleteValue={deleteData}
        open={deleteAlert}
        onClose={handleCloseDeleteAlert}
      />
      <Typography variant="h4">Member List</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddMemberClick}
      >
        Add Member
      </Button>
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
                <TableCell>
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditRoleClick(member.id, member.role)}
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
        count={memberData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EditRoleDialog
        open={isEditRoleDialogOpen}
        onClose={handleCloseEditRole}
        currentRole={selectedUserRole} // Pass the current role as a prop
        userId={selectedUserId}
        campaignId={campaignId}
        onSave={handleEditRoleSave}
      />
      <AddMemberDialog
        open={isAddMemberDialogOpen}
        onClose={handleCloseAddMember}
        onAddMember={handleAddMember}
      />
    </div>
  );
};

export default MemberContent;
