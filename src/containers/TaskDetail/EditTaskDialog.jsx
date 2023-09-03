import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import api from "../../apis";

const EditTaskDialog = ({
  open,
  onClose,
  initialStatus,
  initialProgress,
  taskId,
}) => {
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState("");

  // Use useEffect to set initial values when the component mounts
  useEffect(() => {
    setStatus(initialStatus);
    setProgress(initialProgress);
  }, [initialStatus, initialProgress]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  const handleSave = async () => {
    console.log(status, progress, taskId);
    const result = await api.task.updateTask(taskId, {
      status,
      progress,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginTop: "5%" }}
          label="Status"
          fullWidth
          value={status}
          onChange={handleStatusChange}
        />
        <TextField
          sx={{ marginTop: "8%" }}
          label="Progress"
          fullWidth
          type="number"
          value={progress}
          onChange={handleProgressChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
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
