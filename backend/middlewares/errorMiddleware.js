export const errorMiddleware = (err, req, res, next) => {
  res.send(500).json({ error: err.message });
};
