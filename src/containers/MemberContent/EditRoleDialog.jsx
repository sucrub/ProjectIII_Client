import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import api from "../../apis";

const EditRoleDialog = ({
  open,
  onClose,
  currentRole,
  onSave,
  userId,
  campaignId,
}) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSaveClick = async () => {
    onSave(selectedRole);
    const result = await api.campaign.changeMemberRole({
      userId,
      campaignId,
      role: selectedRole,
    });
    console.log(result);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User Role</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select value={selectedRole} onChange={handleRoleChange}>
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
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoleDialog;
