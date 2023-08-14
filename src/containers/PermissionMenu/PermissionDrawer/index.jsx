import React, { useState } from "react";
import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import PermissionDrawerStyle from "./index.style";
import PERMISSION_TYPE from "../../../constants/permissionType";

const PermissionDrawer = (props) => {
  const { open, onClose, title, value } = props;
  return (
    <PermissionDrawerStyle anchor="right" open={open} onClose={onClose}>
      <Box className="drawer">
        <Typography className="title" variant="h4" color="primary">
          {title}
        </Typography>
      </Box>
      <TextField
        required
        id="name"
        label="Permission name"
        autoFocus
        className="text-field"
        value={value?.name}
      />
      <TextField
        required
        id="url"
        label="Permission url"
        className="text-field"
        value={value?.url}
      />
      <TextField
        required
        id="method"
        label="Permission method"
        className="text-field"
        value={value?.method}
      />
      <FormControl className="text-field">
        <InputLabel id="type">Type</InputLabel>
        <Select labelId="type" label="Type" value={value?.type || ""}>
          {Object.entries(PERMISSION_TYPE).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button className="submit-button" variant="contained">
        Submit
      </Button>
    </PermissionDrawerStyle>
  );
};

export default PermissionDrawer;
