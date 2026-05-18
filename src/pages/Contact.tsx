import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #163A70 0%, #1E4B8F 35%, #0F172A 100%)",
        padding: "80px 20px",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow Effects */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(0,198,255,0.12)",
          filter: "blur(90px)",
          top: "-5%",
          left: "-5%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(125,211,252,0.12)",
          filter: "blur(90px)",
          bottom: "-5%",
          right: "-5%",
          pointerEvents: "none",
        }}
      />

      <div className="container position-relative" style={{ maxWidth: "1200px" }}>
        {/* Back Button */}
        <div className="mb-5">
          <Link
            to="/"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#FFFFFF",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              borderRadius: "999px",
              fontWeight: 600,
              transition: "all 0.3s ease",
              backdropFilter: "blur(14px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.background = "linear-gradient(135deg,#173B73,#0F172A)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(56,189,248,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-5 text-start">
          <h1
            className="fw-bold mb-3"
            style={{
              fontSize: "3.5rem",
              background: "linear-gradient(135deg,#FFFFFF 30%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.03em",
            }}
          >
            Get in Touch
          </h1>

          <p
            style={{
              color: "#CBD5E1",
              fontSize: "1.15rem",
              maxWidth: "550px",
              lineHeight: "1.8",
            }}
          >
            Have questions about accounts, security or support? Our banking team is here to assist you.
          </p>
        </div>

        {/* Layout Grid with Perfect Placement Tuning */}
        <div className="row g-5 align-items-stretch">
          
          {/* Left Info Cards */}
          <div className="col-lg-5 d-flex flex-column justify-content-between gap-3">
            {[
              {
                title: "Email Support",
                value: "support@maverickbank.com",
                icon: <Mail size={22} color="#38BDF8" />,
              },
              {
                title: "Phone Line",
                value: "1800-200-900",
                icon: <Phone size={22} color="#38BDF8" />,
              },
              {
                title: "Headquarters",
                value: "Chennai, India",
                icon: <MapPin size={22} color="#38BDF8" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="w-100 flex-grow-1 d-flex align-items-center"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "22px",
                  padding: "28px 24px",
                  gap: "20px",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.background = "linear-gradient(135deg,#173B73,#0F172A)";
                  e.currentTarget.style.boxShadow = "0 0 25px rgba(56,189,248,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    background: "rgba(56,189,248,0.12)",
                    padding: "14px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <h4 style={{ color: "#94A3B8", fontSize: "0.9rem", margin: 0 }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "#F8FAFC", fontSize: "1.05rem", margin: "6px 0 0 0" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Timeline Section */}
          <div className="col-lg-7 d-flex flex-column justify-content-between">
            <div
              style={{
                padding: "10px 24px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <h2
                  className="fw-bold mb-3"
                  style={{
                    color: "#F8FAFC",
                    fontSize: "2rem",
                  }}
                >
                  Why Contact Maverick Bank?
                </h2>

                <p
                  style={{
                    color: "#CBD5E1",
                    fontSize: "1.05rem",
                    lineHeight: "1.8",
                    marginBottom: "40px",
                    maxWidth: "550px",
                  }}
                >
                  Our support team helps users with account assistance, banking guidance and secure financial services whenever needed.
                </p>
              </div>

              <div className="d-flex flex-column justify-content-between flex-grow-1">
                {[
                  {
                    title: "Customer Support Hours",
                    desc: "Monday – Saturday • 9:00 AM – 7:00 PM",
                    glow: "rgba(56,189,248,0.45)",
                  },
                  {
                    title: "Banking Assistance",
                    desc: "Accounts, transactions, loans and online banking support.",
                    glow: "rgba(99,102,241,0.45)",
                  },
                  {
                    title: "Secure Communication",
                    desc: "Reliable and protected support for every banking need.",
                    glow: "rgba(20,184,166,0.45)",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="d-flex gap-4 position-relative"
                    style={{
                      paddingBottom: index !== 2 ? "30px" : "0px",
                      cursor: "pointer",
                      transition: "0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      const dot = e.currentTarget.querySelector(".timeline-dot") as HTMLElement;
                      const title = e.currentTarget.querySelector(".timeline-title") as HTMLElement;

                      if (dot) {
                        dot.style.transform = "scale(1.15)";
                        dot.style.boxShadow = `0 0 22px ${item.glow}`;
                      }
                      if (title) {
                        title.style.color = "#38BDF8";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const dot = e.currentTarget.querySelector(".timeline-dot") as HTMLElement;
                      const title = e.currentTarget.querySelector(".timeline-title") as HTMLElement;

                      if (dot) {
                        dot.style.transform = "scale(1)";
                        dot.style.boxShadow = "none";
                      }
                      if (title) {
                        title.style.color = "#FFFFFF";
                      }
                    }}
                  >
                    {/* Timeline Line/Dot Segment Setup */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        className="timeline-dot"
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg,#38BDF8,#2563EB)",
                          transition: "0.3s ease",
                          zIndex: 2,
                          marginTop: "4px"
                        }}
                      />

                      {index !== 2 && (
                        <div
                          style={{
                            width: "2px",
                            position: "absolute",
                            top: "22px",
                            bottom: "-10px",
                            background: "rgba(255,255,255,0.12)",
                            zIndex: 1,
                          }}
                        />
                      )}
                    </div>

                    {/* Content Section Area */}
                    <div style={{ transform: "translateY(0)" }}>
                      <h4
                        className="timeline-title"
                        style={{
                          color: "#FFFFFF",
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          transition: "0.3s ease",
                          margin: "0 0 6px 0",
                        }}
                      >
                        {item.title}
                      </h4>

                      <p
                        style={{
                          color: "#CBD5E1",
                          lineHeight: "1.6",
                          maxWidth: "480px",
                          margin: 0,
                          fontSize: "0.98rem"
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

        </div>
      </div>
    </div>
  );
};

export default Contact;