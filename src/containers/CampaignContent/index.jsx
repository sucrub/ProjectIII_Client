import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Paper, Box } from "@mui/material";
import EditDialog from "./EditCampaign"; // Import the EditDialog component
import api from "../../apis";

const CampaignContent = () => {
  const [campaignDetail, setCampaignDetail] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { campaignId } = useParams();

  const getCampaignDetail = async () => {
    const result = await api.campaign.getCampaignDetail(campaignId);
    setCampaignDetail(result.result.campaign);
  };

  const updateCampaignDetail = async (data) => {
    const result = await api.campaign.updateCampaignDetail(campaignId, data);
    console.log(result);
  };

  useEffect(() => {
    getCampaignDetail();
  }, []);

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveChanges = async (editedData) => {
    // Here, you can update the campaign details using editedData
    console.log(editedData);
    await updateCampaignDetail(editedData);
    await getCampaignDetail();
    // Close the dialog
    setIsEditDialogOpen(false);
  };

  return (
    <Box width="70vw" margin="0 auto">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h3">{campaignDetail.title}</Typography>
        <Typography>{campaignDetail.content}</Typography>
        <Typography>{campaignDetail.status}</Typography>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleEditClick}
      >
        Edit
      </Button>

      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={handleEditDialogClose}
        onSave={handleSaveChanges}
        initialData={{
          title: campaignDetail.title,
          content: campaignDetail.content,
          status: campaignDetail.status,
        }}
      />
    </Box>
  );
};

export default CampaignContent;
