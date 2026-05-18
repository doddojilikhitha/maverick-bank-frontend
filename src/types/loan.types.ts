export interface LoanProduct {
  loanProductId: number;
  productName: string;
  loanAmount: number;
  interestRate: number;
  tenureMonths: number;
}

export interface LoanApplyRequest {
  accountId: number;
  loanProductId: number;
  amountApplied: number;
  purpose: string;
}

export interface LoanResponse {
  loanId: number;
  userId: number;
  productName: string;
  amountApplied: number;
  interestRate: number;
  tenureMonths: number;
  purpose: string;
  status: string;
  appliedOn: string;
  disbursedOn: string | null;
}