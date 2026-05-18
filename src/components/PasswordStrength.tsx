import React from "react";
import { getPasswordStrength } from "../utils/validators";

interface Props {
  password: string;
}

const PasswordStrength: React.FC<Props> = ({ password }) => {
  if (!password) return null;

  const { strength, color, percent } = getPasswordStrength(password);

  return (
    <div className="mt-1">
      <div className="progress" style={{ height: "6px" }}>
        <div
          className={`progress-bar bg-${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <small className={`text-${color}`}>
        Password Strength: <strong>{strength}</strong>
      </small>
      <div className="mt-1">
        <small className="text-muted">
          Requirements: 8+ chars, uppercase, number, special character
        </small>
      </div>
    </div>
  );
};

export default PasswordStrength;