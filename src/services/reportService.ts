import axiosInstance from "../utils/axiosConfig";
import { API_URLS }  from "../utils/constants";

export const getAccountStatement = async (accountId: number) => {
  const response = await axiosInstance.get(`${API_URLS.STATEMENT}/${accountId}`);
  return response.data;
};

export const getFinancialPerformance = async () => {
  const response = await axiosInstance.get(API_URLS.PERFORMANCE);
  return response.data;
};