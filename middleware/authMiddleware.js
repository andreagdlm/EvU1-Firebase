const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../controllers/authController').JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(403).json({ code: 403, message: 'Token requerido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      const errorMessage = err.name === 'JsonWebTokenError' ? 'Token inválido' : 'Token expirado';
      const errorCode = err.name === 'TokenExpiredError' ? 401 : 403;
      return res.status(errorCode).json({ code: errorCode, message: errorMessage });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
