import React, { useState, useEffect } from "react";
import { Paper, List, ListItem, ListItemText, Link } from "@mui/material";
import api from "../apis";

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const getAdminInfo = async () => {
    const result = await api.admin.isAdmin();
    console.log(result.result.result);
    if (result.result.result !== null) setIsAdmin(true);
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

  const handleRoleManagementClick = (event) => {
    if (!isAdmin) {
      event.preventDefault(); // Prevent the default link behavior if not admin
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "90%",
        padding: "16px",
        backgroundColor: "#fff",
        color: (theme) => theme.palette.text.primary,
        marginTop: "20px",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <List>
        <Link
          href="/"
          underline="none"
          color="inherit"
          sx={{
            color: "inherit",
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          <ListItem
            button
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
              borderRadius: "8px",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.light,
              },
            }}
          >
            <ListItemText
              primary="My Campaign"
              sx={{
                marginLeft: "10px",
              }}
            />
          </ListItem>
        </Link>
        <Link
          href="/role-management"
          underline="none"
          color="inherit"
          sx={{
            color: "inherit",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={handleRoleManagementClick} // Add the onClick event handler
        >
          <ListItem
            button
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
              borderRadius: "8px",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.light,
              },
            }}
            // Conditionally add 'disabled' attribute based on 'isAdmin'
            {...(isAdmin ? {} : { disabled: true })}
          >
            <ListItemText
              primary="Management"
              sx={{
                marginLeft: "10px",
              }}
            />
          </ListItem>
        </Link>
        <Link
          href="/my-tasks"
          underline="none"
          color="inherit"
          sx={{
            color: "inherit",
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          <ListItem
            button
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
              borderRadius: "8px",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.light,
              },
            }}
          >
            <ListItemText
              primary="My task"
              sx={{
                marginLeft: "10px",
              }}
            />
          </ListItem>
        </Link>
      </List>
    </Paper>
  );
};

export default Sidebar;
