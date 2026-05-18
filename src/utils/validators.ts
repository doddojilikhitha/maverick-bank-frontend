export const validateEmail = (email: string): string => {
  if (!email) return "Email is required.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Invalid email format.";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Minimum 8 characters required.";
  if (!/[A-Z]/.test(password)) return "Must have at least one uppercase letter.";
  if (!/[0-9]/.test(password)) return "Must have at least one number.";
  if (!/[^a-zA-Z0-9]/.test(password)) return "Must have at least one special character.";
  return "";
};

export const getPasswordStrength = (password: string): {
  strength: "Weak" | "Medium" | "Strong";
  color: string;
  percent: number;
} => {
  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { strength: "Weak",   color: "danger", percent: 25  };
  if (score <= 3) return { strength: "Medium", color: "warning", percent: 65 };
  return           { strength: "Strong",       color: "success", percent: 100 };
};

export const validatePhone = (phone: string): string => {
  if (!phone) return "";
  if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits.";
  return "";
};

export const validateAadhar = (aadhar: string): string => {
  if (!aadhar) return "";
  if (!/^\d{12}$/.test(aadhar)) return "Aadhar must be 12 digits.";
  return "";
};