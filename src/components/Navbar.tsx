import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  UserCircle2,
  ShieldCheck,
} from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    const rolePath = user?.role?.toLowerCase() || "customer";
    navigate(`/${rolePath}/profile`);
  };

  const getRoleSubtitle = () => {
    switch (user?.role) {
      case "Customer":
        return "Your financial overview";

      case "Employee":
        return "Manage banking operations";

      case "Admin":
        return "System administration panel";

      default:
        return "Welcome to Maverick Bank";
    }
  };

  return (
    <nav
      style={{
        background:
          "linear-gradient(180deg, #D7E5F8 0%, #E6EEF9 45%, #F4F8FD 100%)",
        padding: "18px 32px 14px",
        borderBottom: "1px solid rgba(23,59,115,0.06)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1
            className="fw-bold mb-1"
            style={{
              color: "#173B73",
              fontSize: "28px",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome back, {user?.fullName}
          </h1>

          <p
            style={{
              color: "#64748B",
              fontSize: "13px",
              margin: 0,
            }}
          >
            {getRoleSubtitle()}
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center gap-2"
            onClick={handleProfileClick}
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(10px)",
              height: "54px",
              padding: "0 14px",
              borderRadius: "12px",
              border: "1px solid rgba(23,59,115,0.08)",
              boxShadow: "0 4px 18px rgba(23,59,115,0.08)",
              cursor: "pointer",
            }}
          >
            <UserCircle2
              size={34}
              color="#173B73"
            />

            <div style={{ lineHeight: 1.2 }}>
              <div
                className="fw-semibold"
                style={{
                  color: "#173B73",
                  fontSize: "14px",
                }}
              >
                {user?.fullName}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#64748B",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ShieldCheck size={13} />
                {user?.role}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              border: "none",
              background: "linear-gradient(135deg,#173B73,#0F172A)",
              color: "#fff",
              height: "54px",
              padding: "0 20px",
              borderRadius: "12px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 6px 18px rgba(23,59,115,0.15)",
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;