export interface DepositWithdrawRequest {
  accountId: number;
  amount: number;
  description: string;
}

export interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description: string;
}

export interface TransactionResponse {
  transactionId: number;
  type: string;
  amount: number;
  description: string;
  transactionDate: string;
  accountId: number;
  toAccountId: number | null;
}

export interface TransactionSummary {
  totalInbound: number;
  totalOutbound: number;
  transactions: TransactionResponse[];
}