import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Link,
  SvgIcon,
} from "@mui/material";
import NavbarStyle from "./index.style";

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
};

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState();
  const [, , removeAccessToken, removeRefreshToken] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Delete accessToken and refreshToken cookies
    removeAccessToken("accessToken");
    removeRefreshToken("refreshToken");

    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <NavbarStyle>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/">
              <HomeIcon className="home-icon" />
            </Link>
            <Box className="mycampaign-button">
              <Link href="/my-campaign" style={{ textDecoration: "none" }}>
                <Button>My Campaign</Button>
              </Link>
            </Box>
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={handleLogout} textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </NavbarStyle>
  );
};

export default Navbar;
