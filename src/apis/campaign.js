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

export { getMyCampaign };
