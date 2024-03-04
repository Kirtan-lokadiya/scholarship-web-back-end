
const Admin = require('../models/admin_signup');
const bcrypt = require('bcrypt');

const adminSignup = async (req, res) => {
  const { first_name, last_name, organization_name, email, password, institute_type } = req.body;

  try {
    // Validate required fields
    if (!first_name || !last_name || !organization_name || !email || !password || !institute_type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new admin
    const newAdmin = new Admin({
      first_name,
      last_name,
      organization_name,
      email,
      password: hashedPassword,
      institute_type,
    });

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();



    res.status(201).json({ success: true, data: savedAdmin,  message: 'Admin account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating admin account' });
  }
};

module.exports = adminSignup;
