import ApiError from '../utils/ApiError.js';

export const validate = (validator) => (req, _res, next) => {
  const errors = validator(req.body);
  const first = Object.values(errors).find(Boolean);
  if (first) return next(new ApiError(400, first));
  next();
};
