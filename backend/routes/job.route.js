const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken, isCompany, isTpo } = require('../middlewares/auth.middleware');

// Get all job postings
router.get("/", async (req, res) => {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: { 
        active: true,
        verified: true
      },
      include: {
        branches: true,
        skills: true,
        processSteps: true
      }
    });
    
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get job by id
router.get("/:id", async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId },
      include: {
        branches: true,
        skills: true,
        processSteps: true
      }
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new job posting (company only)
router.post("/", verifyToken, isCompany, async (req, res) => {
  try {
    const { 
      jobTitle, description, location, salary, applicationDeadline,
      degree, minCgpa, minExperienceMonths, imgurl, branches, skills, processSteps
    } = req.body;
    
    const job = await prisma.jobPosting.create({
      data: {
        companyId: req.user.email,
        jobTitle,
        description,
        location,
        imgurl,
        salary: salary ? parseFloat(salary) : null,
        postedDate: new Date(),
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
        active: true,
        verified: false, // Requires TPO verification
        degree,
        minCgpa: minCgpa ? parseFloat(minCgpa) : null,
        minExperienceMonths: minExperienceMonths ? parseInt(minExperienceMonths) : null,
        branches: {
          create: branches.map(branch => ({
            branchName: branch
          }))
        },
        skills: {
          create: skills.map(skill => ({
            skillName: skill
          }))
        },
        processSteps: {
          create: processSteps.map((step, index) => ({
            stepNumber: index + 1,
            stepName: step.stepName,
            description: step.description,
            fromDate: step.fromDate ? new Date(step.fromDate) : null,
            tillDate: step.tillDate ? new Date(step.tillDate) : null,
            location: step.location,
            durationMinutes: step.durationMinutes ? parseInt(step.durationMinutes) : null
          }))
        }
      }
    });
    
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a job posting (company only)
router.put("/:id", verifyToken, isCompany, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const { 
      jobTitle, description, location, salary, applicationDeadline,
      degree, minCgpa, minExperienceMonths, imgurl, active
    } = req.body;
    
    // Check if job belongs to the company
    const existingJob = await prisma.jobPosting.findUnique({
      where: { id: jobId }
    });
    
    if (!existingJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    if (existingJob.companyId !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized to modify this job' });
    }
    
    const updatedJob = await prisma.jobPosting.update({
      where: { id: jobId },
      data: {
        jobTitle,
        description,
        location,
        imgurl,
        salary: salary ? parseFloat(salary) : null,
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : existingJob.applicationDeadline,
        active: active !== undefined ? active : existingJob.active,
        degree,
        minCgpa: minCgpa ? parseFloat(minCgpa) : null,
        minExperienceMonths: minExperienceMonths ? parseInt(minExperienceMonths) : null,
      }
    });
    
    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify a job posting (TPO only)
router.patch("/:id/verify", verifyToken, isTpo, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const { verified } = req.body;
    
    const job = await prisma.jobPosting.update({
      where: { id: jobId },
      data: { verified }
    });
    
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job posting (company or TPO)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    
    // Check authorization
    const existingJob = await prisma.jobPosting.findUnique({
      where: { id: jobId }
    });
    
    if (!existingJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the company that posted the job or is a TPO
    const tpo = await prisma.tpo.findFirst({ where: { email: req.user.email } });
    if (existingJob.companyId !== req.user.email && !tpo) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }
    
    await prisma.jobPosting.delete({
      where: { id: jobId }
    });
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;