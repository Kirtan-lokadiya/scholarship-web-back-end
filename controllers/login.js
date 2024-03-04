const users = require("../models/admin_signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginData = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // if (user.approvalStatus === "Pending") {
    //   return res.status(200).json({ message: "Your account is pending approval" });
    // } else if (user.approvalStatus === "Rejected") {
    //   return res.status(200).json({ message: "Your account has been rejected" });
    // }

    // Continue with the login logic...

    // Generate a JWT token
    const token = jwt.sign(
      { admin_id: user._id, email: user.email },
      'your_secret_key',
      { expiresIn: '5h' } // Token expiration time (adjust as needed)
    );

    res.json({
      message: "Login successful",
      success: true,
      email: user.email,
      token, // Include the JWT token in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = loginData;
