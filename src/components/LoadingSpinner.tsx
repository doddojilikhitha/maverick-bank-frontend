import React from "react";

interface Props {
  message?: string;
}

const LoadingSpinner: React.FC<Props> = ({
  message = "Loading..."
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div
        className="spinner-border mb-3"
        style={{
          color: "#1a3c5e",
          width: "3rem",
          height: "3rem"
        }}
      />

      <p className="text-muted">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;