const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken, isCompany, isTpo } = require('../middlewares/auth.middleware');
const bcrypt = require('bcrypt');

// Get all companies (public)
router.get("/", async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        description: true
      }
    });
    
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get company by ID
router.get("/:id", async (req, res) => {
  try {
    const companyId = parseInt(req.params.id);
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        email: true,
        description: true
      }
    });
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register a new company (TPO only)
router.post("/", verifyToken, isTpo, async (req, res) => {
  try {
    const { name, email, description, password } = req.body;
    
    // Check if company with this email already exists
    const existingCompany = await prisma.company.findFirst({
      where: { email }
    });
    
    if (existingCompany) {
      return res.status(400).json({ message: 'Company with this email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const company = await prisma.company.create({
      data: {
        name,
        email,
        description,
        password: hashedPassword
      }
    });
    
    // Don't return the password
    const { password: _, ...companyWithoutPassword } = company;
    
    res.status(201).json(companyWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update company profile (company or TPO)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const companyId = parseInt(req.params.id);
    const { name, description } = req.body;
    
    // Get company details
    const company = await prisma.company.findUnique({
      where: { id: companyId }
    });
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    // Check authorization
    const tpo = await prisma.tpo.findFirst({ where: { email: req.user.email } });
    if (company.email !== req.user.email && !tpo) {
      return res.status(403).json({ message: 'Not authorized to update this company' });
    }
    
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: { name, description },
      select: {
        id: true,
        name: true,
        email: true,
        description: true
      }
    });
    
    res.json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs posted by a company
router.get("/:id/jobs", async (req, res) => {
  try {
    const companyId = parseInt(req.params.id);
    
    // Get company details
    const company = await prisma.company.findUnique({
      where: { id: companyId }
    });
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    const jobs = await prisma.jobPosting.findMany({
      where: { companyId: company.email },
      include: {
        branches: true,
        skills: true
      }
    });
    
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;