import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getAllTransactions } from "../../services/transactionService";
import { TransactionResponse } from "../../types/transaction.types";

const AllTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [filtered,     setFiltered]     = useState<TransactionResponse[]>([]);
  const [typeFilter,   setTypeFilter]   = useState("All");
  const [search,       setSearch]       = useState("");
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    getAllTransactions().then((res) => {
      if (res.success) { setTransactions(res.data); setFiltered(res.data); }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let data = transactions;
    if (typeFilter !== "All") data = data.filter((t) => t.type === typeFilter);
    if (search) data = data.filter((t) =>
      t.accountId.toString().includes(search) ||
      (t.description || "").toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(data);
  }, [typeFilter, search, transactions]);

  const totalInbound = filtered
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutbound = filtered
    .filter((t) => t.type !== "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  // Exact dark theme from dashboard stats cards
  const premiumDarkCardStyle = {
    borderRadius: "18px",
    background: "linear-gradient(135deg,#173B73,#1E3A5F)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 30px rgba(23,59,115,0.18)",
  };

  const premiumWhiteCardStyle = {
    borderRadius: "18px",
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)",
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
            background: "linear-gradient(180deg,#DCEBFF 0%, #EEF4FF 100%)",
            minHeight: "100vh",
          }}
        >
          {/* Synchronized Header Group */}
          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#173B73",
                fontSize: "30px",
              }}
            >
              All Transactions
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Monitor and manage banking transaction activity
            </p>
          </div>

          {/* Premium Dark Summary Cards - MATCHING DASHBOARD THEME */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card border-0 h-100" style={premiumDarkCardStyle}>
                <div className="card-body text-center" style={{ padding: "24px" }}>
                  <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>
                    Total Transactions
                  </p>
                  <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>
                    {filtered.length}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100" style={premiumDarkCardStyle}>
                <div className="card-body text-center" style={{ padding: "24px" }}>
                  <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>
                    Total Inbound
                  </p>
                  <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>
                    ₹{totalInbound.toLocaleString()}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100" style={premiumDarkCardStyle}>
                <div className="card-body text-center" style={{ padding: "24px" }}>
                  <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>
                    Total Outbound
                  </p>
                  <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>
                    ₹{totalOutbound.toLocaleString()}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Interface */}
          <div className="card border-0 mb-4" style={premiumWhiteCardStyle}>
            <div className="card-body p-3">
              <div className="row g-2">
                <div className="col-md-5">
                  <input
                    type="text" 
                    className="form-control border-0"
                    style={{
                      background: "#F8FAFC",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      fontSize: "14px",
                      color: "#0F172A",
                    }}
                    placeholder="Search by Account ID or Description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <style>{`
                    input::placeholder {
                      color: #64748B !important;
                      opacity: 0.7;
                    }
                  `}</style>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select border-0"
                    style={{
                      background: "#F8FAFC",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      fontSize: "14px",
                      color: "#0F172A",
                    }}
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdrawal">Withdrawal</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Core Data Table */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#173B73" }} />
            </div>
          ) : (
            <div 
              className="card border-0"
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)",
              }}
            >
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead
                      style={{
                        background: "linear-gradient(135deg,#173B73,#1E3A5F)",
                        color: "#FFFFFF",
                      }}
                    >
                      <tr>
                        <th className="py-3 px-4" style={{ fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>#</th>
                        <th className="py-3" style={{ fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Date</th>
                        <th className="py-3" style={{ fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Account ID</th>
                        <th className="py-3" style={{ fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Type</th>
                        <th className="py-3" style={{ fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Amount</th>
                        <th className="py-3" style={{ fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>To Account</th>
                        <th className="py-3 px-4" style={{ fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-5 text-muted">
                            No transactions matching criteria located.
                          </td>
                        </tr>
                      ) : (
                        filtered.map((txn, i) => (
                          <tr key={txn.transactionId} style={{ verticalAlign: "middle", borderBottom: "1px solid #F1F5F9" }}>
                            <td className="px-4" style={{ color: "#64748B", fontSize: "14px" }}>{i + 1}</td>
                            <td style={{ color: "#334155", fontSize: "13px" }}>
                              {new Date(txn.transactionDate).toLocaleString()}
                            </td>
                            <td className="fw-semibold" style={{ color: "#334155", fontSize: "14px" }}>{txn.accountId}</td>
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
                            <td 
                              className="fw-bold"
                              style={{
                                color: txn.type === "Deposit" ? "#15803D" : "#B91C1C",
                                fontSize: "14px"
                              }}
                            >
                              {txn.type === "Deposit" ? "+" : "-"} ₹{txn.amount.toLocaleString()}
                            </td>
                            <td style={{ color: "#475569", fontSize: "14px" }}>{txn.toAccountId || "—"}</td>
                            <td className="px-4" style={{ color: "#64748B", fontSize: "14px", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {txn.description || "—"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;