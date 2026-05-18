import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  getAllAccounts, approveAccount, closeAccount
} from "../../services/accountService";
import { AccountResponse } from "../../types/account.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [filtered, setFiltered] = useState<AccountResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      const res = await getAllAccounts();
      if (res.success) {
        setAccounts(res.data);
        setFiltered(res.data);
      }
    } catch {
      toast.error("Failed to load accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAccounts(); }, []);

  useEffect(() => {
    if (statusFilter === "All") setFiltered(accounts);
    else setFiltered(accounts.filter((a) => a.status === statusFilter));
  }, [statusFilter, accounts]);

  const handleApprove = async (id: number) => {
    try {
      const res = await approveAccount(id);
      if (res.success) {
        toast.success("Account approved!");
        fetchAccounts();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to approve.");
    }
  };

  const handleClose = async (id: number) => {
    try {
      const res = await closeAccount(id);
      if (res.success) {
        toast.success("Account closed.");
        fetchAccounts();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to close account.");
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
            background: "linear-gradient(180deg,#DCEBFF 0%, #EEF4FF 100%)",
            minHeight: "100vh",
          }}
        >
          <ToastContainer position="top-right" />

          {/* Premium Header Layout with Integrated Filter Dropdown */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#173B73",
                  fontSize: "30px",
                }}
              >
                Manage Accounts
              </h2>
              <p
                style={{
                  color: "#64748B",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                Review, approve and manage customer accounts
              </p>
            </div>

            <select
              className="form-select border-0"
              style={{
                background: "#FFFFFF",
                borderRadius: "12px",
                width: "220px",
                padding: "12px 14px",
                boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
                color: "#475569",
                fontSize: "14px",
                fontWeight: 500
              }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="CloseRequested">Close Requested</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Premium DYNAMIC Status Filter Buttons */}
          <div className="d-flex gap-3 mb-4 flex-wrap">
            {[
              { label: "All", displayLabel: "All Statuses" },
              { label: "Pending", displayLabel: "Pending" },
              { label: "Active", displayLabel: "Active" },
              { label: "CloseRequested", displayLabel: "Close Requested" },
              { label: "Closed", displayLabel: "Closed" },
            ].map((item) => {
              const isActive = statusFilter === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setStatusFilter(item.label)}
                  style={{
                    border: "none",
                    background: isActive ? "#173B73" : "#F1F5F9",
                    color: isActive ? "#FFFFFF" : "#334155",
                    borderRadius: "12px",
                    padding: "12px 20px",
                    fontWeight: 600,
                    fontSize: "14px",
                    boxShadow: isActive ? "0 4px 14px rgba(23,59,115,0.2)" : "0 2px 6px rgba(15,23,42,0.02)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    if (!isActive) e.currentTarget.style.background = "#E2E8F0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    if (!isActive) e.currentTarget.style.background = "#F1F5F9";
                  }}
                >
                  <span>{item.displayLabel}</span>
                  <span 
                    style={{ 
                      background: isActive ? "rgba(255, 255, 255, 0.2)" : "rgba(23, 59, 115, 0.08)", 
                      color: isActive ? "#FFFFFF" : "#173B73",
                      padding: "2px 8px", 
                      borderRadius: "6px",
                      fontSize: "12px",
                      marginLeft: "4px",
                      display: "inline-block",
                      fontWeight: 700
                    }}
                  >
                    {item.label === "All" 
                      ? accounts.length 
                      : accounts.filter((a) => a.status === item.label).length
                    }
                  </span>
                </button>
              );
            })}
          </div>

          {/* Premium Managed Data Table Wrapper */}
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
                        <th className="py-3 px-4" style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>#</th>
                        <th className="py-3" style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Account Number</th>
                        <th className="py-3" style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Owner</th>
                        <th className="py-3" style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Type</th>
                        <th className="py-3" style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Balance</th>
                        <th className="py-3" style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Branch</th>
                        <th className="py-3" style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Status</th>
                        <th className="py-3 px-4 text-center" style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600, borderBottom: "none" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-5 text-muted">
                            No active account entries matched your layout filters.
                          </td>
                        </tr>
                      ) : (
                        filtered.map((acc, i) => (
                          <tr key={acc.accountId} style={{ verticalAlign: "middle", borderBottom: "1px solid #F1F5F9" }}>
                            <td className="px-4" style={{ color: "#64748B", fontSize: "14px" }}>{i + 1}</td>
                            <td className="fw-semibold" style={{ color: "#334155", fontSize: "14px" }}>{acc.accountNumber}</td>
                            <td style={{ color: "#334155", fontSize: "14px" }}>{acc.ownerName}</td>
                            <td style={{ color: "#475569", fontSize: "14px" }}>{acc.accountType}</td>
                            <td className="fw-bold" style={{ color: "#15803D", fontSize: "14px" }}>
                              ₹{acc.balance.toLocaleString("en-IN")}
                            </td>
                            <td style={{ color: "#475569", fontSize: "14px" }}>{acc.branchName}</td>
                            <td>
                              <span
                                style={{
                                  background:
                                    acc.status === "Active"
                                      ? "#DCFCE7"
                                      : acc.status === "Pending"
                                      ? "#FEF3C7"
                                      : acc.status === "CloseRequested"
                                      ? "#DBEAFE"
                                      : "#FEE2E2",
                                  color:
                                    acc.status === "Active"
                                      ? "#166534"
                                      : acc.status === "Pending"
                                      ? "#92400E"
                                      : acc.status === "CloseRequested"
                                      ? "#1E40AF"
                                      : "#991B1B",
                                  padding: "6px 12px",
                                  borderRadius: "8px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  display: "inline-block"
                                }}
                              >
                                {acc.status === "CloseRequested" ? "Close Requested" : acc.status}
                              </span>
                            </td>
                            <td className="px-4">
                              <div className="d-flex gap-2 justify-content-center">
                                {acc.status === "Pending" && (
                                  <button
                                    className="btn btn-sm fw-semibold"
                                    onClick={() => handleApprove(acc.accountId)}
                                    style={{
                                      background: "linear-gradient(135deg,#173B73,#1E3A5F)",
                                      border: "none",
                                      color: "#fff",
                                      borderRadius: "10px",
                                      padding: "6px 14px",
                                      fontSize: "13px"
                                    }}
                                  >
                                    Approve
                                  </button>
                                )}
                                {(acc.status === "Active" ||
                                  acc.status === "CloseRequested") && (
                                  <button
                                    className="btn btn-sm fw-semibold"
                                    onClick={() => handleClose(acc.accountId)}
                                    style={{
                                      background: "#FEE2E2",
                                      border: "1px solid rgba(220,38,38,0.10)",
                                      color: "#991B1B",
                                      borderRadius: "10px",
                                      padding: "6px 14px",
                                      fontSize: "13px"
                                    }}
                                  >
                                    Close
                                  </button>
                                )}
                              </div>
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

export default ManageAccounts;