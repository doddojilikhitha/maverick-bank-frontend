import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, #1a3c5e 0%, #2d6a9f 100%)"
      }}
    >
      <div className="text-center text-white">
        <div style={{ fontSize: "80px" }}>
          🏦
        </div>

        <h1
          className="fw-bold"
          style={{ fontSize: "80px" }}
        >
          404
        </h1>

        <h4 className="mb-3">
          Page Not Found
        </h4>

        <p className="text-white-50 mb-4">
          The page you are looking for
          does not exist.
        </p>

        <button
          className="btn btn-light fw-semibold px-4"
          onClick={() =>
            navigate("/login")
          }
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NotFound;