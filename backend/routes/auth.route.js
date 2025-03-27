const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyToken } = require('../middlewares/auth.middleware');

// Company login
router.post("/company/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const company = await prisma.company.findFirst({
      where: { email }
    });
    
    if (!company) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, company.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: company.id, 
        email: company.email,
        type: 'company'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({
      token,
      company: {
        id: company.id,
        name: company.name,
        email: company.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// TPO login
router.post("/tpo/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const tpo = await prisma.tpo.findFirst({
      where: { email }
    });
    
    if (!tpo) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // For TPO, you might need to implement proper password verification here
    // This is just a placeholder since the schema doesn't have a password field for TPO
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: tpo.id, 
        email: tpo.email,
        type: 'tpo'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({
      token,
      tpo: {
        id: tpo.id,
        name: tpo.name,
        email: tpo.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user info
router.get("/me", verifyToken, async (req, res) => {
  try {
    // Check if user is a company
    let company = null;
    try {
      company = await prisma.company.findFirst({
        where: { email: req.user.email },
        select: { id: true, name: true, email: true }
      });
    } catch (error) {
      // Ignore error, just means not a company
    }
    
    // Check if user is a TPO
    let tpo = null;
    try {
      tpo = await prisma.tpo.findFirst({
        where: { email: req.user.email }
      });
    } catch (error) {
      // Ignore error, just means not a TPO
    }
    
    // Check if user is a student
    let student = null;
    try {
      student = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          gimg: true
        }
      });
    } catch (error) {
      // Ignore error, just means not a student
    }
    
    // Determine user type and return appropriate data
    let userType = null;
    let userData = null;
    
    if (company) {
      userType = 'company';
      userData = company;
    } else if (tpo) {
      userType = 'tpo';
      userData = tpo;
    } else if (student) {
      userType = 'student';
      userData = student;
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      userType,
      user: userData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;