import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios   from "../../utils/axiosConfig";
import { API_URLS } from "../../utils/constants";
import { useAuth }  from "../../context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Users,
  UserCheck,
  Briefcase,
  Activity,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [users,   setUsers]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URLS.ALL_USERS).then((res) => {
      if (res.data.success) setUsers(res.data.data);
      setLoading(false);
    });
  }, []);

  const customers   = users.filter((u) => u.role === "Customer");
  const employees   = users.filter((u) => u.role === "Employee");
  const activeUsers = users.filter((u) => u.isActive);

  const chartData = [
    { name: "Customers", value: customers.length },
    { name: "Employees", value: employees.length },
  ];

  const COLORS = [
    "#15803D", // Green for Customers
    "#6B21A8", // Purple for Employees
  ];

  const statCards = [
    { label: "Total Users",   value: users.length,       icon: <Users size={24} color="#D6E8EE" /> },
    { label: "Customers",      value: customers.length,    icon: <UserCheck size={24} color="#D6E8EE" /> },
    { label: "Employees",      value: employees.length,    icon: <Briefcase size={24} color="#D6E8EE" /> },
    { label: "Active Users",   value: activeUsers.length,  icon: <Activity size={24} color="#D6E8EE" /> },
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
    <div className="dashboard-layout" style={{ overflowX: "hidden" }}>
      <Sidebar />
      <div 
        style={{ 
          flex: 1, 
          flexDirection: "column", 
          display: "flex",
          width: "100%",
          overflowX: "hidden" 
        }}
      >
        <Navbar />
        <div 
          className="dashboard-content"
          style={{
            padding: window.innerWidth < 768 ? "16px" : "32px",
            background: "linear-gradient(180deg,#DCEBFF 0%, #EEF4FF 100%)",
            minHeight: "100vh",
            overflowX: "hidden",
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#173B73" }} />
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="row g-3 mb-4">
                {statCards.map((card) => (
                  <div className="col-xl-3 col-md-6 col-6" key={card.label}>
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
                      <div className="card-body d-flex justify-content-between align-items-center flex-wrap" style={premiumCardBodyStyle}>
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

              {/* User Distribution Pie Chart */}
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
                        User Distribution Overview
                      </h5>
                      <small style={{ color: "#64748B" }}>
                        Role-based registration insights
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
                      Live Metrics
                    </div>
                  </div>
                </div>
                <div className="card-body" style={{ padding: "24px" }}>
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-12 mb-3 mb-lg-0">
                      <div style={{ width: "100%", height: window.innerWidth < 768 ? "180px" : "220px" }}>
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

                    <div className="col-lg-5 col-12">
                      <div className="d-flex flex-column gap-2" style={{ paddingRight: "16px" }}>
                        <div style={{ background: "linear-gradient(135deg,#15803D,#166534)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "12px" }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-semibold" style={{ color: "#DCFCE7", fontSize: "14px" }}>Customers</span>
                            <strong style={{ color: "#FFFFFF" }}>{customers.length}</strong>
                          </div>
                        </div>

                        <div style={{ background: "linear-gradient(135deg,#6B21A8,#5B21B6)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "12px" }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-semibold" style={{ color: "#F3E8FF", fontSize: "14px" }}>Employees</span>
                            <strong style={{ color: "#FFFFFF" }}>{employees.length}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Users */}
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
                  <h5 className="fw-bold mb-0" style={{ color: "#0F172A", fontSize: "16px" }}>Recent Users</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive" style={{ overflowX: "auto" }}>
                    <table className="table table-hover mb-0" style={{ minWidth: "100%" }}>
                      <thead style={{ background: "#F8FAFC", color: "#475569", borderBottom: "1px solid #E2E8F0" }}>
                        <tr>
                          <th className="py-3 px-4" style={{ fontSize: "13px", fontWeight: 600 }}>Name</th>
                          <th className="py-3" style={{ fontSize: "13px", fontWeight: 600 }}>Email</th>
                          <th className="py-3" style={{ fontSize: "13px", fontWeight: 600 }}>Role</th>
                          <th className="py-3" style={{ fontSize: "13px", fontWeight: 600 }}>Status</th>
                          <th className="py-3 px-4" style={{ fontSize: "13px", fontWeight: 600 }}>Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 5).map((u) => (
                          <tr key={u.userId} style={{ verticalAlign: "middle", borderBottom: "1px solid #F1F5F9" }}>
                            <td className="fw-semibold px-4" style={{ color: "#334155", fontSize: "14px" }}>{u.fullName}</td>
                            <td style={{ color: "#475569", fontSize: "14px" }}>{u.email}</td>
                            <td style={{ fontSize: "14px" }}>
                              <span
                                style={{
                                  background: u.role === "Admin" ? "#FEE2E2" : u.role === "Employee" ? "#F3E8FF" : "#DCFCE7",
                                  color: u.role === "Admin" ? "#991B1B" : u.role === "Employee" ? "#6B21A8" : "#166534",
                                  padding: "4px 10px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td>
                              <span
                                style={{
                                  background: u.isActive ? "#DCFCE7" : "#F1F5F9",
                                  color: u.isActive ? "#15803D" : "#475569",
                                  padding: "4px 10px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                {u.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td style={{ fontSize: "13px", color: "#475569" }} className="px-4">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Quick Actions (Moved Below Recent Users) */}
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
                  <h5 className="fw-bold mb-0" style={{ color: "#0F172A", fontSize: "16px" }}>
                    Quick Actions
                  </h5>
                </div>
                <div className="card-body px-4 pb-4">
                  <div className="row g-3">
                    {[
                      { label: "Manage Users",  icon: <Users size={22} />, path: "/admin/users"        },
                      { label: "Add Employee",  icon: <Briefcase size={22} />, path: "/admin/add-employee" },
                    ].map((action) => (
                      <div className="col-lg-2 col-md-4 col-6" key={action.label}>
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
                            <small 
                              className="fw-semibold"
                              style={{
                                color: "#FFFFFF",
                                fontSize: "13px",
                                textAlign: "center",
                                display: "block",
                                wordBreak: "break-word"
                              }}
                            >
                              {action.label}
                            </small>
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

export default AdminDashboard;