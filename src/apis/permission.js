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

const addPermission = async (data) => {
  let url = `/permission/create-permission`;
  const permission = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "POST",
    url,
    data,
  });
  return permission;
};

const updatePermission = async (data, id) => {
  let url = `/permission/update-permission/${id}`;
  const permission = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "PUT",
    url,
    data,
  });
  return permission;
};

const deletePermission = async (id) => {
  console.log(id);
  let url = `/permission/delete-permission/${id}`;
  const permission = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "DELETE",
    url,
  });
  return permission;
};

export { getPermission, addPermission, updatePermission, deletePermission };
