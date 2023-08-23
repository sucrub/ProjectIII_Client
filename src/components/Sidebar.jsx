import React from "react";
import { Paper, List, ListItem, ListItemText, Link } from "@mui/material";

const Sidebar = () => {
  return (
    <Paper elevation={3} style={{ height: "100%", padding: "16px" }}>
      <List>
        <Link href="/my-campaign" underline="none" color="inherit">
          <ListItem button style={{ display: "flex", alignItems: "center" }}>
            <ListItemText primary="My Campaign" />
          </ListItem>
        </Link>
        <Link href="/role-management" underline="none" color="inherit">
          <ListItem button style={{ display: "flex", alignItems: "center" }}>
            <ListItemText primary="Role Management" />
          </ListItem>
        </Link>
      </List>
    </Paper>
  );
};

export default Sidebar;
