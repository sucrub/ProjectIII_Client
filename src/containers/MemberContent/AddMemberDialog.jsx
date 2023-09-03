import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const AddMemberDialog = ({ open, onClose, onAddMember }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleAddClick = () => {
    // Perform validation if needed
    onAddMember({ email, role });
    setEmail("");
    setRole("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={handleRoleChange}>
            <MenuItem value="owner">Owner</MenuItem>
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddClick} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
