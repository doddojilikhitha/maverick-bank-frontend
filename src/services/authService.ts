import axiosInstance from "../utils/axiosConfig";
import { API_URLS }  from "../utils/constants";
import { RegisterRequest, LoginRequest } from "../types/auth.types";

export const registerUser = async (data: RegisterRequest) => {
  const response = await axiosInstance.post(API_URLS.REGISTER, data);
  return response.data;
};

export const loginUser = async (data: LoginRequest) => {
  const response = await axiosInstance.post(API_URLS.LOGIN, data);
  return response.data;
};