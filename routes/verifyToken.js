const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    reqq.status(400).send('Invalid Token');
  }
  next();
}