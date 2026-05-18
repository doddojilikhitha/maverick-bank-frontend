import React, { useState } from "react";
import { Eye, EyeOff, ShieldCheck, Headphones, Wallet } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { validateEmail } from "../../utils/validators";
import { toast, ToastContainer } from "react-toastify";
import bankLogo from "../../assets/bank-logo.png";
import bankingBg from "../../assets/banking-auth-bg1.png";

const Login: React.FC = () => {

  // --- STATE HOOKS ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- NAVIGATION & AUTH CONTEXT ---
  const { login } = useAuth();
  const navigate = useNavigate();

  // --- FORM VALIDATION ---
  const validate = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    const emailErr = validateEmail(email);
    const passwordErr = !password.trim() ? "Password is required." : "";

    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      if (response.success) {
        login(response.data);
        toast.success("Login successful!");

        // Role-based routing system
        const role = response.data.role;
        if (role === "Customer") navigate("/customer/dashboard");
        else if (role === "Employee") navigate("/employee/dashboard");
        else if (role === "Admin") navigate("/admin/dashboard");
      } else {
        toast.error(response.message || "Login failed.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // FULL PAGE CONTAINER WITH GRADIENT BACKGROUND
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `linear-gradient(rgba(10,20,40,0.58), rgba(10,20,40,0.70)), url(${bankingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "clamp(15px, 3vw, 30px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ToastContainer position="top-right" />

      {/* TOP-LEFT FIXED BACK TO HOME NAVIGATION BUTTON */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
        }}
      >
        <Link
          to="/"
          style={{
            background:
              "rgba(255,255,255,0.08)",
            color: "#fff",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 22px",
            borderRadius: "999px",
            fontWeight: 600,
            border:
              "1px solid rgba(255,255,255,0.1)",
            transition:
              "all 0.3s ease",
            backdropFilter:
              "blur(12px)",
            fontSize:
              "clamp(0.85rem, 2vw, 1rem)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-3px)";

            e.currentTarget.style.boxShadow =
              "0 0 22px rgba(0,198,255,0.35)";

            e.currentTarget.style.background =
              "linear-gradient(135deg,#173B73,#0F172A)";

            e.currentTarget.style.border =
              "1px solid rgba(56,189,248,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";

            e.currentTarget.style.boxShadow =
              "none";

            e.currentTarget.style.background =
              "rgba(255,255,255,0.08)";

            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.1)";
          }}
        >
          &larr; Back to Home
        </Link>
      </div>

      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          
          {/* LEFT SIDE */}
          <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">

            {/* GLOWING ROUND LOGO CONTAINER */}
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              {/* Radial background glow layer */}
              <div
                style={{
                  position: "absolute",
                  width: "min(250px, 60vw)",
                  height: "min(250px, 60vw)",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,198,255,0.55), rgba(0,198,255,0))",
                  filter: "blur(60px)",
                }}
              />

              {/* Bank Logo Image */}
              <img
                src={bankLogo}
                alt="Bank Logo"
                style={{
                  width: "clamp(85px, 18vw, 115px)",
                  height: "clamp(85px, 18vw, 115px)",
                  borderRadius: "50%",
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 2,
                  border: "2px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 0 35px rgba(0,198,255,0.55)",
                }}
              />
            </div>

            <h1
              className="fw-bold text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: "1.2",
              }}
            >
              Welcome to
              <br />
              Maverick Bank
            </h1>

            <p
              style={{
                color: "#FFFFFF",
                opacity: 0.85,
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                maxWidth: "500px",
                margin: "20px auto 30px auto",
                paddingInline: "10px",
              }}
              className="mx-lg-0"
            >
              Secure digital banking with seamless transactions and trusted financial services.
            </p>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3 text-white justify-content-center justify-content-lg-start">
                <ShieldCheck color="#38BDF8" />
                Secure Transactions
              </div>
              <div className="d-flex align-items-center gap-3 text-white justify-content-center justify-content-lg-start">
                <Headphones color="#38BDF8" />
                24/7 Banking Support
              </div>
              <div className="d-flex align-items-center gap-3 text-white justify-content-center justify-content-lg-start">
                <Wallet color="#38BDF8" />
                Smart Financial Access
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: AUTHENTICATION FORM CARD */}
          <div className="col-12 col-lg-6">
            <div
              className="mx-auto w-100"
              style={{
                maxWidth: "420px",
              }}
            >
              {/* GLASSMORPHISM FROSTED LOGIN CARD */}
              <div
                style={{
                  background: "rgba(15,23,42,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "clamp(20px, 4vw, 32px)",
                  padding: "clamp(22px, 4vw, 35px)",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(4px)",
                  boxShadow: `
                    0 0 18px rgba(56,189,248,0.15),
                    inset 0 0 18px rgba(37,99,235,0.25)
                  `,
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                {/* Glow Effect */}
                <div
                  style={{
                    position: "absolute",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    background:
                      "rgba(56,189,248,0.12)",
                    filter: "blur(80px)",
                    top: "-50px",
                    right: "-50px",
                    pointerEvents: "none",
                  }}
                />

                <h2
                  className="fw-bold text-white text-center mb-2"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Welcome Back
                </h2>

                <p
                  className="text-center mb-4"
                  style={{
                    color: "#CBD5E1",
                    fontSize: "0.98rem",
                    opacity: 0.9,
                  }}
                >
                  Sign in to continue banking securely
                </p>

                <form onSubmit={handleSubmit}>
                  
                  {/* EMAIL INPUT BLOCK */}
                  <div className="mb-3">
                    <label className="form-label text-white fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        background: "rgba(255,255,255,0.01)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#fff",
                        borderRadius: "14px",
                        padding: "12px",
                      }}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* PASSWORD INPUT BLOCK */}
                  <div className="mb-3">
                    <label className="form-label text-white fw-semibold">
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control pe-5 ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          background: "rgba(255,255,255,0.01)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                          borderRadius: "14px",
                          padding: "12px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn border-0 position-absolute"
                        style={{
                          right: "14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                          color: "#0F172A",
                          padding: "0",
                        }}
                      >
                        {showPassword ? (
                          <Eye size={22} color="#1E293B" />
                        ) : (
                          <EyeOff size={22} color="#1E293B" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* FORGOT PASSWORD ACTION */}
                  <div className="text-end mb-4">
                    <Link
                      to="/forgot-password"
                      style={{
                        color: "#7DD3FC",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* SUBMISSION ACTION BUTTON */}
                  <button
                    type="submit"
                    className="btn w-100 text-white fw-bold py-3"
                    style={{
                      background: "linear-gradient(90deg,#007BFF,#00C6FF)",
                      border: "none",
                      borderRadius: "16px",
                      fontSize: "clamp(0.95rem, 2vw, 1rem)",
                    }}
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Login"}
                  </button>
                </form>

                {/* REGISTRATION REDIRECT EXTRAS */}
                <p
                  className="text-center mt-4 mb-0"
                  style={{
                    color: "#CBD5E1",
                  }}
                >
                  New customer?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "#7DD3FC",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;