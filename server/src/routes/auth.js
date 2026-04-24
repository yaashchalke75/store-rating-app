import { Router } from 'express';
import { register, login, changePassword, logout } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema, changePasswordSchema } from '../validators/rules.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.patch('/change-password', authenticate, validate(changePasswordSchema), asyncHandler(changePassword));
router.post('/logout', authenticate, asyncHandler(logout));

export default router;
