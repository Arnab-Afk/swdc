const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken, isCompany, isTpo } = require('../middlewares/auth.middleware');

// Apply for a job
router.post("/", verifyToken, async (req, res) => {
  try {
    const { jobId, resumeId } = req.body;
    
    const application = await prisma.application.create({
      data: {
        studentId: req.user.id.toString(),
        jobId: jobId.toString(),
        resumeId: resumeId.toString(),
        applicationDate: new Date(),
        statusApplied: true
      }
    });
    
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications for a user
router.get("/my-applications", verifyToken, async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { studentId: req.user.id.toString() },
      include: {
        driveProcessCompletions: true
      }
    });
    
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (Company or TPO only)
router.patch("/:id/status", verifyToken, async (req, res) => {
  try {
    const { statusField, value } = req.body;
    
    // Validate status field
    const validStatusFields = [
      'statusApplied', 'statusShortlisted', 'statusInterviewScheduled',
      'statusTechnicalRound', 'statusOfferMade', 'statusOfferAccepted'
    ];
    
    if (!validStatusFields.includes(statusField)) {
      return res.status(400).json({ message: 'Invalid status field' });
    }
    
    const application = await prisma.application.update({
      where: { id: parseInt(req.params.id) },
      data: { [statusField]: value }
    });
    
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark a process step as completed
router.post("/:id/complete-step", verifyToken, async (req, res) => {
  try {
    const { stepId } = req.body;
    
    const completion = await prisma.driveProcessCompletion.create({
      data: {
        applicationId: parseInt(req.params.id),
        stepId: stepId.toString(),
        status: true,
        completionDate: new Date()
      }
    });
    
    res.status(201).json(completion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;