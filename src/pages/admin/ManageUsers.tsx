import React, { useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios   from "../../utils/axiosConfig";
import { API_URLS }      from "../../utils/constants";
import PasswordStrength  from "../../components/PasswordStrength";
import { validateEmail, validatePassword } from "../../utils/validators";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "", email: "", password: "",
    phone: "", gender: "", address: "",
    aadharNo: "", panNo: "", dob: "",
  });
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;
    const passErr = validatePassword(form.password);
    if (passErr) newErrors.password = passErr;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post(API_URLS.ADD_EMPLOYEE, {
        ...form, role: "Employee"
      });
      if (res.data.success) {
        toast.success(`Employee ${form.fullName} created successfully!`);
        setForm({
          fullName: "", email: "", password: "",
          phone: "", gender: "", address: "",
          aadharNo: "", panNo: "", dob: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create employee.");
    } finally {
      setLoading(false);
    }
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
          overflowX: "hidden",
        }}
      >
        <Navbar />
        <div 
          className="dashboard-content"
          style={{
            padding: window.innerWidth < 768 ? "16px" : "32px",
            background: "linear-gradient(180deg, #DCEBFF 0%, #EEF4FF 100%)",
            minHeight: "100vh",
            overflowX: "hidden",
            maxWidth: "100vw",
          }}
        >
          <ToastContainer position="top-right" />

          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#173B73",
                fontSize: window.innerWidth < 768 ? "24px" : "30px",
              }}
            >
              Add Employee
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Create and manage employee access
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-7 col-12">
              <div 
                className="card border-0"
                style={{
                  borderRadius: "18px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)",
                }}
              >
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>Full Name *</label>
                      <input
                        type="text" name="fullName"
                        className={`form-control border-0 ${errors.fullName ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        placeholder="Employee full name"
                        value={form.fullName} onChange={handleChange}
                      />
                      {errors.fullName && (
                        <div className="invalid-feedback">{errors.fullName}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>Email *</label>
                      <input
                        type="email" name="email"
                        className={`form-control border-0 ${errors.email ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        placeholder="employee@maverickbank.com"
                        value={form.email} onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>Password *</label>
                      <input
                        type="password" name="password"
                        className={`form-control border-0 ${errors.password ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        placeholder="Create strong password"
                        value={form.password} onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                      <PasswordStrength password={form.password} />
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-12 mb-3">
                        <label className="form-label fw-semibold" style={{ color: "#334155" }}>Phone</label>
                        <input
                          type="text" name="phone"
                          className="form-control border-0"
                          style={{
                            background: "#F8FAFC",
                            borderRadius: "12px",
                            padding: "12px 14px",
                          }}
                          placeholder="10-digit phone"
                          value={form.phone} onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <label className="form-label fw-semibold" style={{ color: "#334155" }}>Gender</label>
                        <select
                          name="gender"
                          className="form-select border-0"
                          style={{
                            background: "#F8FAFC",
                            borderRadius: "12px",
                            padding: "12px 14px",
                          }}
                          value={form.gender} onChange={handleChange}
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>Date of Birth</label>
                      <input
                        type="date" name="dob"
                        className="form-control border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        value={form.dob} onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>Address</label>
                      <input
                        type="text" name="address"
                        className="form-control border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        placeholder="Employee address"
                        value={form.address} onChange={handleChange}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-12 mb-3">
                        <label className="form-label fw-semibold" style={{ color: "#334155" }}>Aadhar Number</label>
                        <input
                          type="text" name="aadharNo"
                          className="form-control border-0"
                          style={{
                            background: "#F8FAFC",
                            borderRadius: "12px",
                            padding: "12px 14px",
                          }}
                          placeholder="12-digit Aadhar"
                          value={form.aadharNo} onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <label className="form-label fw-semibold" style={{ color: "#334155" }}>PAN Number</label>
                        <input
                          type="text" name="panNo"
                          className="form-control border-0"
                          style={{
                            background: "#F8FAFC",
                            borderRadius: "12px",
                            padding: "12px 14px",
                          }}
                          placeholder="PAN number"
                          value={form.panNo} onChange={handleChange}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 text-white fw-bold py-2 mt-2"
                      style={{ 
                        background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                        border: "none",
                        borderRadius: "12px",
                        padding: "10px 18px",
                        fontWeight: 600,
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Creating...
                        </>
                      ) : "Create Employee"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-12">
              <div
                className="card border-0 h-100 mt-3 mt-lg-0"
                style={{ 
                  borderRadius: "18px",
                  background: "linear-gradient(135deg, #173B73, #0F172A)",
                  boxShadow: "0 10px 30px rgba(23, 59, 115, 0.15)",
                }}
              >
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: "#FFFFFF", fontSize: "18px" }}>
                      Employee Account Permissions
                    </h5>
                    <p style={{ color: "#D6E8EE", opacity: 0.8, fontSize: "13px", marginBottom: "24px" }}>
                      Default security clearance matrix assigned to this role.
                    </p>

                    <div className="d-flex flex-column gap-3">
                      {[
                        { text: "Approve/Close customer accounts", allowed: true },
                        { text: "Review and approve/reject loans", allowed: true },
                        { text: "Disburse approved loans", allowed: true },
                        { text: "View system transactions", allowed: true },
                        { text: "Generate financial reports", allowed: true },
                        { text: "Manage user directories", allowed: false },
                        { text: "Register secondary employees", allowed: false },
                      ].map((item, idx) => (
                        <div 
                          key={idx} 
                          className="d-flex justify-content-between align-items-center flex-wrap gap-2 py-2 px-3"
                          style={{ 
                            background: "rgba(255, 255, 255, 0.05)", 
                            borderRadius: "10px",
                            border: "1px solid rgba(255, 255, 255, 0.05)"
                          }}
                        >
                          <span
                            style={{
                              color: "#FFFFFF",
                              fontSize: "14px",
                              fontWeight: 400,
                              wordBreak: "break-word",
                              flex: 1,
                            }}
                          >
                            {item.text}
                          </span>
                          <span 
                            style={{ 
                              fontSize: "11px", 
                              fontWeight: 600, 
                              padding: "4px 8px", 
                              borderRadius: "6px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              background: item.allowed ? "rgba(74, 222, 128, 0.2)" : "rgba(248, 113, 113, 0.2)",
                              color: item.allowed ? "#86EFAC" : "#FCA5A5",
                              border: item.allowed ? "1px solid rgba(134, 239, 172, 0.2)" : "1px solid rgba(252, 165, 165, 0.2)"
                            }}
                          >
                            {item.allowed ? "Allowed" : "Denied"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="mt-4"
                    style={{ 
                      fontSize: "13px",
                      color: "#D6E8EE",
                      opacity: 0.9,
                      background: "rgba(255, 255, 255, 0.03)",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      borderLeft: "4px solid #FBBF24",
                      lineHeight: "1.5"
                    }}
                  >
                    System Notice: Generated credentials will be routed directly to the verified email address. Ensure a complex temporary password policy is enforced.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;