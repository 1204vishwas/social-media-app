export const errorHandler = (err, _req, res, _next) => {
  console.error('[Aura Server Error]:', err.stack || err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      success: false,
      message: err.message || 'Internal Server Error',
    })
  );
};
