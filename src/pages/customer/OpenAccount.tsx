import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { openAccount } from "../../services/accountService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OpenAccount: React.FC = () => {
  const [form, setForm] = useState({
    accountType:   "Savings",
    branchName:    "",
    ifscCode:      "",
    branchAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.branchName.trim())    newErrors.branchName    = "Branch name is required.";
    if (!form.ifscCode.trim())      newErrors.ifscCode      = "IFSC code is required.";
    if (!form.branchAddress.trim()) newErrors.branchAddress = "Branch address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await openAccount(form);
      if (res.success) {
        toast.success("Account opening request submitted! Awaiting approval.");
        setForm({ accountType: "Savings", branchName: "", ifscCode: "", branchAddress: "" });
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to open account. Please try again.");
    } finally {
      setLoading(false);
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

          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#173B73",
                fontSize: "30px",
              }}
            >
              Open New Account
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Submit a request to open a new bank account
            </p>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
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
                    
                    {/* Account Type */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Account Type</label>
                      <select
                        name="accountType"
                        className="form-select border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        value={form.accountType}
                        onChange={handleChange}
                      >
                        <option value="Savings">Savings Account</option>
                        <option value="Checking">Checking Account</option>
                        <option value="Business">Business Account</option>
                      </select>
                    </div>

                    {/* Branch Name */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Branch Name</label>
                      <input
                        type="text"
                        name="branchName"
                        className={`form-control border-0 ${errors.branchName ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        placeholder="e.g. Hyderabad Main Branch"
                        value={form.branchName}
                        onChange={handleChange}
                      />
                      {errors.branchName && (
                        <div className="invalid-feedback">{errors.branchName}</div>
                      )}
                    </div>

                    {/* IFSC Code */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        className={`form-control border-0 ${errors.ifscCode ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        placeholder="e.g. MAVK0001"
                        value={form.ifscCode}
                        onChange={handleChange}
                      />
                      {errors.ifscCode && (
                        <div className="invalid-feedback">{errors.ifscCode}</div>
                      )}
                    </div>

                    {/* Branch Address */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Branch Address</label>
                      <input
                        type="text"
                        name="branchAddress"
                        className={`form-control border-0 ${errors.branchAddress ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                        }}
                        placeholder="Enter branch address"
                        value={form.branchAddress}
                        onChange={handleChange}
                      />
                      {errors.branchAddress && (
                        <div className="invalid-feedback">{errors.branchAddress}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 text-white fw-bold py-2"
                      style={{
                        background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 6px 18px rgba(23, 59, 115, 0.15)",
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="col-md-6">
              <div
                className="card border-0 h-100"
                style={{
                  background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                  borderRadius: "18px",
                  color: "#FFFFFF",
                }}
              >
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3" style={{ color: "#FFFFFF" }}>
                    ℹ️ Account Types
                  </h6>
                  {[
                    { type: "Savings",  desc: "Best for personal savings. Earn interest on balance." },
                    { type: "Checking", desc: "For day-to-day transactions. No interest."             },
                    { type: "Business", desc: "For business transactions. Higher limits."             },
                  ].map((item) => (
                    <div key={item.type} className="mb-3">
                      <strong style={{ color: "#FFFFFF" }}>{item.type}</strong>
                      <p style={{ color: "#D6E8EE", fontSize: "13px", margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                  <div
                    className="p-3 mt-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.10)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      color: "#D6E8EE",
                      fontSize: "13px",
                    }}
                  >
                    ⏳ Account opening requests are reviewed by bank employees within 1-2 business days.
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

export default OpenAccount;