import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { env } from './config/env.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import storeRoutes from './routes/stores.js';
import ratingRoutes from './routes/ratings.js';
import ownerRoutes from './routes/owner.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/owner', ownerRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
