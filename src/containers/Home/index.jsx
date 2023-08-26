import React, { useState, useEffect } from "react";
import { Grid, Pagination as MuiPagination, Box } from "@mui/material";
import CampaignCard from "../../components/CampaignCard";
import Sidebar from "../../components/Sidebar";
import api from "../../apis";

const Home = () => {
  const [campaignList, setCampaignList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 5; // Number of campaigns to display per page

  const getMyCampaign = async () => {
    const result = await api.campaign.getMyCampaign();
    console.log(result.result.campaigns);
    setCampaignList(result.result.campaigns);
  };

  useEffect(() => {
    getMyCampaign();
  }, []);

  // Calculate the index of the last campaign on the current page
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  // Calculate the index of the first campaign on the current page
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  // Get the campaigns for the current page
  const currentCampaigns = campaignList.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={2} style={{ height: "100vh" }}>
        <Sidebar />
      </Grid>

      {/* Main content */}
      <Grid item xs={10} style={{ marginTop: "30px" }}>
        <Grid container direction="column" alignItems="center">
          {currentCampaigns.map((campaign, index) => (
            <Grid
              className="campaign-item"
              key={index}
              style={{ marginBottom: "20px" }}
            >
              <CampaignCard campaign={campaign} />
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" marginTop="20px">
          <MuiPagination
            count={Math.ceil(campaignList.length / campaignsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
