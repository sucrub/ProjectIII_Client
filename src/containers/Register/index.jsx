import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import isEmail from "validator/lib/isEmail";
import Copyright from "../../components/Copyright";
import RegisterStyle from "./index.style";
import route from "../../constants/route";
import api from "../../apis";
import backgroundImage from "../../assets/images/authbackground.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const renderCheckEmail = () => {
    if (!isEmail(email)) return "Email is not valid";
    return "";
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const checkInputValid = ({
    email,
    firstName,
    lastName,
    password,
    cPassword,
  }) => {
    const input = [email, firstName, lastName, password, cPassword];
    let isInputFilled = true;

    input.forEach((value) => {
      if (value === "") {
        isInputFilled = false;
      }
    });

    if (!isInputFilled) {
      toast.warning("Please fill all the information");
      return false;
    }

    if (!isEmail(email)) {
      toast.error("Email is invalid");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      password: data.get("password"),
      cPassword: data.get("cPassword"),
    };

    if (checkInputValid(payload)) {
      if (payload.password !== payload.cPassword) {
        toast.error("Password did not match");
        return;
      }

      try {
        delete payload.cPassword;
        const result = await api.auth.register(payload);
        if (!result?.status) {
          toast.error("This email is already existed");
          return;
        }
        toast.success("Register successfully");
        setTimeout(() => {
          history.push("/login");
          window.location.reload();
        }, 3000);
      } catch (error) {
        toast.error("Something is wrong");
      }
    }
    return;
  };

  return (
    <RegisterStyle>
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              className="form-box"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChangeEmail}
                    error={email !== "" && !isEmail(email)}
                    helperText={renderCheckEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cPassword"
                    label="Confirm password"
                    type="password"
                    id="cPassword"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="button"
              >
                Sign up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href={route.LOGIN} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright />
        </Grid>
      </Grid>
    </RegisterStyle>
  );
};

export default Register;
