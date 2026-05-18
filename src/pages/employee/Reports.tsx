import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getAccountStatement, getFinancialPerformance } from "../../services/reportService";
import { getAllAccounts } from "../../services/accountService";
import { AccountResponse } from "../../types/account.types";
import { TransactionResponse } from "../../types/transaction.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reports: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [accountId, setAccountId] = useState("");
  const [statement, setStatement] = useState<TransactionResponse[]>([]);
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [perfLoading, setPerfLoading] = useState(false);

  useEffect(() => {
    getAllAccounts().then((res) => {
      if (res.success) setAccounts(res.data);
    });
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    setPerfLoading(true);
    try {
      const res = await getFinancialPerformance();
      if (res.success) setPerformance(res.data);
    } catch {
      console.error("Performance fetch failed");
    } finally {
      setPerfLoading(false);
    }
  };

  const fetchStatement = async () => {
    if (!accountId) {
      toast.warning("Select an account.");
      return;
    }
    setLoading(true);
    try {
      const res = await getAccountStatement(Number(accountId));
      if (res.success) setStatement(res.data);
      else toast.error("Unable to generate account statement.");
    } catch {
      toast.error("Failed to load statement.");
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

          {/* Header Section */}
          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#173B73",
                fontSize: "30px",
              }}
            >
              Reports & Analytics
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Monitor bank performance and generate account statements
            </p>
          </div>

          {/* Financial Performance */}
          <div
            className="card border-0 mb-4"
            style={{
              borderRadius: "18px",
              overflow: "hidden",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
            }}
          >
            <div
              className="card-header text-white border-0 py-3"
              style={{
                background: "linear-gradient(135deg, #173B73, #1E3A5F)",
              }}
            >
              <h6 className="mb-0 fw-bold">Overall Bank Performance</h6>
            </div>
            <div className="card-body p-4">
              {perfLoading ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm" style={{ color: "#173B73" }} />
                </div>
              ) : performance ? (
                <div className="row g-3">
                  <div className="col-md-4">
                    <div
                      className="p-3 text-center"
                      style={{
                        background: "linear-gradient(135deg, #DCFCE7, #ECFDF5)",
                        borderRadius: "16px",
                      }}
                    >
                      <p className="mb-1" style={{ fontSize: "13px", color: "#166534", fontWeight: 500 }}>
                        Total Inbound
                      </p>
                      <h4 className="fw-bold text-success mb-0">
                        ₹{performance.totalInbound?.toLocaleString("en-IN") || 0}
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className="p-3 text-center"
                      style={{
                        background: "linear-gradient(135deg, #FEE2E2, #FEF2F2)",
                        borderRadius: "16px",
                      }}
                    >
                      <p className="mb-1" style={{ fontSize: "13px", color: "#991B1B", fontWeight: 500 }}>
                        Total Outbound
                      </p>
                      <h4 className="fw-bold text-danger mb-0">
                        ₹{performance.totalOutbound?.toLocaleString("en-IN") || 0}
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className="p-3 text-center"
                      style={{
                        background: "linear-gradient(135deg, #DBEAFE, #EFF6FF)",
                        borderRadius: "16px",
                      }}
                    >
                      <p className="mb-1" style={{ fontSize: "13px", color: "#1E40AF", fontWeight: 500 }}>
                        Net Flow
                      </p>
                      <h4
                        className={`fw-bold mb-0 ${
                          (performance.totalInbound - performance.totalOutbound) >= 0
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        ₹{(
                          (performance.totalInbound || 0) - (performance.totalOutbound || 0)
                        ).toLocaleString("en-IN")}
                      </h4>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                      Total Transactions: <strong style={{ color: "#173B73" }}>{performance.transactions?.length || 0}</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted mb-0">No data available.</p>
              )}
            </div>
          </div>

          {/* Account Statement */}
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
            <div
              className="card-header text-white border-0 py-3"
              style={{
                background: "linear-gradient(135deg, #173B73, #1E3A5F)",
              }}
            >
              <h6 className="mb-0 fw-bold">Account Statement</h6>
            </div>
            <div className="card-body p-4">
              <div className="row g-2 mb-4 align-items-center">
                <div className="col-md-5">
                  <select
                    className="form-select border-0"
                    style={{
                      background: "#F8FAFC",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      color: "#1E293B",
                      fontWeight: 500,
                      boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
                    }}
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                  >
                    <option value="">-- Select Account --</option>
                    {accounts.map((acc) => (
                      <option key={acc.accountId} value={acc.accountId}>
                        {acc.accountNumber} — {acc.ownerName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn w-100 text-white fw-semibold"
                    style={{
                      background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                      borderRadius: "12px",
                      border: "none",
                      padding: "12px 14px",
                    }}
                    onClick={fetchStatement}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      "Generate Report"
                    )}
                  </button>
                </div>
              </div>

              {/* Statement Table */}
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead
                    style={{
                      background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                    }}
                  >
                    <tr>
                      <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>#</th>
                      <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Date</th>
                      <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Type</th>
                      <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Description</th>
                      <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statement.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-5 text-muted">
                          Select an account and click Generate Report.
                        </td>
                      </tr>
                    ) : (
                      statement.map((txn, i) => (
                        <tr key={txn.transactionId} className="align-middle">
                          <td style={{ padding: "16px", color: "#64748B" }}>{i + 1}</td>
                          <td style={{ padding: "16px", fontSize: "13px", color: "#64748B" }}>
                            {new Date(txn.transactionDate).toLocaleString()}
                          </td>
                          <td style={{ padding: "16px" }}>
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
                                display: "inline-block",
                              }}
                            >
                              {txn.type}
                            </span>
                          </td>
                          <td style={{ padding: "16px", color: "#334155" }}>
                            {txn.description || "—"}
                          </td>
                          <td
                            style={{
                              padding: "16px",
                              fontWeight: 700,
                              color: txn.type === "Deposit" ? "#16A34A" : "#DC2626",
                            }}
                          >
                            {txn.type === "Deposit" ? "+" : "-"} ₹{txn.amount.toLocaleString("en-IN")}
                          </td>
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

export default Reports;