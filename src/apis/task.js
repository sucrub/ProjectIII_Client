import { getCookie } from "../utils/cookie";
import api from "./api";

const accessToken = getCookie("accessToken");

const getTaskByCampaign = async (campaignId) => {
  let url = `/task/get-task-by-campaign-id/${campaignId}`;
  const tasks = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return tasks;
};

const addTask = async (data) => {
  let url = `/task/create-task`;
  const task = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "POST",
    url,
    data,
  });
  return task;
};

const deleteTask = async (taskId) => {
  let url = `/task/delete-task/${taskId}`;
  const task = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "DELETE",
    url,
  });
  return task;
};

const getTaskById = async (taskId) => {
  let url = `task/get-task-by-id/${taskId}`;
  const task = await api({
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "GET",
    url,
  });
  return task;
};

export { getTaskByCampaign, addTask, deleteTask, getTaskById };
