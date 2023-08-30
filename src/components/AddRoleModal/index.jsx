import React, { useState } from "react";
import {
  Box,
  Drawer,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Grid,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import AddRoleModalStyle from "./index.style";
import api from "../../apis";

const AddRoleModal = (props) => {
  const { open, onClose } = props;

  const [roleName, setRoleName] = useState("");

  const handleSubmit = async () => {
    const result = await api.role.addRole({ name: roleName });
    console.log(result);
    onClose();
  };

  const handleDelete = () => {
    setRoleName("");
  };
  return (
    <AddRoleModalStyle>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Button
          onClick={() => setOpenAddRole(false)}
          className="close-btn"
          sx={{ ml: "auto", color: "inherit" }}
        >
          <ClearIcon align="right" />
        </Button>
        <Box className="drawer" sx={{ width: "25vw" }}>
          <Typography
            variant="h4"
            color="primary"
            className="add-title"
            sx={{ fontWeight: "bold", textAlign: "center", mt: "5vh" }}
          >
            Thêm vai trò mới
          </Typography>
        </Box>
        <Grid
          container
          justifyContent="center"
          direction="column"
          sx={{ width: "80%", mt: "10vh", ml: "5vh", md: "5vh" }}
        >
          <Typography variant="h7" sx={{ fontWeight: "bold", mb: "7px" }}>
            Tên vai trò
          </Typography>
          <TextField
            required
            id="name"
            label="Nhập tên vai trò"
            autoFocus
            value={roleName}
            className="text-field"
            onChange={(e) => setRoleName(e.target.value)}
            InputProps={{
              endAdornment: roleName && (
                <InputAdornment>
                  {<ClearIcon onClick={handleDelete} />}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ mt: "4%", width: "20%", ml: "5vh" }}
        >
          Thêm
        </Button>
      </Drawer>
    </AddRoleModalStyle>
  );
};
export default AddRoleModal;
