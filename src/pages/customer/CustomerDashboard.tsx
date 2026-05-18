import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getMyAccounts } from "../../services/accountService";
import { getMyLoans } from "../../services/loanService";
import { AccountResponse } from "../../types/account.types";
import { LoanResponse } from "../../types/loan.types";
import { useAuth } from "../../context/AuthContext";
import { getLast10 } from "../../services/transactionService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Wallet,
  Landmark,
  CreditCard,
  Clock3,
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  BadgeDollarSign,
  Receipt,
  PlusCircle,
} from "lucide-react";

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [loans, setLoans] = useState<LoanResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, loanRes] = await Promise.all([
          getMyAccounts(),
          getMyLoans(),
        ]);

        if (accRes.success) {
          setAccounts(accRes.data);
          const activeAccount = accRes.data.find((a: any) => a.status === "Active");

          if (activeAccount) {
            const txnRes = await getLast10(activeAccount.accountId);
            if (txnRes.success) {
              setTransactions(txnRes.data);
            }
          }
        }

        if (loanRes.success) {
          setLoans(loanRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalBalance = accounts
    .filter((a) => a.status === "Active")
    .reduce((sum, a) => sum + a.balance, 0);

  const activeLoans = loans.filter((l) => l.status === "Disbursed").length;
  const pendingLoans = loans.filter((l) => l.status === "Pending").length;

  const depositsCount = transactions.filter((t) =>
    t.type?.toLowerCase().includes("deposit")
  ).length;

  const withdrawalsCount = transactions.filter((t) =>
    t.type?.toLowerCase().includes("withdraw")
  ).length;

  const transfersCount = transactions.filter((t) =>
    t.type?.toLowerCase().includes("transfer")
  ).length;

  const chartData = [
    { name: "Deposits", value: depositsCount },
    { name: "Withdrawals", value: withdrawalsCount },
    { name: "Transfers", value: transfersCount },
  ];

  const COLORS = [
    "#4F6D8A", // steel blue
    "#7C9A92", // muted sage
    "#B08D57", // muted gold
  ];

  const premiumStatCardStyle = {
    borderRadius: "18px",
    background: "linear-gradient(135deg,#173B73,#1E3A5F)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 30px rgba(23,59,115,0.18)",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const premiumCardBodyStyle = {
    padding: "20px",
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div
          className="dashboard-content"
          style={{
            padding: "32px",
            background: "linear-gradient(180deg,#DCEBFF 0%, #EEF4FF 100%)",
            minHeight: "100vh",
          }}
        >
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#173B73" }} />
            </div>
          ) : (
            <>
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div 
                    className="card h-100 border-0" 
                    style={premiumStatCardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 15px 35px rgba(23,59,115,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(23,59,115,0.18)";
                    }}
                  >
                    <div className="card-body d-flex justify-content-between align-items-center" style={premiumCardBodyStyle}>
                      <div>
                        <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>Total Balance</p>
                        <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>₹{totalBalance.toLocaleString()}</h4>
                      </div>
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.12)",
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Wallet size={24} color="#D6E8EE" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div 
                    className="card h-100 border-0" 
                    style={premiumStatCardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 15px 35px rgba(23,59,115,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(23,59,115,0.18)";
                    }}
                  >
                    <div className="card-body d-flex justify-content-between align-items-center" style={premiumCardBodyStyle}>
                      <div>
                        <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>Active Accounts</p>
                        <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>
                          {accounts.filter((a) => a.status === "Active").length}
                        </h4>
                      </div>
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.12)",
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Landmark size={24} color="#D6E8EE" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div 
                    className="card h-100 border-0" 
                    style={premiumStatCardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 15px 35px rgba(23,59,115,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(23,59,115,0.18)";
                    }}
                  >
                    <div className="card-body d-flex justify-content-between align-items-center" style={premiumCardBodyStyle}>
                      <div>
                        <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>Active Loans</p>
                        <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>{activeLoans}</h4>
                      </div>
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.12)",
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CreditCard size={24} color="#D6E8EE" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div 
                    className="card h-100 border-0" 
                    style={premiumStatCardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 15px 35px rgba(23,59,115,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(23,59,115,0.18)";
                    }}
                  >
                    <div className="card-body d-flex justify-content-between align-items-center" style={premiumCardBodyStyle}>
                      <div>
                        <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>Pending Loans</p>
                        <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>{pendingLoans}</h4>
                      </div>
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.12)",
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Clock3 size={24} color="#D6E8EE" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="card border-0 mb-4"
                style={{ 
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)"
                }}
              >
                <div className="card-header bg-transparent border-0 pt-4 px-4 pb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="fw-bold mb-0" style={{ color: "#0F172A", fontSize: "16px" }}>
                        Transaction Overview
                      </h5>
                      <small style={{ color: "#64748B" }}>
                        Recent transaction activity
                      </small>
                    </div>
                    <div
                      style={{
                        background: "#F1F5F9",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        color: "#475569",
                        fontWeight: 600,
                        fontSize: "12px",
                      }}
                    >
                      Last 10 Transactions
                    </div>
                  </div>
                </div>
                <div className="card-body" style={{ padding: "24px" }}>
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <div style={{ width: "100%", height: "220px" }}>
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              outerRadius={75}
                              dataKey="value"
                            >
                              {chartData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className="d-flex flex-column gap-2" style={{ paddingRight: "16px" }}>
                        <div style={{ background: "linear-gradient(135deg,#173B73,#245A92)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "12px" }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-semibold" style={{ color: "#D6E8EE", fontSize: "14px" }}>Deposits</span>
                            <strong style={{ color: "#FFFFFF" }}>{depositsCount}</strong>
                          </div>
                        </div>

                        <div style={{ background: "linear-gradient(135deg,#2A4365,#1E3A5F)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "12px" }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-semibold" style={{ color: "#D6E8EE", fontSize: "14px" }}>Withdrawals</span>
                            <strong style={{ color: "#FFFFFF" }}>{withdrawalsCount}</strong>
                          </div>
                        </div>

                        <div style={{ background: "linear-gradient(135deg,#355C7D,#173B73)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "12px" }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-semibold" style={{ color: "#D6E8EE", fontSize: "14px" }}>Transfers</span>
                            <strong style={{ color: "#FFFFFF" }}>{transfersCount}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="card border-0 mb-4"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)"
                }}
              >
                <div className="card-header bg-transparent border-0 pt-4 px-4 pb-3">
                  <h5 className="fw-bold mb-0" style={{ color: "#0F172A", fontSize: "16px" }}>My Accounts</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ background: "#F8FAFC", color: "#475569", borderBottom: "1px solid #E2E8F0" }}>
                        <tr>
                          <th className="py-3 px-4" style={{ fontSize: "13px", fontWeight: 600 }}>Account Number</th>
                          <th className="py-3" style={{ fontSize: "13px", fontWeight: 600 }}>Type</th>
                          <th className="py-3" style={{ fontSize: "13px", fontWeight: 600 }}>Branch</th>
                          <th className="py-3" style={{ fontSize: "13px", fontWeight: 600 }}>Balance</th>
                          <th className="py-3" style={{ fontSize: "13px", fontWeight: 600 }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accounts.length === 0 ? (
                          <tr><td colSpan={5} className="text-center py-4 text-muted">No accounts found</td></tr>
                        ) : (
                          accounts.map((acc) => (
                            <tr key={acc.accountId} style={{ verticalAlign: "middle", borderBottom: "1px solid #F1F5F9" }}>
                              <td className="fw-semibold px-4" style={{ color: "#334155", fontSize: "14px" }}>{acc.accountNumber}</td>
                              <td style={{ color: "#475569", fontSize: "14px" }}>{acc.accountType}</td>
                              <td style={{ color: "#475569", fontSize: "14px" }}>{acc.branchName}</td>
                              <td className="fw-bold" style={{ color: "#0F172A", fontSize: "14px" }}>
                                ₹{acc.balance.toLocaleString()}
                              </td>
                              <td>
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
                                    padding: "4px 10px",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {acc.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div 
                className="card border-0"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)",
                  borderRadius: "16px"
                }}
              >
                <div className="card-header bg-transparent border-0 pt-4 px-4 pb-2">
                  <h5 className="fw-bold mb-0" style={{ color: "#0F172A", fontSize: "16px" }}>
                    Quick Actions
                  </h5>
                </div>
                <div className="card-body px-4 pb-4">
                  <div className="row g-3">
                    {[
                      { label: "Deposit", icon: <ArrowDownLeft size={22} />, path: "/customer/deposit" },
                      { label: "Withdraw", icon: <ArrowUpRight size={22} />, path: "/customer/withdraw" },
                      { label: "Transfer", icon: <Repeat size={22} />, path: "/customer/transfer" },
                      { label: "Apply Loan", icon: <BadgeDollarSign size={22} />, path: "/customer/apply-loan" },
                      { label: "Transactions", icon: <Receipt size={22} />, path: "/customer/transactions" },
                      { label: "Open Account", icon: <PlusCircle size={22} />, path: "/customer/open-account" },
                    ].map((action) => (
                      <div className="col-md-2 col-4" key={action.label}>
                        <a href={action.path} className="text-decoration-none">
                          <div
                            className="card text-center border-0 p-3"
                            style={{
                              cursor: "pointer",
                              borderRadius: "12px",
                              background: "linear-gradient(135deg,#173B73,#1E3A5F)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "linear-gradient(135deg,#245A92,#173B73)";
                              e.currentTarget.style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "linear-gradient(135deg,#173B73,#1E3A5F)";
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            <div
                              className="action-icon-bg"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "10px",
                                background: "rgba(255,255,255,0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 10px",
                                color: "#D6E8EE",
                                transition: "background 0.2s ease"
                              }}
                            >
                              {action.icon}
                            </div>
                            <small className="fw-semibold" style={{ color: "#FFFFFF", fontSize: "13px" }}>{action.label}</small>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;