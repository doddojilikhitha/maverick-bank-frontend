import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getLast10, getLastMonth, getBetweenDates } from "../../services/transactionService";
import { getMyAccounts } from "../../services/accountService";
import { AccountResponse }    from "../../types/account.types";
import { TransactionResponse } from "../../types/transaction.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionHistory: React.FC = () => {
  const [accounts,      setAccounts]      = useState<AccountResponse[]>([]);
  const [transactions,  setTransactions]  = useState<TransactionResponse[]>([]);
  const [accountId,     setAccountId]     = useState("");
  const [filter,        setFilter]        = useState("last10");
  const [fromDate,      setFromDate]      = useState("");
  const [toDate,        setToDate]        = useState("");
  const [loading,       setLoading]       = useState(false);

  useEffect(() => {
    getMyAccounts().then((res) => {
      if (res.success) setAccounts(res.data.filter(
        (a: AccountResponse) => a.status === "Active"
      ));
    });
  }, []);

  const fetchTransactions = async () => {
    if (!accountId) { toast.warning("Please select an account."); return; }
    setLoading(true);
    try {
      let res;
      if (filter === "last10")
        res = await getLast10(Number(accountId));
      else if (filter === "lastmonth")
        res = await getLastMonth(Number(accountId));
      else {
        if (!fromDate || !toDate) {
          toast.warning("Please select date range.");
          setLoading(false); return;
        }
        res = await getBetweenDates(Number(accountId), fromDate, toDate);
      }
      if (res.success) setTransactions(res.data);
    } catch {
      toast.error("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div style={{ flex: 1, flexDirection: "column", display: "flex" }}>
        <Navbar />
        <div
          className="dashboard-content"
          style={{
            padding: "32px",
            background: "linear-gradient(180deg, #DCEBFF 0%, #EEF4FF 100%)",
            minHeight: "100vh",
          }}
        >
          <ToastContainer position="top-right" />

          {/* Header */}
          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#173B73",
                fontSize: "30px",
              }}
            >
              Transaction History
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              View and filter your recent account activity
            </p>
          </div>

          {/* Filters Card */}
          <div
            className="card border-0 mb-4"
            style={{
              borderRadius: "18px",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
            }}
          >
            <div className="card-body p-4">
              <div className="row g-3 align-items-end">

                {/* Account Selection */}
                <div className="col-md-3">
                  <label className="form-label fw-semibold" style={{ color: "#334155" }}>Account</label>
                  <select
                    className="form-select border-0"
                    style={{
                      background: "#F8FAFC",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      color: "#334155",
                    }}
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                  >
                    <option value="">-- Select Account --</option>
                    {accounts.map((acc) => (
                      <option key={acc.accountId} value={acc.accountId}>
                        {acc.accountNumber}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter Type */}
                <div className="col-md-3">
                  <label className="form-label fw-semibold" style={{ color: "#334155" }}>Filter</label>
                  <select
                    className="form-select border-0"
                    style={{
                      background: "#F8FAFC",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      color: "#334155",
                    }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="last10">Last 10 Transactions</option>
                    <option value="lastmonth">Last Month</option>
                    <option value="between">Between Dates</option>
                  </select>
                </div>

                {/* Date Range Fields */}
                {filter === "between" && (
                  <>
                    <div className="col-md-2">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>From</label>
                      <input
                        type="date"
                        className="form-control border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>To</label>
                      <input
                        type="date"
                        className="form-control border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Search Button */}
                <div className="col-md-2 ms-auto">
                  <button
                    className="btn w-100 text-white fw-bold py-2"
                    style={{
                      background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 6px 18px rgba(23,59,115,0.15)",
                      height: "48px"
                    }}
                    onClick={fetchTransactions}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div
            className="card border-0"
            style={{
              borderRadius: "18px",
              overflow: "hidden",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
            }}
          >
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead
                    style={{
                      background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                      color: "#FFFFFF",
                    }}
                  >
                    <tr>
                      <th className="border-0 px-4 py-3 text-white">#</th>
                      <th className="border-0 py-3 text-white">Date</th>
                      <th className="border-0 py-3 text-white">Type</th>
                      <th className="border-0 py-3 text-white">Description</th>
                      <th className="border-0 py-3 text-white">Amount</th>
                      <th className="border-0 px-4 py-3 text-white">To Account</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-5"
                          style={{ color: "#64748B" }}
                        >
                          No transactions found. Select account and click Search.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((txn, i) => (
                        <tr key={txn.transactionId} style={{ verticalAlign: "middle" }}>
                          <td className="px-4 py-3">{i + 1}</td>
                          <td style={{ fontSize: "13px", color: "#334155" }}>
                            {new Date(txn.transactionDate).toLocaleString()}
                          </td>
                          <td>
                            <span
                              style={{
                                background:
                                  txn.type === "Deposit"
                                    ? "#DCFCE7"
                                    : txn.type === "Withdrawal"
                                    ? "#FEE2E2"
                                    : "#DBEAFE",
                                color:
                                  txn.type === "Deposit"
                                    ? "#166534"
                                    : txn.type === "Withdrawal"
                                    ? "#991B1B"
                                    : "#1E40AF",
                                padding: "6px 12px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                fontWeight: 600,
                                display: "inline-block"
                              }}
                            >
                              {txn.type}
                            </span>
                          </td>
                          <td style={{ color: "#475569" }}>{txn.description || "—"}</td>
                          <td
                            className="fw-bold"
                            style={{
                              color: txn.type === "Deposit" ? "#15803D" : "#B91C1C",
                            }}
                          >
                            {txn.type === "Deposit" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                          </td>
                          <td className="px-4 text-muted">{txn.toAccountId || "—"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;