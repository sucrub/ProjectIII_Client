import React from "react";
import { Grid } from "@mui/material";
// import CampaignCard from "../../components/CampaignCard";
import { campaignList } from "../../constants/dataTest";
const App = () => {
  return (
    <>
      <Grid container direction="column" alignItems="center">
        {campaignList.map((campaign, index) => (
          <Grid className="campaign-item" key={index}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default App;
