import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Paper, Box, Divider } from "@mui/material";
import EditDialog from "./EditCampaign"; // Import the EditDialog component
import api from "../../apis";
import DeleteAlert from "../../components/DeleteAlert";

const CampaignContent = () => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState("");
  const [campaignDetail, setCampaignDetail] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [canDelete, setCanDelete] = useState("");
  const [canEdit, setCanEdit] = useState("");

  const { campaignId } = useParams();

  const getDeletePermission = async () => {
    const result = await api.auth.checkPermission({
      campaignId,
      permissionName: "Xoa chien dich",
    });
    setCanDelete(result);
  };

  const getEditPermission = async () => {
    const result = await api.auth.checkPermission({
      campaignId,
      permissionName: "Cap nhat chien dich",
    });
    setCanEdit(result);
  };

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
    getDeletePermission();
    getEditPermission();
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

  const handleOpenDeleteAlert = (data) => {
    setDeleteData(data);
    setDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
    getCampaignDetail();
  };

  const handleDeleteCampaign = () => {
    handleOpenDeleteAlert(campaignId);
  };

  return (
    <Box width="70vw" margin="0 auto">
      <DeleteAlert
        type="campaign"
        deleteValue={deleteData}
        open={deleteAlert}
        onClose={handleCloseDeleteAlert}
      />
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h3">{campaignDetail.title}</Typography>
        <Typography>Status: {campaignDetail.status}</Typography>
        <Divider sx={{ marginTop: "3%", marginBottom: "3%" }} />
        <Typography>{campaignDetail.content}</Typography>
      </Paper>
      {canEdit === "Yes" && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleEditClick}
        >
          Edit
        </Button>
      )}
      {canDelete === "Yes" && (
        <Button
          variant="contained"
          color="error"
          style={{ marginTop: "20px", marginLeft: "3%" }}
          onClick={handleDeleteCampaign}
        >
          Delete
        </Button>
      )}

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
