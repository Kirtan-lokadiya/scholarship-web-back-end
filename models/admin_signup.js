const mongoose = require("mongoose");

var admin_signup = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  organization_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  institute_type: {
    type: String,
    required: true,
  },
  approvalStatus: {
    type: String,
    enum: ["Pending", "Approve", "Reject"],
    default: "Pending",
  },
  signupDate: {
    type: Date,
    default: Date.now, // Set default value to the current date
  },
});

module.exports = mongoose.model("Admin_signup", admin_signup);
