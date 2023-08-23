import React, { useState } from "react";
import { Grid } from "@mui/material";
import CampaignCard from "../../components/CampaignCard";
import { campaignList } from "../../constants/dataTest";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={2} style={{ height: "100vh" }}>
        <Sidebar />
      </Grid>

      {/* Main content */}
      <Grid item xs={10} style={{ marginTop: "30px" }}>
        <Grid container direction="column" alignItems="center">
          {campaignList.map((campaign, index) => (
            <Grid
              className="campaign-item"
              key={index}
              style={{ marginBottom: "20px" }}
            >
              <CampaignCard campaign={campaign} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
