import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar";

const MyTask = () => {
  return (
    <Grid container>
      <Grid item xs={2} style={{ height: "100vh" }}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column" alignItems="center">
          MyTask
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyTask;
