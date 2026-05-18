import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#163A70 0%, #1E4B8F 35%, #0F172A 100%)",
        padding: "60px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft glow */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "rgba(0,198,255,0.14)",
          filter: "blur(90px)",
          top: "-5%",
          left: "-5%",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "rgba(125,211,252,0.14)",
          filter: "blur(90px)",
          bottom: "-5%",
          right: "-5%",
        }}
      />

      <div className="container position-relative">

        {/* Back Home */}
        <div className="mb-5">
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
            }}
           onMouseEnter={(e) => {
             e.currentTarget.style.transform =
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
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-5">
          <h1
            className="fw-bold"
            style={{
              fontSize: "3.5rem",
              background:
                "linear-gradient(90deg,#FFFFFF,#7DD3FC)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            About Maverick Bank
          </h1>

          <p
            style={{
              color: "#CBD5E1",
              fontSize: "1.15rem",
              maxWidth: "800px",
              margin: "20px auto 0",
              lineHeight: "1.9",
            }}
          >
            Maverick Bank is a secure
            and modern banking platform
            designed to simplify
            transactions, account
            management and financial
            services through innovation
            and reliability.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {[
            {
              title: "Our Mission",
              desc:
                "To provide secure and smart banking experiences through trust and innovation.",
              glow:
                "rgba(56,189,248,0.45)",
            },
            {
              title: "Our Vision",
              desc:
                "To make digital banking simple, accessible and efficient.",
              glow:
                "rgba(99,102,241,0.45)",
            },
            {
              title: "Why Maverick?",
              desc:
                "Built for secure transactions, seamless experience and modern banking needs.",
              glow:
                "rgba(20,184,166,0.45)",
            },
          ].map((item, index) => (
            <div
              className="col-lg-4"
              key={index}
            >
              <div
                style={{
                  background:
                    "rgba(255,255,255,0.07)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "28px",
                  padding: "35px",
                  backdropFilter:
                    "blur(20px)",
                  transition:
                    "all 0.35s ease",
                  height: "100%",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg,#173B73,#0F172A)";
                  e.currentTarget.style.boxShadow =
                    `0 0 30px ${item.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              >
                <h3 className="fw-bold text-white mb-3">
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#CBD5E1",
                    lineHeight: "1.8",
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
  );
};

export default About;