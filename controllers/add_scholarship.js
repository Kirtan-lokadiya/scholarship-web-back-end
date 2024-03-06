const express = require("express");
const Scholarship = require("../models/addnewscholarships");
const authenticateToken = require("../middleware/authenticateToken");
const admin_signup = require("../models/admin_signup");
const addnewscholarships = require("../models/addnewscholarships");
const jwt = require("jsonwebtoken");


const addScholarship = async (req, res) => {
  try {
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
      BasedOnScholarship,
      awardAmount,
      activeMonths,
      url,
    } = req.body;
    console.log(req.body);
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
      BasedOnScholarship,
      awardAmount,
      addedBy,
      activeMonths,
      url,
    });

    // Save the scholarship to the database
    await newScholarship.save();

    res.status(201).json({
      success: true,
      // data: savedScholarship,
      message: "Scholarship added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding scholarship" });
  }
};



//update api
const updateScholarshipById = async (req, res, addedBy) => {
  try {
    const scholarships = await Scholarship.find({ 'addedBy.user': addedBy._id });

    if (!scholarships || scholarships.length === 0) {
      return res.status(404).json({ error: "Scholarships not found for the user" });
    }

    const updatedData = {
      scholarship_name: req.body.scholarship_name,
      about_scholarship: req.body.about_scholarship,
      eligibility: req.body.eligibility,
      documentsRequired: req.body.documentsRequired,
      category: req.body.category,
      academicClass: req.body.academicClass,
      sinceDate: req.body.sinceDate,
      tillDate: req.body.tillDate,
      state: req.body.state,
      organizationType: req.body.organizationType,
      BasedOnScholarship: req.body.BasedOnScholarship,
      awardAmount: req.body.awardAmount,
      activeMonths: req.body.activeMonths,
      url: req.body.url,
    };

    const updatedScholarships = await Promise.all(
      scholarships.map(async (scholarship) => {
        const updatedScholarship = await Scholarship.findByIdAndUpdate(
          scholarship._id,
          updatedData,
          { new: true }
        );
        return updatedScholarship;
      })
    );

    res.json(updatedScholarships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// const deleteScholarshipById = async (req, res, addedBy) => {
//   try {
//     const scholarships = await Scholarship.find({ 'addedBy.user': addedBy._id });







const deleteScholarshipById = async (token) => {
  try {
    // Verify the JWT token and extract user ID
    const decodedToken = jwt.verify(token, 'your_secret_key_here');
    const userId = decodedToken.userId;

    // Find scholarships associated with the user
    const scholarships = await Scholarship.find({ 'addedBy.user': userId });

    if (!scholarships || scholarships.length === 0) {
      return { success: false, message: "No scholarships found for the user" };
    }

    // Delete each scholarship
    await Promise.all(
      scholarships.map(async (scholarship) => {
        await Scholarship.findByIdAndDelete(scholarship._id);
      })
    );
    

    return { success: true, message: "Scholarships deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
};

module.exports = {
  addScholarship,
  updateScholarshipById,
  deleteScholarshipById,
};