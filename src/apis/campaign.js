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

export { getMyCampaign, getCampaignDetail, updateCampaignDetail };
