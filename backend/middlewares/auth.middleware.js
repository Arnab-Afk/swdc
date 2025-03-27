const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Middleware to verify JWT token
 */
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

/**
 * Check if user is authenticated
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

/**
 * Check if user is a TPO
 */
const isTpo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tpo = await prisma.tpo.findFirst({
      where: { email: req.user.email }
    });
    
    if (!tpo) {
      return res.status(403).json({ message: 'Requires TPO role' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Check if user is a company
 */
const isCompany = async (req, res, next) => {
  try {
    const company = await prisma.company.findFirst({
      where: { email: req.user.email }
    });
    
    if (!company) {
      return res.status(403).json({ message: 'Requires company access' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  verifyToken,
  isAuthenticated,
  isTpo,
  isCompany
};