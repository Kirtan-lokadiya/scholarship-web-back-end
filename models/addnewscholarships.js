const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema({
  scholarship_name: {
    type: String,
    required: true,
  },
  about_scholarship: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  documentsRequired: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  academicClass: {
    type: String,
  },
  sinceDate: {
    type: Date,
    required: true,
  },
  tillDate: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  organizationType: {
    type: String,
  },
  BasedOnScholarship: {
    type: String,
    required: true,
  },

  awardAmount: {
    type: Number,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin_signup",
    required: true,
  },
  activeMonths: [String], 
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Scholarships", ScholarshipSchema);
