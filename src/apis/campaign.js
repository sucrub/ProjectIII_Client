import { getCookie } from "../utils/cookie";
import api from "./api";

const accessToken = getCookie("accessToken");

const getMyCampaign = async () => {
  const url = `/campaign/get-my-campaigns`;
  const campaigns = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return campaigns;
};

const getCampaignDetail = async (campaignId) => {
  const url = `/campaign/get-campaign/${campaignId}`;
  const campaign = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return campaign;
};

const updateCampaignDetail = async (campaignId, data) => {
  const url = `/campaign/update-campaign/${campaignId}`;
  const campaign = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "PUT",
    url,
    data,
  });
  return campaign;
};

const deleteCampaign = async (campaignId) => {
  const url = `/campaign/delete-campaign/${campaignId}`;
  const campaign = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "DELETE",
    url,
  });
  return campaign;
};

const getAllMember = async (campaignId) => {
  const url = `/campaign/get-all-member/${campaignId}`;
  const members = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return members;
};

const changeMemberRole = async (data) => {
  const url = `/campaign/change-member-role`;
  const member = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "POST",
    url,
    data,
  });
  return member;
};

const deleteMember = async (data) => {
  const url = `/campaign/delete-member`;
  const result = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "DELETE",
    url,
    data,
  });
  return result;
};

const addMember = async (data) => {
  const url = `/campaign/add-user`;
  const member = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "POST",
    url,
    data,
  });
  return member;
};

export {
  getMyCampaign,
  getCampaignDetail,
  updateCampaignDetail,
  getAllMember,
  changeMemberRole,
  deleteMember,
  addMember,
  deleteCampaign,
};
