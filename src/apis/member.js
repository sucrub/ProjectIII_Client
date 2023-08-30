import { getCookie } from "../utils/cookie";
import api from "./api";

const accessToken = getCookie("accessToken");

const getMember = async (campaignId) => {
  let url = `/get-all-member/${campaignId}`;
  const member = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return member;
};

export { getMember };
