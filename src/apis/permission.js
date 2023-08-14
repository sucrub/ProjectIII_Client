import { getCookie } from "../utils/cookie";
import api from "./api";

const accessToken = getCookie("accessToken");

const getPermission = async (data) => {
  let url = `/permission/get-all-permission?offset=${data.offset}`;
  if (data.limit !== undefined) {
    url += `&limit=${data.limit}`;
  }
  const permissions = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return permissions;
};

export { getPermission };
