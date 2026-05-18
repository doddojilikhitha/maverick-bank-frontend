const BASE_URL = "https://localhost:7278/api/v1";

export const API_URLS = {
  // Auth
  REGISTER:  `${BASE_URL}/Auth/register`,
  LOGIN:     `${BASE_URL}/Auth/login`,

  // Account
  MY_ACCOUNTS:    `${BASE_URL}/Account/my`,
  ACCOUNT_BY_ID:  `${BASE_URL}/Account`,
  ALL_ACCOUNTS:   `${BASE_URL}/Account/all`,
  OPEN_ACCOUNT:   `${BASE_URL}/Account/open`,
  CLOSE_REQUEST:  `${BASE_URL}/Account/close-request`,
  APPROVE_ACCOUNT:`${BASE_URL}/Account/approve`,
  CLOSE_ACCOUNT:  `${BASE_URL}/Account/close`,
  BENEFICIARY:    `${BASE_URL}/Account/beneficiary`,
  BENEFICIARIES:  `${BASE_URL}/Account/beneficiaries`,

  // Transaction
  TRANSACTION: `${BASE_URL}/Transaction`,
  DEPOSIT:        `${BASE_URL}/Transaction/deposit`,
  WITHDRAW:       `${BASE_URL}/Transaction/withdraw`,
  TRANSFER:       `${BASE_URL}/Transaction/transfer`,
  ALL_TRANSACTIONS:`${BASE_URL}/Transaction/all`,

  // Loan
  LOAN_PRODUCTS:  `${BASE_URL}/Loan/products`,
  APPLY_LOAN:     `${BASE_URL}/Loan/apply`,
  MY_LOANS:       `${BASE_URL}/Loan/my`,
  ALL_LOANS:      `${BASE_URL}/Loan/all`,
  APPROVE_LOAN:   `${BASE_URL}/Loan/approve`,
  REJECT_LOAN:    `${BASE_URL}/Loan/reject`,
  DISBURSE_LOAN:  `${BASE_URL}/Loan/disburse`,

  // Report
  STATEMENT:      `${BASE_URL}/Report/statement`,
  PERFORMANCE:    `${BASE_URL}/Report/performance`,

  // Admin
  ALL_USERS:      `${BASE_URL}/Admin/users`,
  ADD_EMPLOYEE:   `${BASE_URL}/Admin/employee`,
  DEACTIVATE:     `${BASE_URL}/Admin/user`,
};