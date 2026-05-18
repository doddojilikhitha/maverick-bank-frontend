import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { transfer }       from "../../services/transactionService";
import { getMyAccounts }  from "../../services/accountService";
import { AccountResponse } from "../../types/account.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transfer: React.FC = () => {
  const [accounts,       setAccounts]       = useState<AccountResponse[]>([]);
  const [fromAccountId,  setFromAccountId]  = useState("");
  const [toAccountId,    setToAccountId]    = useState("");
  const [amount,         setAmount]         = useState("");
  const [description,    setDescription]    = useState("");
  const [errors,         setErrors]         = useState<Record<string, string>>({});
  const [loading,        setLoading]        = useState(false);

  const selectedAccount = accounts.find(
    (a) => a.accountId === Number(fromAccountId)
  );

  useEffect(() => {
    getMyAccounts().then((accRes) => {
      if (accRes.success) {
        setAccounts(accRes.data.filter((a: AccountResponse) => a.status === "Active"));
      }
    });
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fromAccountId) newErrors.fromAccountId = "Select source account.";
    if (!toAccountId)   newErrors.toAccountId   = "Enter destination account ID.";
    if (Number(fromAccountId) === Number(toAccountId))
      newErrors.toAccountId = "Cannot transfer to same account.";
    if (!amount || Number(amount) <= 0)
      newErrors.amount = "Enter valid amount.";
    if (selectedAccount && Number(amount) > selectedAccount.balance - 500)
      newErrors.amount = `Insufficient balance. Max: ₹${selectedAccount.balance - 500}`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await transfer({
        fromAccountId: Number(fromAccountId),
        toAccountId:   Number(toAccountId),
        amount:        Number(amount),
        description:   description || "Fund Transfer",
      });
      if (res.success) {
        toast.success(`₹${amount} transferred successfully!`);
        setAmount(""); setDescription("");
        setFromAccountId(""); setToAccountId("");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Transfer failed. Please try again.");
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
              Transfer Funds
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Securely transfer money between accounts
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
                    
                    {/* From Account */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        From Account
                      </label>
                      <select
                        className={`form-select border-0 ${errors.fromAccountId ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        value={fromAccountId}
                        onChange={(e) => setFromAccountId(e.target.value)}
                      >
                        <option value="">-- Select Your Account --</option>
                        {accounts.map((acc) => (
                          <option key={acc.accountId} value={acc.accountId}>
                            {acc.accountNumber} — ₹{acc.balance.toLocaleString()}
                          </option>
                        ))}
                      </select>
                      {errors.fromAccountId && (
                        <div className="invalid-feedback mt-2">{errors.fromAccountId}</div>
                      )}
                    </div>

                    {/* Balance Info */}
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
                        Available: <strong>₹{selectedAccount.balance.toLocaleString()}</strong>
                      </div>
                    )}

                    {/* To Account ID */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        To Account ID
                      </label>
                      <input
                        type="number"
                        className={`form-control border-0 ${errors.toAccountId ? "is-invalid" : ""}`}
                        style={{
                          background: "#F8FAFC",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          color: "#334155",
                        }}
                        placeholder="Enter destination Account ID"
                        value={toAccountId}
                        onChange={(e) => setToAccountId(e.target.value)}
                      />
                      {errors.toAccountId && (
                        <div className="invalid-feedback mt-2">{errors.toAccountId}</div>
                      )}
                    </div>

                    {/* Amount */}
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
                        placeholder="Enter transfer amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="1"
                      />
                      {errors.amount && (
                        <div className="invalid-feedback mt-2">{errors.amount}</div>
                      )}
                    </div>

                    {/* Description */}
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
                        placeholder="e.g. Rent payment, Bill split..."
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
                          Transferring...
                        </>
                      ) : (
                        "Transfer Funds"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Info Card */}
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
                  <h5 className="fw-bold mb-3" style={{ color: "#FFFFFF" }}>
                    ℹ️ Transfer Info
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
                      <span className="me-2">✅</span> Instant fund transfer
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <span className="me-2">📍</span> Minimum ₹500 balance must remain after transfer
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <span className="me-2">📍</span> Cannot transfer to same account
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <span className="me-2">✅</span> Transaction receipt generated
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

export default Transfer;