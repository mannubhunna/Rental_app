export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "None", color: "secondary" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { score: 0, label: "Very Weak", color: "danger" },
    { score: 1, label: "Weak", color: "danger" },
    { score: 2, label: "Fair", color: "warning" },
    { score: 3, label: "Good", color: "info" },
    { score: 4, label: "Strong", color: "success" },
    { score: 5, label: "Very Strong", color: "success" },
  ];

  return levels[Math.min(score, 5)];
};

export const validatePropertyForm = (data) => {
  const errors = {};
  if (!data.propertyName?.trim()) errors.propertyName = "Property title is required";
  if (!data.type) errors.type = "Category is required";
  if (!data.budget || Number(data.budget) <= 0) errors.budget = "Valid rent is required";
  if (!data.location?.trim()) errors.location = "Address is required";
  return errors;
};

export const validateLoginForm = (data) => {
  const errors = {};
  if (!data.email?.trim()) errors.email = "Email is required";
  else if (!validateEmail(data.email)) errors.email = "Enter a valid email";
  if (!data.password) errors.password = "Password is required";
  return errors;
};

export const validateSignupForm = (data) => {
  const errors = validateLoginForm(data);
  if (!data.name?.trim()) errors.name = "Name is required";
  if (!data.confirmPassword) errors.confirmPassword = "Confirm your password";
  else if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  if (data.password && data.password.length < 8)
    errors.password = "Password must be at least 8 characters";
  return errors;
};
