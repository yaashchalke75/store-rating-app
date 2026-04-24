import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { ratingSchema, ratingUpdateSchema } from '../validators/rules.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { submitRating, updateRating } from '../controllers/ratingController.js';

const router = Router();

router.use(authenticate, requireRole('USER'));

router.post('/', validate(ratingSchema), asyncHandler(submitRating));
router.patch('/:storeId', validate(ratingUpdateSchema), asyncHandler(updateRating));

export default router;
