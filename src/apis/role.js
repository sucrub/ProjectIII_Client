import { getCookie } from "../utils/cookie";
import api from "./api";

const accessToken = getCookie("accessToken");

const getRole = async () => {
  let url = `/role/get-all-role?offset=0&limit=100`;
  const roles = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return roles;
};

const setRole = async (roleId, data) => {
  let url = `/role/set-permissions/${roleId}`;
  const role = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "PUT",
    url,
    data,
  });
  return role;
};

const addRole = async (data) => {
  let url = `/role/create-role`;
  const role = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "POST",
    url,
    data,
  });
  return role;
};

const deleteRole = async (roleId) => {
  let url = `/role/delete-role/${roleId}`;
  const role = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "DELETE",
    url,
  });
  return role;
};

export { getRole, setRole, addRole, deleteRole };
