import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { dashboard, listRatings } from '../controllers/ownerController.js';

const router = Router();

router.use(authenticate, requireRole('OWNER'));

router.get('/dashboard', asyncHandler(dashboard));
router.get('/ratings', asyncHandler(listRatings));

export default router;
