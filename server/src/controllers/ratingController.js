import prisma from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';

export const submitRating = async (req, res) => {
  const storeId = Number(req.body.storeId);
  const rating = Number(req.body.rating);

  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) throw new ApiError(404, 'Store not found');

  const saved = await prisma.rating.upsert({
    where: { userId_storeId: { userId: req.user.id, storeId } },
    update: { rating },
    create: { userId: req.user.id, storeId, rating },
  });

  res.status(201).json(saved);
};

export const updateRating = async (req, res) => {
  const storeId = Number(req.params.storeId);
  const rating = Number(req.body.rating);

  const existing = await prisma.rating.findUnique({
    where: { userId_storeId: { userId: req.user.id, storeId } },
  });
  if (!existing) throw new ApiError(404, 'Rating not found');

  const updated = await prisma.rating.update({
    where: { id: existing.id },
    data: { rating },
  });
  res.json(updated);
};
