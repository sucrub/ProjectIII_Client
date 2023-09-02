import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditTaskDialog = ({ open, onClose, initialStatus, initialProgress }) => {
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState(initialProgress);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  const handleSave = () => {
    // Perform the save/update action with status and progress
    // You can send an API request here if needed
    // Close the dialog when done
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Status"
          fullWidth
          value={status}
          onChange={handleStatusChange}
        />
        <TextField
          label="Progress"
          fullWidth
          value={progress}
          onChange={handleProgressChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
