const express = require('express');
const Scholarship = require('../models/addnewscholarships');
const authenticateToken = require('../middleware/authenticateToken');

const add_scholarship = express.Router();

// Endpoint to add a new scholarship
add_scholarship.post('/addscholarship', authenticateToken, async (req, res) => {
  const {
    scholarship_name,
    about_scholarship,
    eligibility,
    documentsRequired,
    category,
    academicClass,
    sinceDate,
    tillDate,
    state,
    organizationType,
    awardAmount,
    activeMonths,
  } = req.body;

  try {
    // Get the admin ID from the authenticated user
    const addedBy = req.user.admin_id;

    // Create a new scholarship
    const newScholarship = new Scholarship({
      scholarship_name,
      about_scholarship,
      eligibility,
      documentsRequired,
      category,
      academicClass,
      sinceDate,
      tillDate,
      state,
      organizationType,
      awardAmount,
      addedBy,
      activeMonths,
    });

    // Save the scholarship to the database
    const savedScholarship = await newScholarship.save();

    res.status(201).json({
      success: true,
      data: savedScholarship,
      message: 'Scholarship added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding scholarship' });
  }
});

module.exports = add_scholarship;
