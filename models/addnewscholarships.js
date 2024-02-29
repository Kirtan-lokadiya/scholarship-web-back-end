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
    required: true,
  },
  academicClass: {
    type: String,
    required: true,
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
  instituteType: {
    type: String,
    required: true,
  },
  awardAmount: {
    type: Number,
    required: true,
  },
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Scholarships", ScholarshipSchema);
