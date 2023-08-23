import { getCookie } from "../utils/cookie";
import api from "./api";

const accessToken = getCookie("accessToken");

const getAdmin = async (data) => {
  let url = `/admin/get-all-admin?offset=${data.offset}`;
  if (data.limit !== undefined) {
    url += `&limit=${data.limit}`;
  }
  const admins = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return admins;
};

const addAdmin = async (data) => {
  let url = `/admin/add-server-admin`;
  const admin = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "POST",
    url,
    data,
  });
  return admin;
};

const deleteAdmin = async (id) => {
  let url = `/admin/delete-server-admin/${id}`;
  const admin = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "DELETE",
    url,
  });
  return admin;
};

export { getAdmin, addAdmin, deleteAdmin };
