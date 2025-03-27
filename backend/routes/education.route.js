const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken } = require('../middlewares/auth.middleware');

// Get education information
router.get("/info", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        degree: true,
        branch: true,
        yearOfGraduation: true,
        cgpa: true,
        rollno: true,
        universityName: true,
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching education info:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update education information
router.put("/info", verifyToken, async (req, res) => {
  try {
    const { 
      degree, 
      branch, 
      yearOfGraduation, 
      cgpa, 
      rollno,
      universityName
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        degree,
        branch,
        yearOfGraduation: yearOfGraduation ? parseInt(yearOfGraduation) : undefined,
        cgpa: cgpa ? parseFloat(cgpa) : undefined,
        rollno,
        universityName
      },
      select: {
        degree: true,
        branch: true,
        yearOfGraduation: true,
        cgpa: true,
        rollno: true,
        universityName: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating education info:", error);
    res.status(500).json({ message: 'Failed to update education information' });
  }
});

// Get user certificates
router.get("/certificates", verifyToken, async (req, res) => {
  try {
    const certificates = await prisma.userCertification.findMany({
      where: { userId: req.user.id }
    });

    res.json(certificates);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a certificate
router.post("/certificates", verifyToken, async (req, res) => {
  try {
    const { name, organization, issueDate, expiryDate, credentialId } = req.body;
    
    const certificate = await prisma.userCertification.create({
      data: {
        userId: req.user.id,
        certificationName: name,
        organization: organization || "",
        issueDate: issueDate ? new Date(issueDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId: credentialId || ""
      }
    });

    res.status(201).json(certificate);
  } catch (error) {
    console.error("Error adding certificate:", error);
    res.status(500).json({ message: 'Failed to add certificate' });
  }
});

// Delete a certificate
router.delete("/certificates/:id", verifyToken, async (req, res) => {
  try {
    const certificateId = parseInt(req.params.id);
    
    // Verify the certificate belongs to the user
    const certificate = await prisma.userCertification.findUnique({
      where: {
        id: certificateId
      }
    });

    if (!certificate || certificate.userId !== req.user.id) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    await prisma.userCertification.delete({
      where: {
        id: certificateId
      }
    });

    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    res.status(500).json({ message: 'Failed to delete certificate' });
  }
});

// Get semester marks
router.get("/semesters", verifyToken, async (req, res) => {
  try {
    // You'll need to create this model in your schema
    // For now, we'll return an empty array
    res.json([]);
  } catch (error) {
    console.error("Error fetching semester marks:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;