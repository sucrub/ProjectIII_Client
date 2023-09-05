import { getCookie } from "../utils/cookie";
import api from "./api";

const accessToken = getCookie("accessToken");

const getTaskByCampaign = async (campaignId) => {
  const url = `/task/get-task-by-campaign-id/${campaignId}`;
  const tasks = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return tasks;
};

const getMyTask = async () => {
  const url = `/task/get-my-task`;
  const tasks = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return tasks;
};

const addTask = async (data) => {
  const url = `/task/create-task`;
  const task = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "POST",
    url,
    data,
  });
  return task;
};

const deleteTask = async (taskId) => {
  const url = `/task/delete-task/${taskId}`;
  const task = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "DELETE",
    url,
  });
  return task;
};

const getTaskById = async (taskId) => {
  const url = `task/get-task-by-id/${taskId}`;
  const task = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return task;
};

const updateTask = async (taskId, data) => {
  const url = `/task/update-task/${taskId}`;
  const task = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "PUT",
    url,
    data,
  });
  return task;
};

const isMember = async (taskId) => {
  const url = `/task/is-member/${taskId}`;
  const result = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return result;
};

export {
  getTaskByCampaign,
  addTask,
  deleteTask,
  getTaskById,
  getMyTask,
  updateTask,
  isMember,
};
