import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../components/Copyright";
import LoginStyle from "./index.style";
import route from "../../constants/route";
import backgroundImage from "../../assets/images/authbackground.jpg";
import api from "../../apis";
import isEmail from "validator/lib/isEmail";
import action from "../../redux/actions";

const Login = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const renderCheckEmail = () => {
    if (!isEmail(email)) return "Email is not valid";
    return "";
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const checkInputValid = ({ email, password }) => {
    if (email === "" || password === "") {
      toast.warning("Please fill in all the box");
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
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (checkInputValid(payload)) {
      try {
        const result = await api.auth.login(payload);
        dispatch(action.auth.login(result.result));
        if (!result?.status) {
          toast.error("Wrong email or password");
          return;
        }
        toast.info("Login success");
        setTimeout(() => {
          history.push("/");
          window.location.reload();
        }, 3000);
      } catch (error) {
        toast.error("Something is wrong");
      }
    }
  };

  return (
    <LoginStyle>
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              className="round-border"
            >
              <TextField
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                autoFocus
                className="text-field"
                onChange={handleChangeEmail}
                error={email !== "" && !isEmail(email)}
                helperText={renderCheckEmail}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className="text-field"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="button"
              >
                Sign in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    name="forgot-password"
                    variant="body2"
                    href={route.FORGOT_PASSWORD}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link name="register" href={route.REGISTER} variant="body2">
                    Don&apos;t have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LoginStyle>
  );
};

export default Login;
