import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { applyLoan, getLoanProducts } from "../../services/loanService";
import { getMyAccounts }  from "../../services/accountService";
import { LoanProduct }    from "../../types/loan.types";
import { AccountResponse } from "../../types/account.types";
import { useLocation }    from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyLoan: React.FC = () => {
  const location = useLocation();
  const preSelected = location.state?.product as LoanProduct | undefined;

  const [products,  setProducts]  = useState<LoanProduct[]>([]);
  const [accounts,  setAccounts]  = useState<AccountResponse[]>([]);
  const [form, setForm] = useState({
    accountId:     "",
    loanProductId: preSelected?.loanProductId?.toString() || "",
    amountApplied: "",
    purpose:       "",
  });
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const selectedProduct = products.find(
    (p) => p.loanProductId === Number(form.loanProductId)
  );

  useEffect(() => {
    Promise.all([getLoanProducts(), getMyAccounts()]).then(([lpRes, accRes]) => {
      if (lpRes.success)  setProducts(lpRes.data);
      if (accRes.success) setAccounts(
        accRes.data.filter((a: AccountResponse) => a.status === "Active")
      );
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.accountId)     newErrors.accountId     = "Select an account.";
    if (!form.loanProductId) newErrors.loanProductId = "Select a loan product.";
    if (!form.amountApplied || Number(form.amountApplied) < 1000)
      newErrors.amountApplied = "Minimum loan amount is ₹1000.";
    if (selectedProduct && Number(form.amountApplied) > selectedProduct.loanAmount)
      newErrors.amountApplied = `Max amount for this loan: ₹${selectedProduct.loanAmount.toLocaleString()}`;
    if (!form.purpose.trim()) newErrors.purpose = "Purpose is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await applyLoan({
        accountId:     Number(form.accountId),
        loanProductId: Number(form.loanProductId),
        amountApplied: Number(form.amountApplied),
        purpose:       form.purpose,
      });
      if (res.success) {
        toast.success("Loan application submitted successfully!");
        setForm({ accountId: "", loanProductId: "", amountApplied: "", purpose: "" });
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to apply for loan.");
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
          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#173B73",
                fontSize: "30px",
              }}
            >
              Apply for Loan
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Submit your loan application securely
            </p>
          </div>

          <div className="row g-4">
            {/* Form Card */}
            <div className="col-md-7">
              <div
                className="card border-0"
                style={{
                  borderRadius: "18px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
                }}
              >
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>

                    {/* Loan Product Dropdown */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Loan Product
                      </label>
                      <select
                        name="loanProductId"
                        className={`form-select border-0 ${errors.loanProductId ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        value={form.loanProductId}
                        onChange={handleChange}
                      >
                        <option value="">-- Select Loan Type --</option>
                        {products.map((p) => (
                          <option key={p.loanProductId} value={p.loanProductId}>
                            {p.productName} — {p.interestRate}% — {p.tenureMonths} months
                          </option>
                        ))}
                      </select>
                      {errors.loanProductId && (
                        <div className="invalid-feedback mt-2">{errors.loanProductId}</div>
                      )}
                    </div>

                    {/* Product Parameter Info Box */}
                    {selectedProduct && (
                      <div
                        style={{
                          background: "#EFF6FF",
                          border: "1px solid rgba(23,59,115,0.08)",
                          borderRadius: "12px",
                          padding: "14px",
                          color: "#173B73",
                          fontSize: "13px",
                        }}
                        className="mb-3"
                      >
                        Max Amount: <strong>₹{selectedProduct.loanAmount.toLocaleString()}</strong>
                        &nbsp;| Rate: <strong>{selectedProduct.interestRate}%</strong>
                        &nbsp;| Tenure: <strong>{selectedProduct.tenureMonths} months</strong>
                      </div>
                    )}

                    {/* Credit Destination Account */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Credit to Account
                      </label>
                      <select
                        name="accountId"
                        className={`form-select border-0 ${errors.accountId ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        value={form.accountId}
                        onChange={handleChange}
                      >
                        <option value="">-- Select Account --</option>
                        {accounts.map((acc) => (
                          <option key={acc.accountId} value={acc.accountId}>
                            {acc.accountNumber} ({acc.accountType})
                          </option>
                        ))}
                      </select>
                      {errors.accountId && (
                        <div className="invalid-feedback mt-2">{errors.accountId}</div>
                      )}
                    </div>

                    {/* Applied Amount Input */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Loan Amount (₹)
                      </label>
                      <input
                        type="number"
                        name="amountApplied"
                        className={`form-control border-0 ${errors.amountApplied ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="Enter required amount"
                        value={form.amountApplied}
                        onChange={handleChange}
                        min="1000"
                      />
                      {errors.amountApplied && (
                        <div className="invalid-feedback mt-2">{errors.amountApplied}</div>
                      )}
                    </div>

                    {/* Purpose Input */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Purpose *
                      </label>
                      <input
                        type="text"
                        name="purpose"
                        className={`form-control border-0 ${errors.purpose ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="e.g. Buy house, Purchase car..."
                        value={form.purpose}
                        onChange={handleChange}
                      />
                      {errors.purpose && (
                        <div className="invalid-feedback mt-2">{errors.purpose}</div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn w-100 text-white fw-bold py-3"
                      style={{
                        background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 6px 18px rgba(23,59,115,0.15)",
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Information Side Card */}
            <div className="col-md-5">
              <div
                className="card border-0 h-100"
                style={{
                  background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                  borderRadius: "18px",
                  color: "#FFFFFF",
                  boxShadow: "0 6px 18px rgba(23,59,115,0.1)",
                }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4" style={{ color: "#FFFFFF" }}>
                    Loan Approval Criteria
                  </h5>
                  <ul
                    className="list-unstyled"
                    style={{
                      color: "#D6E8EE",
                      fontSize: "14px",
                      lineHeight: "2",
                    }}
                  >
                    <li className="mb-3">
                      • Account balance must be above ₹5,000
                    </li>
                    <li className="mb-3">
                      • Total deposits must exceed 10% of loan amount
                    </li>
                    <li className="mb-3">
                      • Net cash flow must remain positive
                    </li>
                    <li className="mb-3">
                      • Review takes 1–2 business days
                    </li>
                    <li className="mb-3">
                      • Approved amount credited instantly
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;