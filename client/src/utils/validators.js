export const validateName = (v) => {
  if (!v) return 'Name is required';
  if (v.length < 20 || v.length > 60) return 'Name must be 20-60 characters';
  return '';
};

export const validateAddress = (v) => {
  if (!v) return 'Address is required';
  if (v.length > 400) return 'Address must be under 400 characters';
  return '';
};

export const validateEmail = (v) => {
  if (!v) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Invalid email';
  return '';
};

export const validatePassword = (v) => {
  if (!v) return 'Password is required';
  if (v.length < 8 || v.length > 16) return 'Password must be 8-16 characters';
  if (!/[A-Z]/.test(v)) return 'Password needs one uppercase letter';
  if (!/[^a-zA-Z0-9]/.test(v)) return 'Password needs one special character';
  return '';
};

export const validateRating = (v) => {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1 || n > 5) return 'Rating must be 1-5';
  return '';
};
