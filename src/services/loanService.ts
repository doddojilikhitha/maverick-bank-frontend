import axiosInstance from "../utils/axiosConfig";
import { API_URLS } from "../utils/constants";
import { LoanApplyRequest } from "../types/loan.types";

// Loan Products
export const getLoanProducts = async () => {
  const response = await axiosInstance.get(
    API_URLS.LOAN_PRODUCTS
  );
  return response.data;
};

// Apply Loan
export const applyLoan = async (
  data: LoanApplyRequest
) => {
  const response = await axiosInstance.post(
    API_URLS.APPLY_LOAN,
    data
  );
  return response.data;
};

// Customer Loans
export const getMyLoans = async () => {
  const response = await axiosInstance.get(
    API_URLS.MY_LOANS
  );
  return response.data;
};

// Employee/Admin
export const getAllLoans = async () => {
  const response = await axiosInstance.get(
    API_URLS.ALL_LOANS
  );
  return response.data;
};

// Approve Loan (PUT confirmed)
export const approveLoan = async (
  id: number
) => {
  const response = await axiosInstance.put(
    `${API_URLS.APPROVE_LOAN}/${id}`
  );
  return response.data;
};

// Reject Loan (PUT confirmed)
export const rejectLoan = async (
  id: number
) => {
  const response = await axiosInstance.put(
    `${API_URLS.REJECT_LOAN}/${id}`
  );
  return response.data;
};

// Disburse Loan (PUT confirmed)
export const disburseLoan = async (
  id: number
) => {
  const response = await axiosInstance.put(
    `${API_URLS.DISBURSE_LOAN}/${id}`
  );
  return response.data;
};