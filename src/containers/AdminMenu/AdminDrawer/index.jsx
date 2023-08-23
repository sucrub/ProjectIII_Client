import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import AdminDrawerStyle from "./index.style";
import api from "../../../apis";
import isEmail from "validator/lib/isEmail";

const AdminDrawer = (props) => {
  const { open, onClose } = props;

  // State to store email input
  const [email, setEmail] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!isEmail(email)) {
      console.log("This is not an email");
    } else {
      const res = await api.admin.addAdmin({ email: email });
      console.log(res);
    }
    setEmail("");
    onClose();
    // Add further logic here, such as submitting the email to an API or performing other actions
  };

  return (
    <AdminDrawerStyle anchor="right" open={open} onClose={onClose}>
      <Box className="drawer">
        <Typography className="title" variant="h4" color="primary">
          Add admin
        </Typography>
      </Box>
      <TextField
        required
        id="email"
        label="Email"
        autoFocus
        className="text-field"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button
        variant="contained"
        className="submit-button"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </AdminDrawerStyle>
  );
};

export default AdminDrawer;
