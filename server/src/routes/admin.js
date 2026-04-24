import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createUserSchema, createStoreSchema } from '../validators/rules.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  dashboard,
  listUsers,
  getUserById,
  createUser,
  listStores,
  createStore,
} from '../controllers/adminController.js';

const router = Router();

router.use(authenticate, requireRole('ADMIN'));

router.get('/dashboard', asyncHandler(dashboard));
router.get('/users', asyncHandler(listUsers));
router.get('/users/:id', asyncHandler(getUserById));
router.post('/users', validate(createUserSchema), asyncHandler(createUser));
router.get('/stores', asyncHandler(listStores));
router.post('/stores', validate(createStoreSchema), asyncHandler(createStore));

export default router;
