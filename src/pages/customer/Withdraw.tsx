import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { withdraw }       from "../../services/transactionService";
import { getMyAccounts }  from "../../services/accountService";
import { AccountResponse } from "../../types/account.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Withdraw: React.FC = () => {
  const [accounts,    setAccounts]    = useState<AccountResponse[]>([]);
  const [accountId,   setAccountId]   = useState("");
  const [amount,      setAmount]      = useState("");
  const [description, setDescription] = useState("");
  const [errors,      setErrors]      = useState<Record<string, string>>({});
  const [loading,     setLoading]     = useState(false);

  const selectedAccount = accounts.find(
    (a) => a.accountId === Number(accountId)
  );

  useEffect(() => {
    getMyAccounts().then((res) => {
      if (res.success)
        setAccounts(res.data.filter((a: AccountResponse) => a.status === "Active"));
    });
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!accountId) newErrors.accountId = "Please select an account.";
    if (!amount)    newErrors.amount    = "Amount is required.";
    if (Number(amount) <= 0)
      newErrors.amount = "Amount must be greater than 0.";
    if (selectedAccount && Number(amount) > selectedAccount.balance - 500)
      newErrors.amount = `Max withdrawal: ₹${selectedAccount.balance - 500} (min balance ₹500 required).`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await withdraw({
        accountId:   Number(accountId),
        amount:      Number(amount),
        description: description || "Withdrawal",
      });
      if (res.success) {
        toast.success(`₹${amount} withdrawn successfully!`);
        setAmount(""); setDescription(""); setAccountId("");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Withdrawal failed. Please try again.");
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
              Withdraw Funds
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Securely withdraw money from your account
            </p>
          </div>

          <div className="row g-4">
            {/* Form Card */}
            <div className="col-md-6">
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
                    
                    {/* Account Selection */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Select Account
                      </label>
                      <select
                        className={`form-select border-0 ${errors.accountId ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                      >
                        <option value="">-- Select Account --</option>
                        {accounts.map((acc) => (
                          <option key={acc.accountId} value={acc.accountId}>
                            {acc.accountNumber} — ₹{acc.balance.toLocaleString()}
                          </option>
                        ))}
                      </select>
                      {errors.accountId && (
                        <div className="invalid-feedback mt-2">{errors.accountId}</div>
                      )}
                    </div>

                    {/* Balance Info Box */}
                    {selectedAccount && (
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
                        Available Balance: <strong>₹{selectedAccount.balance.toLocaleString()}</strong>
                        &nbsp;| Max Withdrawable: <strong>₹{(selectedAccount.balance - 500).toLocaleString()}</strong>
                      </div>
                    )}

                    {/* Amount Input */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        className={`form-control border-0 ${errors.amount ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="1"
                      />
                      {errors.amount && (
                        <div className="invalid-feedback mt-2">{errors.amount}</div>
                      )}
                    </div>

                    {/* Description Input */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Description (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control border-0"
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="e.g. ATM withdrawal..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
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
                          Processing...
                        </>
                      ) : (
                        "Withdraw Funds"
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
                  boxShadow: "0 6px 18px rgba(23,59,115,0.1)",
                }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3" style={{ color: "#FFFFFF" }}>
                    ⚠️ Withdrawal Rules
                  </h5>
                  <ul
                    className="list-unstyled"
                    style={{
                      color: "#D6E8EE",
                      fontSize: "14px",
                      lineHeight: "2",
                    }}
                  >
                    <li className="d-flex align-items-center mb-2">
                      <span className="me-2">📍</span> A minimum balance of ₹500 must remain after withdrawal
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <span className="me-2">📍</span> Only active accounts can withdraw
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <span className="me-2">✅</span> Instant debit from account
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <span className="me-2">✅</span> Transaction statements updated immediately
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

export default Withdraw;