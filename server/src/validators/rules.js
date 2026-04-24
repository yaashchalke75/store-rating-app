const nameRule = (v) => {
  if (!v) return 'Name is required';
  if (v.length < 20 || v.length > 60) return 'Name must be 20-60 characters';
  return '';
};

const emailRule = (v) => {
  if (!v) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Invalid email';
  return '';
};

const passwordRule = (v) => {
  if (!v) return 'Password is required';
  if (v.length < 8 || v.length > 16) return 'Password must be 8-16 characters';
  if (!/[A-Z]/.test(v)) return 'Password needs one uppercase letter';
  if (!/[^a-zA-Z0-9]/.test(v)) return 'Password needs one special character';
  return '';
};

const addressRule = (v) => {
  if (!v) return 'Address is required';
  if (v.length > 400) return 'Address must be under 400 characters';
  return '';
};

const ratingRule = (v) => {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1 || n > 5) return 'Rating must be an integer 1-5';
  return '';
};

const roleRule = (v) => (['ADMIN', 'USER', 'OWNER'].includes(v) ? '' : 'Invalid role');

export const registerSchema = (b) => ({
  name: nameRule(b.name),
  email: emailRule(b.email),
  address: addressRule(b.address),
  password: passwordRule(b.password),
});

export const loginSchema = (b) => ({
  email: emailRule(b.email),
  password: b.password ? '' : 'Password is required',
});

export const changePasswordSchema = (b) => ({
  currentPassword: b.currentPassword ? '' : 'Current password required',
  newPassword: passwordRule(b.newPassword),
});

export const createUserSchema = (b) => ({
  ...registerSchema(b),
  role: roleRule(b.role),
});

export const createStoreSchema = (b) => ({
  name: nameRule(b.name),
  email: emailRule(b.email),
  address: addressRule(b.address),
  ownerId: b.ownerId ? '' : 'Owner is required',
});

export const ratingSchema = (b) => ({
  rating: ratingRule(b.rating),
  storeId: b.storeId ? '' : 'Store is required',
});

export const ratingUpdateSchema = (b) => ({
  rating: ratingRule(b.rating),
});
