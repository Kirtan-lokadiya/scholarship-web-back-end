require('dotenv').config();
const users = require("../models/admin_signup");
// const jwt = require("jsonwebtoken");
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

    // const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    //   expiresIn: "1h",
    // });

    res.json({
      message: "Login successful",
      success: true,
    //   token,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = loginData;
