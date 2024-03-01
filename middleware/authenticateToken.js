const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Log the decoded token for debugging
    console.log('Decoded Token:', decodedToken);

    // Set the decoded token on req.user
    req.user = decodedToken;
    next();
  });
};

module.exports = authenticateToken;
