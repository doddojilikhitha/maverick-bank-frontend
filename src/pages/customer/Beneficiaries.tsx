import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getBeneficiaries, addBeneficiary } from "../../services/accountService";
import { BeneficiaryResponse } from "../../types/account.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Beneficiaries: React.FC = () => {
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryResponse[]>([]);
  const [showForm,      setShowForm]      = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [form, setForm] = useState({
    accountName: "", accountNumber: "",
    bankName: "", branchName: "", ifscCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchBeneficiaries = async () => {
    const res = await getBeneficiaries();
    if (res.success) setBeneficiaries(res.data);
  };

  useEffect(() => { fetchBeneficiaries(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.accountName.trim())   newErrors.accountName   = "Account name required.";
    if (!form.accountNumber.trim()) newErrors.accountNumber = "Account number required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await addBeneficiary(form);
      if (res.success) {
        toast.success("Beneficiary added successfully!");
        setShowForm(false);
        setForm({ accountName: "", accountNumber: "", bankName: "", branchName: "", ifscCode: "" });
        fetchBeneficiaries();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to add beneficiary.");
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

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#173B73",
                  fontSize: "30px",
                }}
              >
                Beneficiaries
              </h2>
              <p
                style={{
                  color: "#64748B",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                Manage your saved transfer beneficiaries
              </p>
            </div>

            <button
              className="btn text-white"
              style={{
                background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                border: "none",
                borderRadius: "12px",
                padding: "10px 18px",
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(23,59,115,0.15)",
              }}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add Beneficiary"}
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <div
              className="card border-0 mb-4"
              style={{
                borderRadius: "18px",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
              }}
            >
              <div className="card-body p-4">
                <h6 className="fw-bold mb-4" style={{ color: "#173B73" }}>
                  Add New Beneficiary
                </h6>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Account Name *
                      </label>
                      <input
                        type="text"
                        name="accountName"
                        className={`form-control border-0 ${errors.accountName ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="Beneficiary name"
                        value={form.accountName}
                        onChange={handleChange}
                      />
                      {errors.accountName && (
                        <div className="invalid-feedback mt-2">{errors.accountName}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Account Number *
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        className={`form-control border-0 ${errors.accountNumber ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="Account number"
                        value={form.accountNumber}
                        onChange={handleChange}
                      />
                      {errors.accountNumber && (
                        <div className="invalid-feedback mt-2">{errors.accountNumber}</div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        className="form-control border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="Bank name"
                        value={form.bankName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Branch Name
                      </label>
                      <input
                        type="text"
                        name="branchName"
                        className="form-control border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="Branch name"
                        value={form.branchName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        className="form-control border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="IFSC code"
                        value={form.ifscCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        className="btn text-white fw-bold px-4 py-2"
                        style={{
                          background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 6px 18px rgba(23,59,115,0.15)",
                        }}
                        disabled={loading}
                      >
                        {loading && <span className="spinner-border spinner-border-sm me-2" />}
                        Save Beneficiary
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Beneficiaries List */}
          <div className="row g-3">
            {beneficiaries.length === 0 ? (
              <div
                className="col-12 text-center py-5"
                style={{
                  color: "#64748B",
                }}
              >
                No beneficiaries saved yet. Add one to get started!
              </div>
            ) : (
              beneficiaries.map((ben, i) => (
                <div className="col-md-4" key={i}>
                  <div
                    className="card border-0 h-100"
                    style={{
                      borderRadius: "18px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
                    }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center me-3 text-white fw-bold"
                          style={{
                            width: "44px",
                            height: "44px",
                            background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                            fontSize: "16px",
                          }}
                        >
                          {ben.accountName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="fw-bold mb-0" style={{ color: "#173B73", fontSize: "16px" }}>
                            {ben.accountName}
                          </p>
                          <small style={{ color: "#64748B", fontWeight: 500 }}>
                            {ben.bankName || "Maverick Bank"}
                          </small>
                        </div>
                      </div>
                      <hr style={{ color: "#E2E8F0", margin: "12px 0" }} />
                      <div className="d-flex flex-column gap-1">
                        <small style={{ color: "#64748B", fontSize: "13px" }}>
                          Account: <strong style={{ color: "#334155" }}>{ben.accountNumber}</strong>
                        </small>
                        <small style={{ color: "#64748B", fontSize: "13px" }}>
                          IFSC: <strong style={{ color: "#334155" }}>{ben.ifscCode || "—"}</strong>
                        </small>
                        <small style={{ color: "#64748B", fontSize: "13px" }}>
                          Branch: <strong style={{ color: "#334155" }}>{ben.branchName || "—"}</strong>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beneficiaries;