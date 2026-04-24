export const notFound = (_req, res) => {
  res.status(404).json({ message: 'Not found' });
};

export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: err.message || 'Server error' });
};
