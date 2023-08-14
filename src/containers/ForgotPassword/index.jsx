import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import isEmail from "validator/lib/isEmail";
import { setCookie } from "../../utils/cookie";
import { HALF_HOUR } from "../../constants";
import Copyright from "../../components/Copyright";
import ForgotPasswordStyle from "./index.style";
import backgroundImage from "../../assets/images/authbackground.jpg";
import route from "../../constants/route";
import api from "../../apis";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [lastRequestTime, setLastRequestTime] = useState(null);

  const renderCheckEmail = () => {
    if (!isEmail(email)) return "Email is not valid";
    return "";
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const checkInputValid = ({ email }) => {
    if (email === "") {
      toast.warning("Please fill in all the boxes");
      return false;
    }

    if (!isEmail(email)) {
      toast.warning("Email is not valid");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const now = Date.now();
    if (lastRequestTime && now - lastRequestTime < 10000) {
      toast.warning("Please wait before making another request");
      return;
    }

    setLastRequestTime(now);

    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
    };

    if (checkInputValid(payload)) {
      try {
        const result = await api.auth.forgotPassword(payload);

        if (!result?.status) {
          toast.error("User not found");
          return;
        }

        setCookie("forgotPasswordToken", result.result.token, HALF_HOUR);
        toast.info("Please check your email");

        // Update the last request time
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <ForgotPasswordStyle>
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
              Forgot password
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChangeEmail}
                error={email !== "" && !isEmail(email)}
                helperText={renderCheckEmail}
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
    </ForgotPasswordStyle>
  );
};

export default Forgot;
