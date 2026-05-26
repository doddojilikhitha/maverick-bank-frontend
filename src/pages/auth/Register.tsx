import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser }     from "../../services/authService";
import PasswordStrength     from "../../components/PasswordStrength";
import { validateEmail, validatePassword, validateAge } from "../../utils/validators";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bankLogo   from "../../assets/bank-logo.png";
import bankingBg  from "../../assets/banking-auth-bg1.png";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    fullName:        "",
    email:           "",
    password:        "",
    confirmPassword: "",
    phone:           "",
    gender:          "",
    address:         "",
    aadharNo:        "",
    panNo:           "",
    dob:             "",
  });
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full name is required.";

    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validatePassword(form.password);
    if (passErr) newErrors.password = passErr;

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.phone.trim())
      newErrors.phone = "Phone number is required.";
    if (!form.gender)
      newErrors.gender = "Gender is required.";
    if (!form.address.trim())
      newErrors.address = "Address is required.";
    if (!form.aadharNo.trim())
      newErrors.aadharNo = "Aadhar number is required.";
    if (!form.panNo.trim())
      newErrors.panNo = "PAN number is required.";

    const dobErr = validateAge(form.dob);
    if (dobErr) newErrors.dob = dobErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await registerUser({
        fullName: form.fullName,
        email:    form.email,
        password: form.password,
        phone:    form.phone,
        gender:   form.gender,
        address:  form.address,
        aadharNo: form.aadharNo,
        panNo:    form.panNo,
        dob:      form.dob || undefined,
        role:     "Customer",
      });
      if (response.success) {
        toast.success("Registered successfully! Please login.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Compute age for display
  const getAge = (): number | null => {
    if (!form.dob) return null;
    const dob   = new Date(form.dob);
    const today = new Date();
    let age     = today.getFullYear() - dob.getFullYear();
    const m     = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
  };

  // Max date allowed = 18 years ago from today
  const maxDOB = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  ).toISOString().split("T")[0];

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 20, 40, 0.58), rgba(10, 20, 40, 0.70)), url(${bankingBg})`,
        backgroundSize:     "cover",
        backgroundPosition: "center",
        backgroundRepeat:   "no-repeat",
        position:           "relative",
        overflow:           "hidden",
      }}
    >
      <ToastContainer position="top-right" />

      {/* Back to Home button */}
      <div style={{ position: "absolute", top: "30px", left: "40px", zIndex: 10 }}>
        <Link
          to="/"
          style={{
            background:     "rgba(255,255,255,0.08)",
            color:          "#fff",
            textDecoration: "none",
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "10px",
            padding:        "12px 22px",
            borderRadius:   "999px",
            fontWeight:     600,
            border:         "1px solid rgba(255,255,255,0.1)",
            transition:     "all 0.3s ease",
            backdropFilter: "blur(12px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform  = "translateY(-3px)";
            e.currentTarget.style.boxShadow  = "0 0 22px rgba(0,198,255,0.35)";
            e.currentTarget.style.background = "linear-gradient(135deg,#173B73,#0F172A)";
            e.currentTarget.style.border     = "1px solid rgba(56,189,248,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform  = "translateY(0)";
            e.currentTarget.style.boxShadow  = "none";
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.border     = "1px solid rgba(255,255,255,0.1)";
          }}
        >
          &larr; Back to Home
        </Link>
      </div>

      <div className="container" style={{ maxWidth: "1100px" }}>
        <div
          className="row overflow-hidden shadow-lg mx-auto"
          style={{
            borderRadius: "30px",
            background:   "rgba(255,255,255,0.06)",
            border:       "1px solid rgba(255,255,255,0.08)",
            minHeight:    "760px",
          }}
        >
          {/* Left Panel */}
          <div
            className="col-lg-4 d-flex flex-column justify-content-center text-white p-5"
            style={{
              background: "linear-gradient(135deg, #1B4B91, #173B73, #0F172A)",
            }}
          >
            <img
              src={bankLogo}
              alt="Bank Logo"
              style={{
                width:        "90px",
                height:       "90px",
                borderRadius: "50%",
                objectFit:    "cover",
                marginBottom: "25px",
                boxShadow:    "0 0 35px rgba(0,198,255,0.45)",
              }}
            />
            <h2 className="fw-bold mb-3">Create Your Account</h2>
            <p style={{ color: "#CBD5E1", lineHeight: "1.8" }}>
              Join Maverick Bank and enjoy secure digital banking
              with smart financial services.
            </p>
            <div className="mt-4">
              <p className="mb-2">✓ Secure Banking</p>
              <p className="mb-2">✓ 24/7 Support</p>
              <p className="mb-0">✓ Trusted Services</p>
            </div>
          </div>

          {/* Right Panel — Form */}
          <div
            className="col-lg-8 p-5 d-flex flex-column justify-content-center"
            style={{
              background:    "rgba(255, 255, 255, 0.92)",
              backdropFilter:"blur(18px)",
            }}
          >
            <h3 className="fw-bold text-dark mb-1">Registration Details</h3>
            <p className="text-muted mb-4">
              Provide your information below to complete your application profile.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Row 1 — Full Name + Email */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">Full Name *</label>
                  <input
                    type="text" name="fullName"
                    className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                    placeholder="Enter your full name"
                    value={form.fullName} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">Email Address *</label>
                  <input
                    type="email" name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    value={form.email} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>

              {/* Row 2 — Password + Confirm Password */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">Password *</label>
                  <input
                    type="password" name="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Create a strong password"
                    value={form.password} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  <PasswordStrength password={form.password} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">Confirm Password *</label>
                  <input
                    type="password" name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="Confirm your password"
                    value={form.confirmPassword} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>

              {/* Row 3 — Phone + Gender */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">Phone *</label>
                  <input
                    type="text" name="phone"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="10-digit phone"
                    value={form.phone} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">Gender *</label>
                  <select
                    name="gender"
                    className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                    value={form.gender} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  >
                    <option value="" style={{ background:"#FFFFFF", color:"#0F172A" }}>
                      Select gender
                    </option>
                    <option value="Male"   style={{ background:"#FFFFFF", color:"#0F172A" }}>Male</option>
                    <option value="Female" style={{ background:"#FFFFFF", color:"#0F172A" }}>Female</option>
                    <option value="Other"  style={{ background:"#FFFFFF", color:"#0F172A" }}>Other</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">{errors.gender}</div>
                  )}
                </div>
              </div>

              {/* Row 4 — DOB + Address */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">
                    Date of Birth *
                  </label>
                  <input
                    type="date" name="dob"
                    className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                    value={form.dob}
                    onChange={handleChange}
                    max={maxDOB}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.dob && (
                    <div className="invalid-feedback">{errors.dob}</div>
                  )}
                  {/* Show calculated age when valid */}
                  {form.dob && !errors.dob && getAge() !== null && (
                    <small className="text-success fw-semibold">
                      ✓ Age: {getAge()} years
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">Address *</label>
                  <input
                    type="text" name="address"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    placeholder="Enter your address"
                    value={form.address} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
              </div>

              {/* Row 5 — Aadhar + PAN */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">Aadhar Number *</label>
                  <input
                    type="text" name="aadharNo"
                    className={`form-control ${errors.aadharNo ? "is-invalid" : ""}`}
                    placeholder="12-digit Aadhar"
                    value={form.aadharNo} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.aadharNo && (
                    <div className="invalid-feedback">{errors.aadharNo}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-dark fw-semibold">PAN Number *</label>
                  <input
                    type="text" name="panNo"
                    className={`form-control ${errors.panNo ? "is-invalid" : ""}`}
                    placeholder="PAN number"
                    value={form.panNo} onChange={handleChange}
                    style={{ background:"#F8FAFC", border:"1px solid #E2E8F0",
                             color:"#0F172A", borderRadius:"14px", padding:"12px" }}
                  />
                  {errors.panNo && (
                    <div className="invalid-feedback">{errors.panNo}</div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-100 text-white fw-bold py-3 mt-3"
                style={{
                  background:   "linear-gradient(90deg, #007BFF, #00C6FF)",
                  border:       "none",
                  borderRadius: "16px",
                  fontSize:     "1rem",
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Registering...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

            </form>

            <p className="text-center mt-4 mb-0" style={{ color: "#64748B" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color:"#007BFF", textDecoration:"none", fontWeight:600 }}
              >
                Login here
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;