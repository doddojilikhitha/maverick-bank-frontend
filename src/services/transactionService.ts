import axiosInstance from "../utils/axiosConfig";
import { API_URLS } from "../utils/constants";
import {
  DepositWithdrawRequest,
  TransferRequest
} from "../types/transaction.types";

// Deposit
export const deposit = async (
  data: DepositWithdrawRequest
) => {
  const response = await axiosInstance.post(
    API_URLS.DEPOSIT,
    data
  );
  return response.data;
};

// Withdraw
export const withdraw = async (
  data: DepositWithdrawRequest
) => {
  const response = await axiosInstance.post(
    API_URLS.WITHDRAW,
    data
  );
  return response.data;
};

// Transfer
export const transfer = async (
  data: TransferRequest
) => {
  const response = await axiosInstance.post(
    API_URLS.TRANSFER,
    data
  );
  return response.data;
};

// Last 10 Transactions
export const getLast10 = async (
  accountId: number
) => {
  const response = await axiosInstance.get(
    `${API_URLS.TRANSACTION}/${accountId}/last10`
  );
  return response.data;
};

// Last Month Transactions
export const getLastMonth = async (
  accountId: number
) => {
  const response = await axiosInstance.get(
    `${API_URLS.TRANSACTION}/${accountId}/lastmonth`
  );
  return response.data;
};

// Between Dates
export const getBetweenDates = async (
  accountId: number,
  from: string,
  to: string
) => {
  const response = await axiosInstance.get(
    `${API_URLS.TRANSACTION}/${accountId}/between?from=${from}&to=${to}`
  );

  return response.data;
};

// Employee/Admin
export const getAllTransactions = async () => {
  const response = await axiosInstance.get(
    API_URLS.ALL_TRANSACTIONS
  );

  return response.data;
};

// Account Summary
export const getAccountSummary = async (
  accountId: number
) => {
  const response = await axiosInstance.get(
    `${API_URLS.TRANSACTION}/${accountId}/summary`
  );

  return response.data;
};