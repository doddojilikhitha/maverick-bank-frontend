import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getAllLoans, approveLoan, rejectLoan, disburseLoan } from "../../services/loanService";
import { LoanResponse } from "../../types/loan.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageLoans: React.FC = () => {
  const [loans, setLoans] = useState<LoanResponse[]>([]);
  const [filtered, setFiltered] = useState<LoanResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      const res = await getAllLoans();
      if (res.success) {
        setLoans(res.data);
        setFiltered(res.data);
      }
    } catch {
      toast.error("Failed to load loans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    if (statusFilter === "All") {
      setFiltered(loans);
    } else {
      setFiltered(loans.filter((l) => l.status === statusFilter));
    }
  }, [statusFilter, loans]);

  const handleApprove = async (id: number) => {
    try {
      const res = await approveLoan(id);
      if (res.success) {
        toast.success("Loan approved! ✅");
        fetchLoans();
      } else {
        toast.error("Loan approval failed due to eligibility criteria.");
      }
    } catch {
      toast.error("Approval failed.");
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await rejectLoan(id);
      if (res.success) {
        toast.success("Loan rejected successfully.");
        fetchLoans();
      } else {
        toast.error("Unable to reject loan request.");
      }
    } catch {
      toast.error("Rejection failed.");
    }
  };

  const handleDisburse = async (id: number) => {
    try {
      const res = await disburseLoan(id);
      if (res.success) {
        toast.success("Loan disbursed successfully! 💰");
        fetchLoans();
      } else {
        toast.error("Unable to disburse loan. Please try again.");
      }
    } catch {
      toast.error("Something went wrong while disbursing the loan.");
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#173B73",
                  fontSize: "30px",
                }}
              >
                Manage Loans
              </h2>
              <p
                style={{
                  color: "#64748B",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                Review and manage customer loan requests
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
                color: "#1E293B",
                fontWeight: 500,
              }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Disbursed">Disbursed</option>
            </select>
          </div>

          {/* Custom Navigation / Filter Tabs */}
          <div className="d-flex gap-3 mb-4 flex-wrap">
            {[
              { label: "All Statuses", value: "All" },
              { label: "Pending", value: "Pending" },
              { label: "Approved", value: "Approved" },
              { label: "Rejected", value: "Rejected" },
              { label: "Disbursed", value: "Disbursed" },
            ].map((item) => {
              const isActive = statusFilter === item.value;
              const count = item.value === "All" 
                ? loans.length 
                : loans.filter((l) => l.status === item.value).length;

              return (
                <button
                  key={item.value}
                  onClick={() => setStatusFilter(item.value)}
                  style={{
                    border: "none",
                    background: isActive ? "#173B73" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "#1E293B",
                    borderRadius: "12px",
                    padding: "12px 20px",
                    fontWeight: 600,
                    fontSize: "14px",
                    boxShadow: "0 4px 10px rgba(15,23,42,0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.label}
                  <span
                    style={{
                      background: isActive ? "rgba(255,255,255,0.2)" : "#E2E8F0",
                      color: isActive ? "#FFFFFF" : "#64748B",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

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
                boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
              }}
            >
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead
                      style={{
                        background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                      }}
                    >
                      <tr>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>#</th>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Loan Product</th>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>User ID</th>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Amount</th>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Interest</th>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Purpose</th>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Applied On</th>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Status</th>
                        <th style={{ color: "#FFFFFF", padding: "16px", fontWeight: 600 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center py-5 text-muted">
                            No loans found.
                          </td>
                        </tr>
                      ) : (
                        filtered.map((loan, i) => (
                          <tr key={loan.loanId} className="align-middle">
                            <td style={{ padding: "16px", color: "#64748B" }}>{i + 1}</td>
                            <td style={{ padding: "16px", fontWeight: 600, color: "#1E293B" }}>
                              {loan.productName}
                            </td>
                            <td style={{ padding: "16px", color: "#334155" }}>{loan.userId}</td>
                            <td
                              style={{
                                padding: "16px",
                                fontWeight: 700,
                                color: "#16A34A",
                              }}
                            >
                              ₹{loan.amountApplied.toLocaleString("en-IN")}
                            </td>
                            <td style={{ padding: "16px", color: "#334155" }}>{loan.interestRate}%</td>
                            <td
                              style={{
                                padding: "16px",
                                color: "#334155",
                                maxWidth: "150px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {loan.purpose || "—"}
                            </td>
                            <td style={{ padding: "16px", fontSize: "13px", color: "#64748B" }}>
                              {new Date(loan.appliedOn).toLocaleDateString()}
                            </td>
                            <td style={{ padding: "16px" }}>
                              <span
                                style={{
                                  background:
                                    loan.status === "Approved"
                                      ? "#DBEAFE"
                                      : loan.status === "Disbursed"
                                      ? "#DCFCE7"
                                      : loan.status === "Rejected"
                                      ? "#FEE2E2"
                                      : "#FEF3C7",
                                  color:
                                    loan.status === "Approved"
                                      ? "#1E40AF"
                                      : loan.status === "Disbursed"
                                      ? "#166534"
                                      : loan.status === "Rejected"
                                      ? "#991B1B"
                                      : "#92400E",
                                  padding: "6px 12px",
                                  borderRadius: "8px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  display: "inline-block",
                                }}
                              >
                                {loan.status}
                              </span>
                            </td>
                            <td style={{ padding: "16px" }}>
                              <div className="d-flex gap-2">
                                {loan.status === "Pending" && (
                                  <>
                                    <button
                                      className="btn btn-sm"
                                      style={{
                                        background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                                        border: "none",
                                        color: "#FFFFFF",
                                        borderRadius: "10px",
                                        padding: "6px 14px",
                                        fontWeight: 500,
                                      }}
                                      onClick={() => handleApprove(loan.loanId)}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="btn btn-sm"
                                      style={{
                                        background: "#FEE2E2",
                                        border: "1px solid rgba(220, 38, 38, 0.10)",
                                        color: "#991B1B",
                                        borderRadius: "10px",
                                        padding: "6px 14px",
                                        fontWeight: 500,
                                      }}
                                      onClick={() => handleReject(loan.loanId)}
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                {loan.status === "Approved" && (
                                  <button
                                    className="btn btn-sm"
                                    style={{
                                      background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                                      border: "none",
                                      color: "#FFFFFF",
                                      borderRadius: "10px",
                                      padding: "6px 16px",
                                      fontWeight: 500,
                                    }}
                                    onClick={() => handleDisburse(loan.loanId)}
                                  >
                                    Disburse
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

export default ManageLoans;