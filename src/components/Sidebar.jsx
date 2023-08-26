import React from "react";
import { Paper, List, ListItem, ListItemText, Link } from "@mui/material";

const Sidebar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        height: "90%",
        padding: "16px",
        backgroundColor: "#fff", // Set background color to white
        color: (theme) => theme.palette.text.primary,
        marginTop: "20px", // Add a small gap on the top
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <List>
        <Link href="/" underline="none" color="inherit">
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
        <Link href="/role-management" underline="none" color="inherit">
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
              primary="Role Management"
              sx={{
                marginLeft: "10px",
              }}
            />
          </ListItem>
        </Link>
        <Link href="/my-tasks" underline="none" color="inherit">
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
