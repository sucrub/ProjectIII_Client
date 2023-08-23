import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import PermissionDrawerStyle from "./index.style";
import api from "../../../apis";

const PermissionDrawer = (props) => {
  const { open, onClose, title, value } = props;

  const [formValues, setFormValues] = useState({
    name: "",
    url: "",
    method: "",
    type: "",
  });

  useEffect(() => {
    setFormValues({
      name: value?.name || "",
      url: value?.url || "",
      method: value?.method || "",
      type: value?.type || "",
    });
  }, [value]);

  const handleSubmit = async () => {
    if (title === "Update permission") {
      const result = await api.permission.updatePermission(
        formValues,
        value.id
      );
      console.log(result);
    } else {
      const result = await api.permission.addPermission(formValues);
      console.log(result);
    }
    console.log(formValues);
    onClose();
  };

  // Function to update form values
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

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
        value={formValues.name}
        onChange={handleInputChange}
      />
      <TextField
        required
        id="url"
        label="Permission url"
        className="text-field"
        value={formValues.url}
        onChange={handleInputChange}
      />
      <TextField
        required
        id="method"
        label="Permission method"
        className="text-field"
        value={formValues.method}
        onChange={handleInputChange}
      />
      <TextField
        required
        id="type"
        label="Permission type"
        className="text-field"
        value={formValues.type}
        onChange={handleInputChange}
      />
      <Button
        className="submit-button"
        variant="contained"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </PermissionDrawerStyle>
  );
};

export default PermissionDrawer;
