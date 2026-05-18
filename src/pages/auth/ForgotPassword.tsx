import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #1a3c5e 0%, #2d6a9f 100%)" }}
    >
      <div className="card shadow-lg" style={{ width: "420px", borderRadius: "16px" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div
              className="rounded-circle d-inline-flex align-items-center
                         justify-content-center mb-3"
              style={{ width: "70px", height: "70px",
                       backgroundColor: "#1a3c5e", fontSize: "28px" }}
            >
              🔒
            </div>
            <h3 className="fw-bold" style={{ color: "#1a3c5e" }}>
              Forgot Password
            </h3>
            <p className="text-muted">Enter your email to reset password</p>
          </div>

          {submitted ? (
            <div className="alert alert-success text-center">
              ✅ If this email exists, a reset link has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn w-100 text-white fw-bold py-2"
                style={{ backgroundColor: "#1a3c5e", borderRadius: "8px" }}
              >
                Send Reset Link
              </button>
            </form>
          )}

          <p className="text-center mt-3 mb-0">
            <Link to="/login" className="text-decoration-none"
              style={{ color: "#2d6a9f" }}>
              ← Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;