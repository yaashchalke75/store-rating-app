import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

export const hashPassword = (pw) => bcrypt.hash(pw, 10);
export const comparePassword = (pw, hash) => bcrypt.compare(pw, hash);

export const publicUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  address: u.address,
  role: u.role,
});

export const normalizeEmail = (email) => email.trim().toLowerCase();

export const findByEmail = (email) =>
  prisma.user.findUnique({ where: { email: normalizeEmail(email) } });
