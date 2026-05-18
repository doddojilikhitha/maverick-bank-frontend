import axiosInstance from "../utils/axiosConfig";
import { API_URLS } from "../utils/constants";
import { RegisterRequest } from "../types/auth.types";

export const getAllUsers = async () => {
  const response = await axiosInstance.get(
    API_URLS.ALL_USERS
  );
  return response.data;
};

export const addEmployee = async (
  data: RegisterRequest
) => {
  const response = await axiosInstance.post(
    API_URLS.ADD_EMPLOYEE,
    data
  );
  return response.data;
};

export const deactivateUser = async (
  id: number
) => {
  const response = await axiosInstance.put(
    `${API_URLS.DEACTIVATE}/${id}/deactivate`
  );

  return response.data;
};

export const activateUser = async (
  id: number
) => {
  const response = await axiosInstance.put(
    `${API_URLS.DEACTIVATE}/${id}/activate`
  );

  return response.data;
};