import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Нет токена' });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👈 { id, login }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};

export default auth;
