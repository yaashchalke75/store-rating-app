import prisma from '../config/prisma.js';

export const dashboard = async (req, res) => {
  const agg = await prisma.rating.aggregate({
    where: { store: { ownerId: req.user.id } },
    _avg: { rating: true },
    _count: { rating: true },
  });

  res.json({
    avgRating: agg._avg.rating,
    totalRatings: agg._count.rating,
  });
};

export const listRatings = async (req, res) => {
  const ratings = await prisma.rating.findMany({
    where: { store: { ownerId: req.user.id } },
    orderBy: { updatedAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  res.json({
    items: ratings.map((r) => ({
      userName: r.user.name,
      userEmail: r.user.email,
      rating: r.rating,
      date: r.updatedAt,
    })),
  });
};
