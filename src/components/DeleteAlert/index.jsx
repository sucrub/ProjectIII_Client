import * as React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteAlertStyle from "./index.style";

const DeleteAlert = (props) => {
  const { open, onClose } = props;

  return (
    <DeleteAlertStyle open={open} onClose={onClose}>
      <DialogTitle className="dialog-title">
        <CancelOutlinedIcon className="cancel-icon" />
      </DialogTitle>
      <DialogContent className="dialog-content">
        <Typography className="content" variant="h5">
          Are you sure to delete this ?
        </Typography>
        <Typography className="sub-content" variant="subtitle2">
          Do you really want to delete this record? This process cannot be
          undone
        </Typography>
      </DialogContent>
      <DialogActions className="dialog-action">
        <Button variant="contained" color="error" onClick={onClose}>
          Delete
        </Button>
        <Button
          className="cancel-button"
          variant="contained"
          onClick={onClose}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </DeleteAlertStyle>
  );
};

export default DeleteAlert;
