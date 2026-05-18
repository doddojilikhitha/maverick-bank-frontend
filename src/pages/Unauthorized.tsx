import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, #1a3c5e 0%, #2d6a9f 100%)",
      }}
    >
      <div className="text-center text-white">
        <div style={{ fontSize: "60px" }}>
          🔒
        </div>

        <h2 className="fw-bold mt-3">
          Access Denied
        </h2>

        <p className="mb-4 text-white-50">
          You don't have permission
          to view this page.
        </p>

        <button
          className="btn btn-light fw-semibold px-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;