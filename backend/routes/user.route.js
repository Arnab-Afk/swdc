const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken } = require('../middlewares/auth.middleware');

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        skills: true,
        experiences: true,
        projects: true,
        certifications: true,
        interestedRoles: true,
        interestedCompanies: true,
        resumes: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { 
      firstName, lastName, phone, address, motherName, 
      degree, branch, yearOfGraduation, cgpa, rollno 
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
        phone,
        address,
        motherName,
        degree,
        branch,
        yearOfGraduation,
        cgpa,
        rollno
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a skill
router.post("/skills", verifyToken, async (req, res) => {
  try {
    const { skillName } = req.body;
    
    const skill = await prisma.userSkill.create({
      data: {
        userId: req.user.id,
        skillName
      }
    });

    res.status(201).json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin/TPO access)
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        degree: true,
        branch: true,
        yearOfGraduation: true,
        cgpa: true,
        rollno: true
      }
    });
    
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add experience
router.post("/experiences", verifyToken, async (req, res) => {
  try {
    const { company, profile, fromDate, toDate, description } = req.body;
    
    const experience = await prisma.experience.create({
      data: {
        userId: req.user.id,
        company,
        profile,
        fromDate: fromDate ? new Date(fromDate) : null,
        toDate: toDate ? new Date(toDate) : null,
        description
      }
    });

    res.status(201).json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add project
router.post("/projects", verifyToken, async (req, res) => {
  try {
    const { projectName } = req.body;
    
    const project = await prisma.userProject.create({
      data: {
        userId: req.user.id,
        projectName
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add certification
router.post("/certifications", verifyToken, async (req, res) => {
  try {
    const { certificationName } = req.body;
    
    const certification = await prisma.userCertification.create({
      data: {
        userId: req.user.id,
        certificationName
      }
    });

    res.status(201).json(certification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add interested role
router.post("/roles", verifyToken, async (req, res) => {
  try {
    const { roleName } = req.body;
    
    const role = await prisma.userRole.create({
      data: {
        userId: req.user.id,
        roleName
      }
    });

    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add interested company
router.post("/companies", verifyToken, async (req, res) => {
  try {
    const { companyName } = req.body;
    
    const company = await prisma.userCompany.create({
      data: {
        userId: req.user.id,
        companyName
      }
    });

    res.status(201).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Validate Google OAuth token
router.post("/auth/validate", async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // You'll need to install: npm install google-auth-library
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    // Get user payload from verified token
    const payload = ticket.getPayload();
    const { email, name, picture, given_name, family_name } = payload;
    
    // Find or create user based on verified email
    let user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      // Create new user if they don't exist
      user = await prisma.user.create({
        data: {
          email,
          firstName: given_name || name?.split(' ')[0] || '',
          lastName: family_name || name?.split(' ').slice(1).join(' ') || '',
          profileImage: picture || null,
          // Add any other fields you want to initialize
        }
      });
    }
    
    // Generate JWT for authenticated sessions
    const jwt = require('jsonwebtoken');
    const userToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Return user data and token
    res.json({
      user,
      token: userToken
    });
  } catch (error) {
    console.error('Auth validation error:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});

// Get user notifications
router.get("/notifications", verifyToken, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark notification as read
router.put("/notifications/:id/read", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await prisma.notification.update({
      where: {
        id: parseInt(id),
        userId: req.user.id
      },
      data: {
        read: true
      }
    });
    
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark all notifications as read
router.put("/notifications/read-all", verifyToken, async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user.id,
        read: false
      },
      data: {
        read: true
      }
    });
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

