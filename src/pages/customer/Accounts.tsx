import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getMyAccounts, requestCloseAccount } from "../../services/accountService";
import { AccountResponse } from "../../types/account.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const fetchAccounts = async () => {
    try {
      const res = await getMyAccounts();
      if (res.success) setAccounts(res.data);
    } catch {
      toast.error("Failed to load accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleCloseRequest = async (id: number) => {
    try {
      const res = await requestCloseAccount(id);
      if (res.success) {
        toast.success("Account closure request submitted.");
        fetchAccounts();
      } else {
        toast.error(res.message || "Unable to submit closure request.");
      }
    } catch {
      toast.error("Failed to submit closure request.");
    } finally {
      setConfirmingId(null);
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

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#173B73",
                  fontSize: "30px",
                }}
              >
                My Accounts
              </h2>

              <p
                style={{
                  color: "#64748B",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                View and manage your bank accounts
              </p>
            </div>

            <a
              href="/customer/open-account"
              className="btn text-white"
              style={{
                background: "linear-gradient(135deg,#173B73,#1E3A5F)",
                border: "none",
                borderRadius: "12px",
                padding: "10px 18px",
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(23,59,115,0.15)",
              }}
            >
              + Open New Account
            </a>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#173B73" }} />
            </div>
          ) : (
            <div className="row g-3">
              {accounts.length === 0 ? (
                <div className="col-12 text-center py-5 text-muted">
                  No accounts found. Open your first account!
                </div>
              ) : (
                accounts.map((acc) => (
                  <div className="col-md-6" key={acc.accountId}>
                    <div
                      className="card border-0 h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                        background: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
                      }}
                    >
                      <div
                        className="card-header text-white border-0"
                        style={{
                          background: "linear-gradient(135deg,#173B73,#1E3A5F)",
                          boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.08)",
                          borderRadius: "12px 12px 0 0",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">{acc.accountType} Account</span>
                          <span
                            style={{
                              background:
                                acc.status === "Active"
                                  ? "#DCFCE7"
                                  : acc.status === "Pending"
                                  ? "#FEF9C3"
                                  : "#FEE2E2",
                              color:
                                acc.status === "Active"
                                  ? "#15803D"
                                  : acc.status === "Pending"
                                  ? "#854D0E"
                                  : "#991B1B",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {acc.status}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <small
                            style={{
                              color: "#64748B",
                              fontSize: "12px",
                            }}
                          >
                            Account Number
                          </small>
                          <p className="fw-bold mb-0 fs-6">{acc.accountNumber}</p>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <small
                              style={{
                                color: "#64748B",
                                fontSize: "12px",
                              }}
                            >
                              Balance
                            </small>
                            <p
                              className="fw-bold mb-0"
                              style={{
                                color: "#173B73",
                              }}
                            >
                              ₹{acc.balance.toLocaleString()}
                            </p>
                          </div>
                          <div className="col-6">
                            <small
                              style={{
                                color: "#64748B",
                                fontSize: "12px",
                              }}
                            >
                              IFSC Code
                            </small>
                            <p className="fw-semibold mb-0">{acc.ifscCode}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <small
                            style={{
                              color: "#64748B",
                              fontSize: "12px",
                            }}
                          >
                            Branch
                          </small>
                          <p className="mb-0">{acc.branchName}</p>
                        </div>
                      </div>
                      {acc.status === "Active" && (
                        <div className="card-footer bg-white border-0 pt-0">
                          {confirmingId === acc.accountId ? (
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-danger flex-grow-1"
                                style={{
                                  borderRadius: "10px",
                                  fontWeight: 600,
                                  padding: "10px",
                                }}
                                onClick={() => handleCloseRequest(acc.accountId)}
                              >
                                Confirm Close
                              </button>
                              <button
                                className="btn btn-sm btn-light"
                                style={{
                                  border: "1px solid #E2E8F0",
                                  borderRadius: "10px",
                                  fontWeight: 600,
                                  padding: "10px 15px",
                                }}
                                onClick={() => setConfirmingId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-sm w-100"
                              style={{
                                border: "1px solid rgba(220,38,38,0.15)",
                                background: "#FEF2F2",
                                color: "#B91C1C",
                                borderRadius: "10px",
                                fontWeight: 600,
                                padding: "10px",
                              }}
                              onClick={() => setConfirmingId(acc.accountId)}
                            >
                              Request Account Closure
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;