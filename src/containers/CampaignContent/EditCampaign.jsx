import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const EditDialog = ({ isOpen, onClose, onSave, initialData }) => {
  const [editedTitle, setEditedTitle] = useState(initialData.title || "");
  const [editedContent, setEditedContent] = useState(initialData.content || "");
  const [editedStatus, setEditedStatus] = useState(initialData.status || "");

  useEffect(() => {
    setEditedTitle(initialData.title || "");
    setEditedContent(initialData.content || "");
    setEditedStatus(initialData.status || "");
  }, [initialData]);

  const handleSaveChanges = () => {
    onSave({
      title: editedTitle,
      content: editedContent,
      status: editedStatus,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Campaign</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <TextField
          label="Status"
          fullWidth
          value={editedStatus}
          onChange={(e) => setEditedStatus(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          style={{ marginTop: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
