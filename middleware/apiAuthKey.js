const apiAuthMiddleware = (req, res, next) => {
    const apiKey = req.header('API-Key');
    console.log("API function layrr",apiKey)
    if (apiKey === 'nR826Yu92xOAFfS-n0895ZXDTV9XE5Q-BIYQ0M6xnhvqauJ') {
      next();
    } else {
      res.status(400).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = apiAuthMiddleware;
  