import React, { useEffect, useState } from "react";
import Navbar  from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getLoanProducts } from "../../services/loanService";
import { LoanProduct }     from "../../types/loan.types";
import { useNavigate }     from "react-router-dom";
import { House, CarFront, Wallet, GraduationCap, Landmark } from "lucide-react";

const LoanProducts: React.FC = () => {
  const [products, setProducts] = useState<LoanProduct[]>([]);
  const [loading,  setLoading]  = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getLoanProducts().then((res) => {
      if (res.success) setProducts(res.data);
      setLoading(false);
    });
  }, []);

  const getLoanIcon = (productName: string) => {
    const iconStyle = {
      size: 24,
      strokeWidth: 2.4,
    };

    switch (productName) {
      case "Home Loan":
        return (
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #DCEBFF, #C7DBF7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <House {...iconStyle} color="#173B73" />
          </div>
        );
      case "Car Loan":
        return (
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #E4F7EA, #D0EEDB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CarFront {...iconStyle} color="#166534" />
          </div>
        );
      case "Personal Loan":
        return (
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #FFF2DD, #FFE7C2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Wallet {...iconStyle} color="#B45309" />
          </div>
        );
      case "Education Loan":
        return (
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #F0E7FF, #E4D4FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GraduationCap {...iconStyle} color="#6D28D9" />
          </div>
        );
      default:
        return (
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #E2E8F0, #CBD5E1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Landmark {...iconStyle} color="#334155" />
          </div>
        );
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
          {/* Header */}
          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#173B73",
                fontSize: "30px",
              }}
            >
              Available Loan Products
            </h2>
            <p
              style={{
                color: "#64748B",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Explore choices and apply for flexible financing systems
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#173B73" }} />
            </div>
          ) : (
            <div className="row g-4">
              {products.map((product) => (
                <div className="col-md-6" key={product.loanProductId}>
                  <div
                    className="card border-0 h-100"
                    style={{
                      borderRadius: "18px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 10px rgba(15,23,42,0.03)",
                      overflow: "hidden"
                    }}
                  >
                    {/* Header Block */}
                    <div className="p-4 pb-0 bg-white border-0">
                      <div className="d-flex align-items-center gap-3">
                        {getLoanIcon(product.productName)}
                        <div>
                          <h4 className="mb-0 fw-bold" style={{ color: "#173B73", fontSize: "20px" }}>
                            {product.productName}
                          </h4>
                          <small style={{ color: "#64748B", fontWeight: 500 }}>
                            Instant Digital Processing
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Financial Metrics Row */}
                    <div className="card-body p-4">
                      <div className="row text-center g-3">
                        <div className="col-4">
                          <div
                            className="p-3"
                            style={{ background: "#F8FAFC", borderRadius: "14px" }}
                          >
                            <p className="fw-semibold mb-1" style={{ fontSize: "11px", color: "#64748B", letterSpacing: "0.5px" }}>
                              MAX AMOUNT
                            </p>
                            <p className="fw-bold mb-0" style={{ color: "#173B73", fontSize: "15px" }}>
                              ₹{product.loanAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="col-4">
                          <div
                            className="p-3"
                            style={{ background: "#F8FAFC", borderRadius: "14px" }}
                          >
                            <p className="fw-semibold mb-1" style={{ fontSize: "11px", color: "#64748B", letterSpacing: "0.5px" }}>
                              INTEREST
                            </p>
                            <p className="fw-bold mb-0" style={{ color: "#15803D", fontSize: "15px" }}>
                              {product.interestRate}% p.a.
                            </p>
                          </div>
                        </div>
                        <div className="col-4">
                          <div
                            className="p-3"
                            style={{ background: "#F8FAFC", borderRadius: "14px" }}
                          >
                            <p className="fw-semibold mb-1" style={{ fontSize: "11px", color: "#64748B", letterSpacing: "0.5px" }}>
                              TENURE
                            </p>
                            <p className="fw-bold mb-0" style={{ color: "#173B73", fontSize: "15px" }}>
                              {product.tenureMonths} mos
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Block */}
                    <div className="card-footer bg-white border-0 pt-0 pb-4 px-4">
                      <button
                        className="btn w-100 text-white fw-bold py-3"
                        style={{
                          background: "linear-gradient(135deg, #173B73, #1E3A5F)",
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 6px 18px rgba(23,59,115,0.15)",
                        }}
                        onClick={() =>
                          navigate("/customer/apply-loan", {
                            state: { product },
                          })
                        }
                      >
                        Apply for Loan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanProducts;