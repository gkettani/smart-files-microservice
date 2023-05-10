export default function errorHandler(err, req, res, _next) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    err.statusCode = 400;
  }
  res.status(err.statusCode || 500).send(err.message);
};
