import prisma from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';
import { signToken } from '../utils/jwt.js';
import {
  hashPassword,
  comparePassword,
  findByEmail,
  publicUser,
  normalizeEmail,
} from '../services/userService.js';

export const register = async (req, res) => {
  const { name, address, password } = req.body;
  const email = normalizeEmail(req.body.email);
  if (await findByEmail(email)) throw new ApiError(409, 'Email already registered');

  const user = await prisma.user.create({
    data: { name, email, address, password: await hashPassword(password), role: 'USER' },
  });

  const token = signToken({ id: user.id, role: user.role });
  res.status(201).json({ token, user: publicUser(user) });
};

export const login = async (req, res) => {
  const { password } = req.body;
  const user = await findByEmail(req.body.email);
  if (!user || !(await comparePassword(password, user.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const token = signToken({ id: user.id, role: user.role });
  res.json({ token, user: publicUser(user) });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user || !(await comparePassword(currentPassword, user.password))) {
    throw new ApiError(400, 'Current password is incorrect');
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { password: await hashPassword(newPassword) },
  });
  res.json({ message: 'Password updated' });
};

export const logout = (_req, res) => {
  res.json({ message: 'Logged out' });
};
