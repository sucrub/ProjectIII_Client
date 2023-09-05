import React, { useState, useEffect } from "react";
import { Grid, Pagination as MuiPagination, Box, Button } from "@mui/material";
import CampaignCard from "../../components/CampaignCard";
import Sidebar from "../../components/Sidebar";
import api from "../../apis";
import CreateCampaignDialog from "./CreateCampaignDialog";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [campaignList, setCampaignList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 5;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const getMyCampaign = async () => {
    const result = await api.campaign.getMyCampaign();
    console.log(result.result.campaigns);
    setCampaignList(result.result.campaigns);
  };

  useEffect(() => {
    getMyCampaign();
  }, []);

  const handleCreateCampaign = async (data) => {
    const result = await api.campaign.createCampaign(data);
    console.log(result);
    getMyCampaign();
    toast.success("Create successfully");
  };

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
      <ToastContainer theme="colored" />
      <Grid item xs={2} style={{ height: "100vh" }}>
        <Sidebar />
      </Grid>

      <Grid item xs={10} style={{ marginTop: "30px" }}>
        <Button
          sx={{ marginLeft: "12.5%", marginBottom: "3%" }}
          variant="contained"
          color="primary"
          onClick={openDialog}
        >
          Create Campaign
        </Button>
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
      <CreateCampaignDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onCreate={handleCreateCampaign}
      />
    </Grid>
  );
};

export default Home;
