import { Box, TextField, Typography, Button } from "@mui/material";
import AdminDrawerStyle from "./index.style";

const AdminDrawer = (props) => {
  const { open, onClose } = props;
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
      />
      <Button variant="contained" className="submit-button">
        Submit
      </Button>
    </AdminDrawerStyle>
  );
};

export default AdminDrawer;
