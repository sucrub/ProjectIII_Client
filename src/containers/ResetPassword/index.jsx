import React from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Box,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import Copyright from "../../components/Copyright";
import ResetPasswordStyle from "./index.style";
import backgroundImage from "../../assets/images/authbackground.jpg";
import route from "../../constants/route";
import api from "../../apis";

const Reset = ({ token }) => {
  const history = useHistory();
  const checkInputValid = ({ password, cPassword }) => {
    if (password === "" || cPassword === "") {
      toast.warning("Please fill in all the box");
      return false;
    }

    if (password !== cPassword) {
      toast.error("Password did not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      password: data.get("newpassword"),
      cPassword: data.get("confirmpassword"),
    };
    if (checkInputValid(payload)) {
      try {
        delete payload.cPassword;
        const result = await api.auth.resetPassword(token, payload);
        if (!result?.status) {
          toast.error("Time out");
          return;
        }
        toast.success("Password update successfully");
        setTimeout(() => {
          history.push("/login");
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast.error("Something is wrong");
      }
    }
  };

  return (
    <ResetPasswordStyle>
      <ToastContainer theme="colored" />
      <Grid container component="main" className="grid-container">
        <CssBaseline />
        <Grid item xs={7}>
          <img
            src={backgroundImage}
            alt="background"
            className="background-image"
          />
        </Grid>
        <Grid item xs={5}>
          <Box className="box">
            <Avatar className="avatar round-border">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              className="form-box"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="newpassword"
                label="New password"
                name="newpassword"
                type="password"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmpassword"
                label="Confirm password"
                name="confirmpassword"
                type="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="button"
              >
                Send
              </Button>
              <Grid container>
                <Grid item>
                  <Link href={route.LOGIN} variant="body2">
                    Back to login
                  </Link>
                </Grid>
              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ResetPasswordStyle>
  );
};

export default Reset;
