import axiosInstance from "../utils/axiosConfig";
import { API_URLS } from "../utils/constants";
import {
  OpenAccountRequest,
  BeneficiaryRequest
} from "../types/account.types";

// Customer Accounts
export const getMyAccounts = async () => {
  const response = await axiosInstance.get(API_URLS.MY_ACCOUNTS);
  return response.data;
};

export const getAccountById = async (id: number) => {
  const response = await axiosInstance.get(
    `${API_URLS.ACCOUNT_BY_ID}/${id}`
  );
  return response.data;
};

// Employee/Admin
export const getAllAccounts = async () => {
  const response = await axiosInstance.get(API_URLS.ALL_ACCOUNTS);
  return response.data;
};

// Open Account
export const openAccount = async (
  data: OpenAccountRequest
) => {
  const response = await axiosInstance.post(
    API_URLS.OPEN_ACCOUNT,
    data
  );
  return response.data;
};

// Request Close Account (POST confirmed)
export const requestCloseAccount = async (
  id: number
) => {
  const response = await axiosInstance.post(
    `${API_URLS.CLOSE_REQUEST}/${id}`
  );
  return response.data;
};

// Approve Account
export const approveAccount = async (
  id: number
) => {
  const response = await axiosInstance.put(
    `${API_URLS.APPROVE_ACCOUNT}/${id}`
  );
  return response.data;
};

// Close Account
export const closeAccount = async (
  id: number
) => {
  const response = await axiosInstance.put(
    `${API_URLS.CLOSE_ACCOUNT}/${id}`
  );
  return response.data;
};

// Beneficiaries
export const addBeneficiary = async (
  data: BeneficiaryRequest
) => {
  const response = await axiosInstance.post(
    API_URLS.BENEFICIARY,
    data
  );
  return response.data;
};

export const getBeneficiaries = async () => {
  const response = await axiosInstance.get(
    API_URLS.BENEFICIARIES
  );
  return response.data;
};