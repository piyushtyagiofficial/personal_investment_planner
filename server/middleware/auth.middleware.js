import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import BlacklistToken from '../models/blacklistedToken.model.js';

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted) return res.status(401).json({ message: 'Token is blacklisted' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};
