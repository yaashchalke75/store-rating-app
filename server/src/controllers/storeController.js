import prisma from '../config/prisma.js';

export const listStores = async (req, res) => {
  const { search = '' } = req.query;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 10);

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [total, stores] = await Promise.all([
    prisma.store.count({ where }),
    prisma.store.findMany({
      where,
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        ratings: { select: { rating: true, userId: true } },
      },
    }),
  ]);

  const items = stores.map((s) => {
    const mine = s.ratings.find((r) => r.userId === req.user.id);
    const avg = s.ratings.length
      ? s.ratings.reduce((sum, r) => sum + r.rating, 0) / s.ratings.length
      : null;
    return {
      id: s.id,
      name: s.name,
      address: s.address,
      avgRating: avg,
      myRating: mine?.rating || null,
    };
  });

  res.json({
    items,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    page,
  });
};
