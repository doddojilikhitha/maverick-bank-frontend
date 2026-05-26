//interfaces for type safety

export interface OpenAccountRequest {
  accountType: string;
  branchName: string;
  ifscCode: string;
  branchAddress: string;
}

export interface AccountResponse {
  accountId: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  ifscCode: string;
  branchName: string;
  status: string;
  ownerName: string;
  createdAt: string;
}

export interface BeneficiaryRequest {
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
}

export interface BeneficiaryResponse {
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
}