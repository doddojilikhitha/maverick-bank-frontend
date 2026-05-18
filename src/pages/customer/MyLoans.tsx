import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getMyLoans } from "../../services/loanService";
import { LoanResponse } from "../../types/loan.types";
import { useNavigate } from "react-router-dom";

const MyLoans: React.FC = () => {
  const [loans, setLoans] = useState<LoanResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyLoans().then((res) => {
      if (res.success) setLoans(res.data);
      setLoading(false);
    });
  }, []);

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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#173B73",
                  fontSize: "30px",
                }}
              >
                My Loan Applications
              </h2>
              <p
                style={{
                  color: "#64748B",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                Track and manage your loan requests
              </p>
            </div>

            <button
              className="btn text-white"
              style={{
                background: "linear-gradient(135deg,#173B73,#1E3A5F)",
                border: "none",
                borderRadius: "12px",
                padding: "10px 18px",
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(23,59,115,0.15)",
              }}
              onClick={() => navigate("/customer/loan-products")}
            >
              Apply New Loan
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#173B73" }} />
            </div>
          ) : loans.length === 0 ? (
            <div className="text-center py-5">
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg,#DCEBFF,#C7DBF7)",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  color: "#173B73",
                  fontWeight: 700,
                }}
              >
                ₹
              </div>
              <h5 className="text-muted mt-3">No loan applications yet</h5>
              <button
                className="btn text-white mt-3"
                style={{
                  background: "linear-gradient(135deg,#173B73,#1E3A5F)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 18px",
                  fontWeight: 600,
                }}
                onClick={() => navigate("/customer/loan-products")}
              >
                View Loan Products
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {loans.map((loan) => (
                <div className="col-md-6" key={loan.loanId}>
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
                      className="card-header border-0 text-white"
                      style={{
                        background: "linear-gradient(135deg,#173B73,#1E3A5F)",
                        borderRadius: "12px 12px 0 0",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold">{loan.productName}</span>
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
                          }}
                        >
                          {loan.status}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <small className="text-muted">Amount Applied</small>
                          <p className="fw-bold mb-0" style={{ color: "#173B73" }}>
                            ₹{loan.amountApplied.toLocaleString()}
                          </p>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Interest Rate</small>
                          <p className="fw-bold mb-0 text-warning">
                            {loan.interestRate}% p.a.
                          </p>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Tenure</small>
                          <p className="mb-0">{loan.tenureMonths} months</p>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Applied On</small>
                          <p className="mb-0" style={{ fontSize: "13px" }}>
                            {new Date(loan.appliedOn).toLocaleDateString()}
                          </p>
                        </div>
                        {loan.purpose && (
                          <div className="col-12">
                            <small className="text-muted">Purpose</small>
                            <p className="mb-0">{loan.purpose}</p>
                          </div>
                        )}
                        {loan.disbursedOn && (
                          <div className="col-12">
                            <small className="text-muted">Disbursed On</small>
                            <p className="mb-0 text-success fw-semibold">
                              {new Date(loan.disbursedOn).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLoans;