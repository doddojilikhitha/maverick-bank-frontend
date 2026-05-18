import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  BarChart3,
  Headphones,
  UserRoundPlus,
  Building2,
  ArrowLeftRight,
  Landmark,
  BadgeCheck,
  Wallet,
  Banknote,
  ChartNoAxesColumn,
  BadgeDollarSign
} from "lucide-react";
import bankLogo from "../assets/bank-logo.png";

// Reusable styling configurations for the footer links and layout text
const footerLink = {
  color: "#CBD5E1",
  textDecoration: "none",
  transition: "0.3s ease",
  fontWeight: 500,
};
const footerText = {
  color: "#94A3B8",
  marginBottom: "10px",
};

const Home: React.FC = () => {
  // State hook managing the current dynamic panel inside the Services showcase area
  const [activeTab, setActiveTab] = useState("Banking");

  return (
    // Top-level container configured with a dark radial gradient and a hidden overflow to contain blur artifacts
    <div
      id="home"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #0B2C5F 0%, #020817 70%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 
        Header Navigation Bar:
        Uses 'flex-wrap' alongside responsive padding ('px-3 px-lg-5') to gracefully adjust spacing and layout 
        arrangements on compact mobile viewports without overflowing structural limits.
      */}
      <nav
        className="d-flex justify-content-between align-items-center flex-wrap px-3 px-lg-5 pt-4"
        style={{ gap: "15px" }}
      >
        {/* Responsive Typography setup using clamp(minimum, preferred, maximum) to prevent header line breaks on small devices */}
        <h2
          className="fw-bold m-0"
          style={{
            letterSpacing: "1px",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            background: "linear-gradient(90deg,#D6E4FF,#7DD3FC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MAVERICK BANK
        </h2>

        {/* Flexbox wrapper grouping internal navigation anchors and the portal action button with wrapping enabling safe stacking */}
        <div className="d-flex align-items-center flex-wrap justify-content-center gap-3 gap-md-4">
          <a href="#home" className="nav-link-custom">
            Home
          </a>

          <a href="#services" className="nav-link-custom">
            Services
          </a>

          <a href="#faq" className="nav-link-custom">
            FAQ
          </a>

          <Link
            to="/about"
            className="nav-link-custom"
            style={{ textDecoration: "none" }}
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="nav-link-custom"
            style={{ textDecoration: "none" }}
          >
            Contact Us
          </Link>

          <Link
            to="/login"
            className="btn text-white px-4 py-2"
            style={{
              background: "linear-gradient(90deg,#007BFF,#00C6FF)",
              borderRadius: "14px",
              fontWeight: 600,
              boxShadow: "0 0 18px rgba(0,198,255,0.35)",
            }}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Primary presentation body shell */}
      <div className="container">
        {/* 
          Hero Section Viewport:
          Splits into textual marketing copy on the left and visual graphics on the right. 
          Uses 'py-5' to add structural top/bottom breathing room and a responsive gutter gap ('g-4').
        */}
        <div
          className="row align-items-center py-5 g-4"
          style={{ minHeight: "75vh" }}
        >
          {/* Main Branding Message Segment: Automatically centers textual data when scaled to mobile viewports */}
          <div className="col-lg-6 text-white text-center text-lg-start">
            <h1
              className="fw-bold"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 3.8rem)",
                lineHeight: "1.15",
                marginBottom: "30px",
                background: "linear-gradient(90deg,#FFFFFF,#D6E4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bank Smarter.
              <br />
              Bank Securely.
            </h1>

            <p
              style={{
                fontSize: "clamp(1.05rem, 3vw, 1.5rem)",
                color: "#CBD5E1",
                maxWidth: "650px",
                lineHeight: "1.8",
                marginBottom: "35px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              className="mx-lg-0" // Resets horizontal margins back to normal left-aligned configuration on desktop views
            >
              Experience secure banking, seamless transactions and smart financial solutions — all in one place.
            </p>

            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
              <Link
                to="/login"
                className="btn text-white px-5 py-3"
                style={{
                  background: "linear-gradient(90deg,#007BFF,#00C6FF)",
                  borderRadius: "16px",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Graphical Display Segment: Houses the corporate branding logo overlayed on a dynamic neon glowing element */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center mt-5 mt-lg-0">
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Backing Ambient Blur Effect Layer: Uses min() math parameters to automatically contract on mobile screen boundaries */}
              <div
                style={{
                  position: "absolute",
                  width: "min(520px, 80vw)",
                  height: "min(520px, 80vw)",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,198,255,0.95) 0%, rgba(0,198,255,0.55) 25%, rgba(0,198,255,0.2) 50%, rgba(0,198,255,0) 78%)",
                  filter: "blur(85px)",
                  zIndex: 0,
                  opacity: 1,
                }}
              />

              {/* Central Identity Asset Logo: Configured with custom viewport dimensions to adapt smoothly to smaller viewports */}
              <img
                src={bankLogo}
                alt="Logo"
                style={{
                  width: "min(200px, 45vw)",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 1,
                  filter: "drop-shadow(0 0 45px rgba(0,198,255,0.8))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Feature Grid Presentation: Renders standard value offerings utilizing a structured map looping layout */}
        <div className="row pb-5 g-4">
          {[
            {
              title: "Secure Transactions",
              desc: "Protected and secure banking operations.",
              icon: <ShieldCheck size={38} color="#00C6FF" />,
            },
            {
              title: "Instant Transfers",
              desc: "Transfer money instantly anytime.",
              icon: <Zap size={38} color="#FFC857" />,
            },
            {
              title: "Smart Insights",
              desc: "Track your finances intelligently.",
              icon: <BarChart3 size={38} color="#A855F7" />,
            },
            {
              title: "24/7 Support",
              desc: "Always available customer support.",
              icon: <Headphones size={38} color="#F472B6" />,
            },
          ].map((item, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              {/* Interactive Presentation Cards: Leverages clean inline event updates to handle standard hover animations */}
              <div
                className="h-100 feature-card-responsive"
                style={{
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                  cursor: "pointer",
                  transition: "0.3s",
                  padding: "20px",
                  borderRadius: "16px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Structural Graphic Backdrop wrapper */}
                <div
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <h4
                    className="text-white fw-bold"
                    style={{ fontSize: "1.3rem" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      color: "#CBD5E1",
                      fontSize: "1rem",
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Workflow Showcase ("Banking Made Simple") Layout Block */}
      <div
        id="how-it-works"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          marginTop: "80px",
          marginBottom: "2px",
          borderRadius: "40px",
          // Uses fluid clamping to auto-reduce padding densities when mounted on smaller screen interfaces
          padding: "clamp(40px, 6vw, 75px) clamp(20px, 5vw, 55px)",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{
                fontSize: "clamp(2rem, 6vw, 3rem)",
                lineHeight: "1.3",
                paddingBottom: "10px",
                background: "linear-gradient(90deg,#FFFFFF,#7DD3FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Banking Made Simple
            </h2>

            <p
              style={{
                color: "#94A3B8",
                fontSize: "1.1rem",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Experience secure banking, transactions, loans and approvals through a smooth step-by-step process.
            </p>
          </div>

          {/* Bootstrap Grid columns structure configured to seamlessly alter card ratios from single row to multi-row setups */}
          <div className="row g-4 row-cols-1 row-cols-md-3 row-cols-lg-5">
            {[
              {
                step: "01",
                title: "Register",
                desc: "Create your secure Maverick account.",
                icon: <UserRoundPlus size={36} color="#E2E8F0" />,
              },
              {
                step: "02",
                title: "Open Account",
                desc: "Open and manage your account securely anytime.",
                icon: <Building2 size={36} color="#7DD3FC" />,
              },
              {
                step: "03",
                title: "Transactions",
                desc: "Manage deposits, withdrawals and money transfers easily.",
                icon: <ArrowLeftRight size={36} color="#C084FC" />,
              },
              {
                step: "04",
                title: "Apply Loan",
                desc: "Explore different loan options and apply conveniently.",
                icon: <Landmark size={36} color="#22D3EE" />,
              },
              {
                step: "05",
                title: "Approval",
                desc: "Track approvals and access banking services smoothly.",
                icon: <BadgeCheck size={36} color="#34D399" />,
              },
            ].map((item, index) => (
              <div className="col" key={index}>
                {/* Step Action Component: Applies premium hover transforms changing borders, gradients and positioning drops */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "22px",
                    padding: "28px 22px",
                    height: "100%",
                    minHeight: "270px",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(20px)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-12px) scale(1.03)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                    e.currentTarget.style.boxShadow = "0 0 45px rgba(0,198,255,0.25)";
                    e.currentTarget.style.border = "1px solid rgba(0,198,255,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.border = "1px solid rgba(0,198,255,0.08)";
                  }}
                >
                  {/* Step Identifier Badge */}
                  <div
                    style={{
                      background: "rgba(0,198,255,0.12)",
                      color: "#00C6FF",
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      display: "inline-block",
                      marginBottom: "20px",
                    }}
                  >
                    STEP {item.step}
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    {item.icon}
                  </div>

                  <h4
                    className="fw-bold text-white"
                    style={{
                      fontSize: "1.2rem",
                      marginBottom: "14px",
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      color: "#D6E4FF",
                      lineHeight: "1.6",
                      fontSize: "0.95rem",
                      margin: 0,
                }}
              >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Services Tabbed Infrastructure Block */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(18,35,70,0.75), rgba(30,58,138,0.35))",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "40px",
          padding: "35px 10px",
          marginBottom: "40px",
          marginTop: "0px",
          backdropFilter: "blur(25px)",
        }}
      >
        <div
          id="services"
          className="container py-3"
          style={{ marginBottom: "40px" }}
        >
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{
                fontSize: "clamp(2rem, 6vw, 3rem)",
                background: "linear-gradient(90deg,#FFFFFF,#7DD3FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Services
            </h2>

            <p
              style={{
                color: "#94A3B8",
                fontSize: "1.1rem",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Everything you need for smarter, safer and faster banking.
            </p>
          </div>

          {/* Primary Tab Navigation Container Card */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(52,85,150,0.88), rgba(38,65,120,0.82))",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              overflow: "hidden",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(0,198,255,0.08)",
            }}
          >
            {/* Tab Controller Buttons Header Shell */}
            <div
              className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 py-4 px-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              {["Banking", "Transfers", "Loans", "Reports"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: activeTab === tab ? "linear-gradient(90deg,#007BFF,#00C6FF)" : "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Content Core: Conditionally switches headings, texts, and item lists depending on activeTab state */}
            <div className="row align-items-center p-3 p-sm-4 p-lg-5 g-4">
              <div className="col-lg-6 text-center text-lg-start">
                <h3
                  className="fw-bold text-white mb-4"
                  style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
                >
                  {activeTab === "Banking" && "Secure Banking"}
                  {activeTab === "Transfers" && "Instant Transfers"}
                  {activeTab === "Loans" && "Loan Services"}
                  {activeTab === "Reports" && "Smart Reports"}
                </h3>

                <p
                  style={{
                    color: "#CBD5E1",
                    lineHeight: "1.8",
                    fontSize: "1.05rem",
                  }}
                >
                  {activeTab === "Banking" && "Open savings and business accounts securely with protected authentication and modern banking tools."}
                  {activeTab === "Transfers" && "Transfer money instantly, manage beneficiaries and make secure transactions anytime."}
                  {activeTab === "Loans" && "Apply for home, education, personal and business loans quickly and securely."}
                  {activeTab === "Reports" && "Track your account activity, balances and transactions through smart insights."}
                </p>

                <ul
                  className="text-start d-inline-block d-lg-block"
                  style={{
                    color: "#94A3B8",
                    lineHeight: "2",
                    marginTop: "20px",
                  }}
                >
                  {activeTab === "Banking" && (
                    <>
                      <li>Savings Accounts</li>
                      <li>Business Accounts</li>
                      <li>Deposits</li>
                      <li>Secure Login</li>
                    </>
                  )}
                  {activeTab === "Transfers" && (
                    <>
                      <li>Instant Transfers</li>
                      <li>Beneficiaries</li>
                      <li>Secure Payments</li>
                      <li>Quick Transactions</li>
                    </>
                  )}
                  {activeTab === "Loans" && (
                    <>
                      <li>Home Loan</li>
                      <li>Education Loan</li>
                      <li>Personal Loan</li>
                      <li>Business Loan</li>
                    </>
                  )}
                  {activeTab === "Reports" && (
                    <>
                      <li>Transaction History</li>
                      <li>Account Insights</li>
                      <li>Financial Reports</li>
                      <li>Analytics</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Right Side Adaptive Showcase Asset Wrapper */}
              <div className="col-lg-6 d-flex justify-content-center mt-4 mt-lg-0">
                <div
                  style={{
                    width: "min(220px, 50vw)",
                    height: "min(220px, 50vw)",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,198,255,0.18), rgba(0,198,255,0.02))",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 0 60px rgba(0,198,255,0.18)",
                  }}
                >
                  {activeTab === "Banking" && <Landmark size={80} color="#38BDF8" />}
                  {activeTab === "Transfers" && <ArrowLeftRight size={80} color="#22D3EE" />}
                  {activeTab === "Loans" && <BadgeDollarSign size={80} color="#10B981" />}
                  {activeTab === "Reports" && <BarChart3 size={80} color="#A78BFA" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion Block Layer */}
      <div id="faq" className="container mt-5 pt-4 pb-5">
        <h2
          className="fw-bold mb-3 text-center"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            background: "linear-gradient(90deg,#FFFFFF,#7DD3FC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Frequently Asked Questions
        </h2>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "1.1rem",
            maxWidth: "650px",
            margin: "0 auto 40px",
            textAlign: "center",
          }}
        >
          Find answers to common questions about accounts, security and banking services.
        </p>

        {/* Bootstrap Native Accordion Shell Component (Triggers drop down displays via custom HTML data attributes) */}
        <div className="accordion" id="faqAccordion">
          
          {/* FAQ Item Unit 1 */}
          <div
            className="accordion-item border-0 mb-3"
            style={{
              borderRadius: "22px",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(25,45,85,0.92), rgba(18,35,70,0.88))",
              border: "1px solid rgba(0,198,255,0.12)",
              boxShadow: "0 0 18px rgba(0,198,255,0.05)",
            }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
                style={{
                  background: "transparent",
                  color: "#F8FAFC",
                  padding: "24px 28px",
                  fontSize: "1.08rem",
                  boxShadow: "none",
                }}
              >
                How do I open an account?
              </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div
                className="accordion-body"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "#CBD5E1",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  lineHeight: "1.8",
                  padding: "0px 28px 24px 28px",
                }}
              >
                Register an account, login, and use the Open Account feature to create a savings, current, or business account.
              </div>
            </div>
          </div>

          {/* FAQ Item Unit 2 */}
          <div
            className="accordion-item border-0 mb-3"
            style={{
              borderRadius: "22px",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(25,45,85,0.92), rgba(18,35,70,0.88))",
              border: "1px solid rgba(0,198,255,0.12)",
              boxShadow: "0 0 18px rgba(0,198,255,0.05)",
            }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
                style={{
                  background: "transparent",
                  color: "#F8FAFC",
                  padding: "24px 28px",
                  fontSize: "1.08rem",
                  boxShadow: "none",
                }}
              >
                How secure is Maverick Bank?
              </button>
            </h2>
            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div
                className="accordion-body"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "#CBD5E1",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  lineHeight: "1.8",
                  padding: "0px 28px 24px 28px",
                }}
              >
                Maverick Bank provides secure authentication, protected account access and safe transaction handling.
              </div>
            </div>
          </div>

          {/* FAQ Item Unit 3 */}
          <div
            className="accordion-item border-0 mb-3"
            style={{
              borderRadius: "22px",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(25,45,85,0.92), rgba(18,35,70,0.88))",
              border: "1px solid rgba(0,198,255,0.12)",
              boxShadow: "0 0 18px rgba(0,198,255,0.05)",
            }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
                style={{
                  background: "transparent",
                  color: "#F8FAFC",
                  padding: "24px 28px",
                  fontSize: "1.08rem",
                  boxShadow: "none",
                }}
              >
                Can I apply for loans online?
              </button>
            </h2>
            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div
                className="accordion-body"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "#CBD5E1",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  lineHeight: "1.8",
                  padding: "0px 28px 24px 28px",
                }}
              >
                Yes. Customers can explore loan products and apply directly through the dashboard.
              </div>
            </div>
          </div>

          {/* FAQ Item Unit 4 */}
          <div
            className="accordion-item border-0"
            style={{
              borderRadius: "22px",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(25,45,85,0.92), rgba(18,35,70,0.88))",
              border: "1px solid rgba(0,198,255,0.12)",
              boxShadow: "0 0 18px rgba(0,198,255,0.05)",
            }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq4"
                style={{
                  background: "transparent",
                  color: "#F8FAFC",
                  padding: "24px 28px",
                  fontSize: "1.08rem",
                  boxShadow: "none",
                }}
              >
                How do I reset my password?
              </button>
            </h2>
            <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div
                className="accordion-body"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "#CBD5E1",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  lineHeight: "1.8",
                  padding: "0px 28px 24px 28px",
                }}
              >
                Click on the Forgot Password option in the login page to reset your password.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Application Footer Segment */}
      <footer
        style={{
          marginTop: "100px",
          background: "linear-gradient(135deg,#163A70 0%, #1E4B8F 35%, #102A56 100%)",
          borderTop: "2px solid rgba(56,189,248,0.15)",
          boxShadow: "0 -10px 40px rgba(0,198,255,0.08)",
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          padding: "clamp(40px,5vw,70px) 20px 25px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient background decoration circle for branding consistency */}
        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(0,198,255,0.10)",
            filter: "blur(90px)",
            top: "-100px",
            right: "-80px",
          }}
        />
        <div className="container">
          {/* 
            Footer Navigation Row: 
            Uses 'text-center text-lg-start' to toggle centered layouts on phones 
            and crisp left-aligned text on typical wide desktop displays.
          */}
          <div className="row g-5 text-center text-lg-start">
            <div className="col-lg-4">
              <h2
                className="fw-bold"
                style={{
                  background: "linear-gradient(90deg,#FFFFFF,#7DD3FC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MAVERICK BANK
              </h2>

              <p
                style={{
                  color: "#94A3B8",
                  lineHeight: "1.9",
                  marginTop: "15px",
                }}
              >
                Secure, seamless and modern banking experience designed for smarter financial management.
              </p>
            </div>

            <div className="col-lg-2 col-md-4">
              <h5 className="text-white fw-bold mb-3">Quick Links</h5>
              <div className="d-flex flex-column gap-2">
                <a href="#" style={footerLink}>
                  Home
                </a>
                <a href="#services" style={footerLink}>
                  Services
                </a>
                <a href="#faq" style={footerLink}>
                  FAQ
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-4">
              <h5 className="text-white fw-bold mb-3">Company</h5>
              <div className="d-flex flex-column gap-2">
                <Link to="/about" style={footerLink}>
                  About Us
                </Link>
                <Link to="/contact" style={footerLink}>
                  Contact Us
                </Link>
                <Link to="/login" style={footerLink}>
                  Login
                </Link>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <h5 className="text-white fw-bold mb-3">Contact</h5>
              <p style={footerText}>📧 support@maverickbank.com</p>
              <p style={footerText}>📞 1800-200-900</p>
              <p style={footerText}>📍 Chennai, India</p>
              <p
                style={{
                  color: "#38BDF8",
                  fontWeight: 600,
                  marginTop: "15px",
                }}
              >
                24/7 Customer Support
              </p>
            </div>
          </div>

          {/* Copyright Divider Bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              marginTop: "45px",
              paddingTop: "25px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#64748B",
                margin: 0,
              }}
            >
              © 2026 Maverick Bank. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;