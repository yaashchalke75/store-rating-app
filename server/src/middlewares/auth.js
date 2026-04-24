import { verifyToken } from '../utils/jwt.js';
import ApiError from '../utils/ApiError.js';

export const authenticate = (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Unauthorized'));
  }
  try {
    req.user = verifyToken(header.slice(7));
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Forbidden'));
  }
  next();
};
