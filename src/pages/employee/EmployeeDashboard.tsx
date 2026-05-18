import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getAllAccounts } from "../../services/accountService";
import { getAllLoans } from "../../services/loanService";
import { getAllTransactions } from "../../services/transactionService";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  FileText, 
  CheckCheck, 
  RefreshCw,
  BarChart3,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const EmployeeDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalAccounts: 0,
    pendingAccounts: 0,
    activeAccounts: 0,
    totalLoans: 0,
    pendingLoans: 0,
    approvedLoans: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, loanRes, txnRes] = await Promise.all([
          getAllAccounts(),
          getAllLoans(),
          getAllTransactions(),
        ]);

        const accounts = accRes.success ? accRes.data : [];
        const loans = loanRes.success ? loanRes.data : [];
        const transactions = txnRes.success ? txnRes.data : [];

        setStats({
          totalAccounts: accounts.length,
          pendingAccounts: accounts.filter((a: any) => a.status === "Pending").length,
          activeAccounts: accounts.filter((a: any) => a.status === "Active").length,
          totalLoans: loans.length,
          pendingLoans: loans.filter((l: any) => l.status === "Pending").length,
          approvedLoans: loans.filter((l: any) => l.status === "Approved").length,
          totalTransactions: transactions.length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loanChartData = [
    { name: "Pending", value: stats.pendingLoans, color: "#B08D57" },
    { name: "Approved", value: stats.approvedLoans, color: "#4F6D8A" },
    { name: "Rejected", value: 3, color: "#991B1B" },
    { name: "Disbursed", value: 1, color: "#166534" },
  ];

  const COLORS = [
    "#4F6D8A", 
    "#7C9A92", 
    "#B08D57", 
    "#5A6C84", 
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

  const accountStats = [
    { label: "Total Accounts", value: stats.totalAccounts, icon: <Building2 size={24} color="#D6E8EE" /> },
    { label: "Pending Approvals", value: stats.pendingAccounts, icon: <Clock size={24} color="#D6E8EE" /> },
    { label: "Active Accounts", value: stats.activeAccounts, icon: <CheckCircle2 size={24} color="#D6E8EE" /> },
    { label: "Total Transactions", value: stats.totalTransactions, icon: <RefreshCw size={24} color="#D6E8EE" /> },
  ];

  const loanStats = [
    { label: "Total Loans", value: stats.totalLoans, icon: <CreditCard size={24} color="#D6E8EE" /> },
    { label: "Pending Loans", value: stats.pendingLoans, icon: <FileText size={24} color="#D6E8EE" /> },
    { label: "Approved Loans", value: stats.approvedLoans, icon: <CheckCheck size={24} color="#D6E8EE" /> },
  ];

  const quickActions = [
    { label: "Manage Accounts", icon: <Building2 size={22} />, path: "/employee/accounts" },
    { label: "Manage Loans", icon: <CreditCard size={22} />, path: "/employee/loans" },
    { label: "All Transactions", icon: <RefreshCw size={22} />, path: "/employee/transactions" },
    { label: "Reports", icon: <BarChart3 size={22} />, path: "/employee/reports" },
  ];

  const loanMiniCards = [
    { label: "Pending Loans", value: stats.pendingLoans, icon: <Clock size={18} color="#92400E" />, bg: "#FEF3C7", text: "#92400E" },
    { label: "Approved Loans", value: stats.approvedLoans, icon: <CheckCheck size={18} color="#1E40AF" />, bg: "#DBEAFE", text: "#1E40AF" },
    { label: "Rejected Loans", value: 3, icon: <XCircle size={18} color="#991B1B" />, bg: "#FEE2E2", text: "#991B1B" },
    { label: "Disbursed Loans", value: 1, icon: <TrendingUp size={18} color="#166534" />, bg: "#DCFCE7", text: "#166534" },
  ];

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
              {/* Account and Core Stats Row - content now hits instantly! */}
              <div className="row g-3 mb-3">
                {accountStats.map((card, idx) => (
                  <div className="col-md-3 col-6" key={idx}>
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
                          <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>{card.label}</p>
                          <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>{card.value}</h4>
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
                          {card.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loan Breakdown Stats Row */}
              <div className="row g-3 mb-4">
                {loanStats.map((card, idx) => (
                  <div className="col-md-4 col-12" key={idx}>
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
                          <p className="mb-1" style={{ color: "#D6E8EE", fontSize: "13px", fontWeight: 500 }}>{card.label}</p>
                          <h4 className="fw-bold mb-0" style={{ color: "#FFFFFF" }}>{card.value}</h4>
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
                          {card.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loan Status Chart & Mini Cards Section */}
              <div
                className="card border-0 mb-4"
                style={{
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)",
                }}
              >
                <div className="card-header bg-transparent border-0 pt-4 px-4 pb-2">
                  <h5 className="fw-bold mb-0" style={{ color: "#0F172A", fontSize: "16px" }}>
                    Loan Status Overview
                  </h5>
                  <small style={{ color: "#64748B" }}>
                    Operational breakdown of incoming credit facilities
                  </small>
                </div>
                <div className="card-body" style={{ padding: "24px" }}>
                  <div className="row align-items-center">
                    {/* Pie Chart */}
                    <div className="col-md-7">
                      <div style={{ width: "100%", height: "240px" }}>
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie
                              data={loanChartData}
                              cx="50%"
                              cy="50%"
                              outerRadius={75}
                              dataKey="value"
                            >
                              {loanChartData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Premium Mini Metrics Cards */}
                    <div className="col-md-5">
                      <div className="row g-2" style={{ paddingRight: "16px" }}>
                        {loanMiniCards.map((miniCard) => (
                          <div className="col-6" key={miniCard.label}>
                            <div 
                              style={{
                                background: miniCard.bg,
                                borderRadius: "14px",
                                padding: "14px",
                                border: "1px solid transparent",
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px"
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-between">
                                <span style={{ fontSize: "12px", fontWeight: 600, color: miniCard.text }}>
                                  {miniCard.label}
                                </span>
                                {miniCard.icon}
                              </div>
                              <h5 className="fw-bold mb-0" style={{ color: miniCard.text }}>
                                {miniCard.value}
                              </h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div
                className="card border-0"
                style={{
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)"
                }}
              >
                <div className="card-header bg-transparent border-0 pt-4 px-4 pb-2">
                  <h5 className="fw-bold mb-0" style={{ color: "#0F172A", fontSize: "16px" }}>
                    Quick Actions
                  </h5>
                </div>
                <div className="card-body px-4 pb-4">
                  <div className="row g-3">
                    {quickActions.map((action) => (
                      <div className="col-md-3 col-6" key={action.label}>
                        <Link to={action.path} className="text-decoration-none">
                          <div
                            className="card text-center border-0 p-3 h-100"
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
                            <small className="fw-semibold" style={{ color: "#FFFFFF", fontSize: "13px" }}>
                              {action.label}
                            </small>
                          </div>
                        </Link>
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

export default EmployeeDashboard;