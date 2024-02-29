// loginData controller
const users = require("../models/admin_signup");
const bcrypt = require("bcrypt");

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

    if (user.approvalStatus === "pending") {
      return res.status(401).json({ message: "Your account is pending approval" });
    } else if (user.approvalStatus === "rejected") {
      return res.status(401).json({ message: "Your account has been rejected" });
    }

    // Continue with the login logic...

    res.json({
      message: "Login successful",
      success: true,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = loginData;
