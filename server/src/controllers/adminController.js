import prisma from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';
import { hashPassword, publicUser, normalizeEmail } from '../services/userService.js';

const USER_SORT_FIELDS = ['name', 'email', 'role', 'address', 'createdAt'];
const STORE_SORT_FIELDS = ['name', 'email', 'address', 'createdAt'];

export const dashboard = async (_req, res) => {
  const [totalUsers, totalStores, totalRatings] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.count(),
  ]);
  res.json({ totalUsers, totalStores, totalRatings });
};

export const listUsers = async (req, res) => {
  const { search = '', role, sortBy = 'name', order = 'asc' } = req.query;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 10);

  const where = {
    ...(role && { role }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ],
    }),
  };

  const orderBy = USER_SORT_FIELDS.includes(sortBy)
    ? { [sortBy]: order === 'desc' ? 'desc' : 'asc' }
    : { name: 'asc' };

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  res.json({
    items: users.map(publicUser),
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    page,
  });
};

export const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, 'User not found');

  const payload = publicUser(user);

  if (user.role === 'OWNER') {
    const agg = await prisma.rating.aggregate({
      where: { store: { ownerId: user.id } },
      _avg: { rating: true },
    });
    payload.storeRating = agg._avg.rating;
  }

  res.json(payload);
};

export const createUser = async (req, res) => {
  const { name, address, password, role } = req.body;
  const email = normalizeEmail(req.body.email);
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new ApiError(409, 'Email already in use');

  const user = await prisma.user.create({
    data: { name, email, address, role, password: await hashPassword(password) },
  });
  res.status(201).json(publicUser(user));
};

export const listStores = async (req, res) => {
  const { search = '', sortBy = 'name', order = 'asc' } = req.query;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 10);

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const orderBy = STORE_SORT_FIELDS.includes(sortBy)
    ? { [sortBy]: order === 'desc' ? 'desc' : 'asc' }
    : { name: 'asc' };

  const [total, stores] = await Promise.all([
    prisma.store.count({ where }),
    prisma.store.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: { ratings: { select: { rating: true } } },
    }),
  ]);

  const items = stores.map((s) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    address: s.address,
    avgRating: s.ratings.length
      ? s.ratings.reduce((sum, r) => sum + r.rating, 0) / s.ratings.length
      : null,
  }));

  res.json({
    items,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    page,
  });
};

export const createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;
  const owner = await prisma.user.findUnique({ where: { id: Number(ownerId) } });
  if (!owner || owner.role !== 'OWNER') throw new ApiError(400, 'Invalid owner');

  const store = await prisma.store.create({
    data: { name, email, address, ownerId: owner.id },
  });
  res.status(201).json(store);
};
