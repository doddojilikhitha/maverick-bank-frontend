import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Landmark,
  PlusCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  Receipt,
  Users,
  Package,
  FileText,
  CreditCard,
  BarChart3,
  UserPlus,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const customerLinks = [
    {
      path: "/customer/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      path: "/customer/accounts",
      label: "My Accounts",
      icon: <Landmark size={18} />,
    },
    {
      path: "/customer/open-account",
      label: "Open Account",
      icon: <PlusCircle size={18} />,
    },
    {
      path: "/customer/deposit",
      label: "Deposit",
      icon: <ArrowDownLeft size={18} />,
    },
    {
      path: "/customer/withdraw",
      label: "Withdraw",
      icon: <ArrowUpRight size={18} />,
    },
    {
      path: "/customer/transfer",
      label: "Transfer",
      icon: <Repeat size={18} />,
    },
    {
      path: "/customer/transactions",
      label: "Transactions",
      icon: <Receipt size={18} />,
    },
    {
      path: "/customer/beneficiaries",
      label: "Beneficiaries",
      icon: <Users size={18} />,
    },
    {
      path: "/customer/loan-products",
      label: "Loan Products",
      icon: <Package size={18} />,
    },
    {
      path: "/customer/apply-loan",
      label: "Apply Loan",
      icon: <FileText size={18} />,
    },
    {
      path: "/customer/my-loans",
      label: "My Loans",
      icon: <CreditCard size={18} />,
    },
  ];

  const employeeLinks = [
    {
      path: "/employee/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      path: "/employee/accounts",
      label: "Manage Accounts",
      icon: <Landmark size={18} />,
    },
    {
      path: "/employee/loans",
      label: "Manage Loans",
      icon: <CreditCard size={18} />,
    },
    {
      path: "/employee/transactions",
      label: "All Transactions",
      icon: <Receipt size={18} />,
    },
    {
      path: "/employee/reports",
      label: "Reports",
      icon: <BarChart3 size={18} />,
    },
  ];

  const adminLinks = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      path: "/admin/users",
      label: "Manage Users",
      icon: <Users size={18} />,
    },
    {
      path: "/admin/add-employee",
      label: "Add Employee",
      icon: <UserPlus size={18} />,
    },
  ];

  const links =
    user?.role === "Customer"
      ? customerLinks
      : user?.role === "Employee"
      ? employeeLinks
      : adminLinks;

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#173B73 0%, #0F172A 100%)",
        color: "white",
        borderRight:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h5
        className="fw-bold mb-4 mt-2"
        style={{
          letterSpacing: "0.5px",
        }}
      >
        Maverick Bank
      </h5>

      <small
        className="mb-3"
        style={{
          color: "rgba(255,255,255,0.6)",
          textTransform: "uppercase",
          fontSize: "11px",
          letterSpacing: "1px",
        }}
      >
        {user?.role} Menu
      </small>

      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `text-decoration-none mb-2`
          }
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 16px",
            borderRadius: "16px",
            fontSize: "14px",
            fontWeight: isActive ? 700 : 500,
            color: "#fff",
            background: isActive
              ? "rgba(255,255,255,0.14)"
              : "transparent",
            transition: "all 0.3s ease",
            border: isActive
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid transparent",
          })}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            if (
              !e.currentTarget.className.includes(
                "active"
              )
            ) {
              e.currentTarget.style.background =
                "transparent";
            }
          }}
        >
          {link.icon}
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;