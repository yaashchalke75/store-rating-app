import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { listStores } from '../controllers/storeController.js';

const router = Router();

router.get('/', authenticate, asyncHandler(listStores));

export default router;
