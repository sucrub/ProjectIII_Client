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
import api from "../../apis";
import { useHistory } from "react-router-dom";

const DeleteAlert = (props) => {
  const { deleteValue, open, onClose, type } = props;

  const history = useHistory();

  console.log(deleteValue);

  const handleDelete = async () => {
    if (type === "permission") {
      const result = await api.permission.deletePermission(deleteValue);
      console.log(result);
    }
    if (type === "admin") {
      const result = await api.admin.deleteAdmin(deleteValue);
      console.log(result);
    }
    if (type === "role") {
      const result = await api.role.deleteRole(deleteValue);
      console.log(result);
    }
    if (type === "task") {
      const result = await api.task.deleteTask(deleteValue);
      console.log(result);
    }
    if (type === "member") {
      const result = await api.campaign.deleteMember(deleteValue);
      console.log(result);
    }
    if (type === "campaign") {
      const result = await api.campaign.deleteCampaign(deleteValue);
      console.log(result);
      history.push("/");
      window.location.reload();
    }
    onClose();
  };

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
        <Button variant="contained" color="error" onClick={handleDelete}>
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
