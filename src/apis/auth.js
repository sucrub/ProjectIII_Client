import { getCookie } from "../utils/cookie";
import api from "./api";

const accessToken = getCookie("accessToken");

const checkPermission = async (data) => {
  const url = `/auths/check-permission`;
  const result = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "POST",
    url,
    data,
  });
  return result;
};

const register = async (data) => {
  const accountInfo = await api({
    method: "POST",
    url: "/auths/register",
    data,
  });
  return accountInfo;
};

const login = async (data) => {
  const loginInfo = await api({
    method: "POST",
    url: "/auths/login",
    data,
  });
  return loginInfo;
};

const forgotPassword = async (data) => {
  const token = await api({
    method: "POST",
    url: "auths/forgot-password",
    data,
  });
  return token;
};

const resetPassword = async (token, data) => {
  const result = await api({
    method: "POST",
    url: `auths/reset-password/${token}`,
    data,
  });
  return result;
};

export { register, login, forgotPassword, resetPassword, checkPermission };
